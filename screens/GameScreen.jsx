import { Alert, FlatList, StyleSheet, Text, View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'

import Title from "../components/ui/Title";
import Colours from "../constants/colours";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import RoundLogItem from "../components/game/RoundLogItem";

// Non refreshing variables, when these variables are changed, they are not reset to these values upon re-renders
//-this means we can keep track of their values and updated them throughout the game regardless of how many times the component is re-rendered
let minBoundary = 1;    // Minimum numeric value that the Phone is allowed to guess
let maxBoundary = 100;  // Maximum numeric value that the Phone is allowed to guess

/**
 * This function generates and returns a random number between a specific minimum and maximum number. A specific number can be excluded from 
 * the guess using the exclude parameter, if this number is guessed recursion is used until a valid number is found.
 * @param {number} max 
 * @param {number} exclude 
 * @returns 
 */
function generateRandomBetween(min, max, exclude) {
    // Find a random number between the minimum and maximum
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    // Check if the number is excluded, if so recall the function to find a new number, otherwise return the random number
    if (randomNumber === exclude) {
        return generateRandomBetween(minBoundary, maxBoundary, exclude);
    } else {
        return randomNumber;
    }
}

export default function GameScreen({ gameNumber, onGameOver }) {

    const initialGuess = generateRandomBetween(1, 100, gameNumber); // Holds the first guess of the game
    const [currentGuess, setCurrentGuess] = useState(initialGuess); // State to track the new guess for each round, until game over
    const [gameRounds, setGameRounds] = useState([initialGuess]);   // State to track the number of rounds that occur until game over

    // This Function will run on each render where a new guess has been made or a new round has started, or the game has ended
    useEffect(() => {
        // If the new guess matches the game number, end the game
        if (gameNumber === currentGuess) {
            onGameOver(gameRounds.length);
        }
    }, [currentGuess, gameNumber, onGameOver]);

    //Reset Only on the first render - Ensures that the game min/max boundaries are reset only on new game, since we change these values on each new round
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    /**
     * This Function is called after each guess made by the computer. The direction variable is used to determine if the computer's next guess must be higher
     * or lower than the previous guess. Based on the direction, the computer will have a new minimum and maximum values in which the game number resides in,
     * ensuring that the next randomly generated number is closer to the game number.
     * @param {string} direction 
     * @returns 
     */
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
        const newGuess = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );

        // Set the New Guess
        setCurrentGuess(newGuess);
        setGameRounds((prevGameRounds) => [newGuess, ...prevGameRounds]);
    }

    // Keep Track of the Game Rounds to display to the user, and for use in the Game Over Screen
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
                    showsVerticalScrollIndicator={false}
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

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: deviceHeight < 380 ? 40 : 100,
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
        borderBottomColor: Colours.accent500,
        textAlign: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 10
    }
});
