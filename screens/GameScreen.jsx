import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'

import Title from "../components/ui/Title";
import Colours from "../constants/colours";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import RoundLogItem from "../components/game/RoundLogItem";

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
        return generateRandomBetween(minBoundary, maxBoundary, exclude);
    } else {
        return randomNumber;
    }
}

export default function GameScreen({ gameNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, gameNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [gameRounds, setGameRounds] = useState([initialGuess]);

    useEffect(() => {
        if (gameNumber === currentGuess) {
            onGameOver();
        }
    }, [currentGuess, gameNumber, onGameOver]);

    //Reset Only on the first render - Ensures that the game boundaries are reset only on new game
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction) {
        // Check for User Honesty - avoiding infinite loop when using generateRandomBetween()
        if (
            (direction === "lower" && currentGuess < gameNumber) ||
            (direction === "higher" && currentGuess > gameNumber)
        ) {
            Alert.alert(
                "Please be honest with the phone...",
                "Cheating is frowned upon",
                [{ text: "Sorry!", style: "cancel" }]
            );
            return;
        }

        // Check for and Generate the next guess based on the Users feedback
        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        console.log(`Min: ${minBoundary} - Max: ${maxBoundary}`);
        const newGuess = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );

        // Set the New Guess
        setCurrentGuess(newGuess);
        setGameRounds((prevGameRounds) => [newGuess, ...prevGameRounds]);
    }

    const gameRoundsListLength = gameRounds.length;

    return (
        <View style={styles.rootContainer}>
            <Card>
                <Title>Opponent's Guess</Title>
                <NumberContainer>{currentGuess}</NumberContainer>
                <InstructionText style={styles.InstructionText}>Higher or Lower?</InstructionText>
                <View style={styles.centeredContainer}>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                                <Ionicons name="add-sharp"  size={26} color='white' />
                            </PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Ionicons name="remove-sharp" size={26} color='white' />
                            </PrimaryButton>
                        </View>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {gameRounds.map(gameRound => <Text key={gameRound}>{gameRound}</Text>)} */}
                <FlatList
                    data={gameRounds}
                    key={(item) => item}
                    renderItem={(data) => (
                        <RoundLogItem roundNumber={gameRoundsListLength - data.index} guess={data.item}/>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        marginHorizontal: 48,
    },
    centeredContainer: {
        alignItems: 'flex-end'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    InstructionText: {
        borderBottomWidth: 1,
        borderBottomColor: Colours.accent500
    },
    listContainer: {
        flex: 1,
        padding: 10
    }
});
