import { StyleSheet, TextInput, View, Alert, Text } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colours from "../constants/colours";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

export default function StartGameScreen({onNumberSelected}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(inputText) {
        setEnteredNumber(inputText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        // Perform Validation on the Input
        //-Must be a number Greater than 0, Less and 100
        const chosenNumber = parseInt(enteredNumber); // parsing the value before passing to isNan ensure that an empty string is not interpreted as 0, bypassing the validation

        // Check that a number was provided between 1 and 100
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 100) {
            // If Validation Fails provide an Alert, with error messaging
            Alert.alert(
                'Invalid Number!',
                'Number must be between 1 and 100',
                [{text: 'Okay', style: 'Destructive', onPress: resetInputHandler}]
            );
            return;
        }
        onNumberSelected(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText style={styles.instructionText}>Enter a Number</InstructionText>
                <TextInput 
                style={styles.numberInput} 
                maxLength={2} 
                keyboardType="number-pad" 
                autoCorrect={false} 
                value={enteredNumber}
                onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>    
            </Card>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        rootContainer: {
            flex: 1,
            marginTop: 100,
            marginHorizontal: 48
        },
        numberInput: {
            height: 100,
            width: '40%',
            textAlign: 'center',
            fontSize: 50,
            borderBottomColor: Colours.accent500,
            borderBottomWidth: 3,
            color: Colours.white,
            marginTop: 8,
            marginBottom: 24,
            fontWeight: 'bold',
        },
        buttonsContainer: {
            flexDirection: 'row',
            margin: 5
        },
        buttonContainer: {
            flex: 1,
            
        }
    }
)