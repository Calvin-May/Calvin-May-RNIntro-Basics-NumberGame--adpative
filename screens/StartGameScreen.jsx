import { StyleSheet, TextInput, View, Alert, Text, Dimensions, useWindowDimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colours from "../constants/colours";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";


export default function StartGameScreen({onNumberSelected}) {

    const [enteredNumber, setEnteredNumber] = useState(''); // Holds the state of the Game Number that was entered by the user, initially set to an String.empty
    
    // In order to make UI responsive, we need to set up a dynamic Width and Height within the component
    const {width, height} = useWindowDimensions();

    /**
     * Event Handler that is used by a TextInput to track keystrokes and update the enteredNumber State
     * @param {string} inputText 
     */
    function numberInputHandler(inputText) {
        setEnteredNumber(inputText);
    }

    /**
     * Function to quickly return the enteredNumber state to an empty string
     */
    function resetInputHandler() {
        setEnteredNumber('');
    }

    /**
     *  
     * @returns Function for input validation to confirm the users input as a valid value to be used in the Game.
     * This function ensures that the user input is a valid integer between 1 and 100. It will display an Alert message
     * to the user if the input does not pass validation. Otherwise, it utilizes the onNumberSelected function passed as a prop
     * from App.js, begining the game.
     * 
     */
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

    const MarginTopDistance =  height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootContainer, {marginTop: MarginTopDistance}]}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText style={styles.instructionText}>Enter a Number</InstructionText>
                <TextInput 
                style={styles.numberInput} 
                maxLength={2} 
                keyboardType="number-pad" 
                autoCorrect={false} 
                value={enteredNumber /*Provides two-way binding by ensuring the value of the textinput matches our state */}
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
            </KeyboardAvoidingView>
        </ScrollView>    
    );
}

const DeviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create(
    {
        screen: {
            flex: 1,
        },
        rootContainer: {
            flex: 1,
            marginTop: 100,
            marginHorizontal: 48
        },
        numberInput: {
            height: 100,
            width: '40%',
            textAlign: 'center',
            fontSize: DeviceWidth < 380 ? 38 : 50,
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