import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Title from "../components/ui/Title";
import Colours from "../constants/colours";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";


export default function GameOverScreen({numberOfRounds, gameNumber, onStartNewGame}) {

    return (
        <View style={styles.rootContainer}>
            <Title>Game Over!</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../assets/images/success.png')} ></Image>
            </View>
                <Text style={styles.summaryText}>
                    Your Phone took <Text style={styles.highlightText} >{numberOfRounds} </Text>
                    rounds to guess the number <Text style={styles.highlightText} >{gameNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start a New Game!</PrimaryButton>
        </View>
    );
}

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create(
    {
        imageContainer: {
            overflow: 'hidden',
            borderWidth: 3,
            borderRadius: DeviceWidth < 380 ? 110 :200,
            width: DeviceWidth < 380 ? 220 : 400,
            height: DeviceWidth < 380 ? 220 : 400,
            borderColor: Colours.primary900,
            margin: DeviceWidth < 380 ? 18 :36
        },
        imageStyle: {
            width: '100%',
            height: '100%',
        },
        rootContainer: {
            flex: 1,
            padding: 42,
            paddingTop: DeviceWidth < 380 ? 90 : 150,
            alignItems: 'center'
        },
        summaryText: {
            fontFamily: 'open-sans',
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 24
        },
        highlightText: {
            fontFamily: 'open-sans-bold',
            color: Colours.primary500,
        },
    }
);