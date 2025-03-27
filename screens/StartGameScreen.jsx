import { StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function StartGameScreen() {

    return (
        <View style={styles.floatingContainer}>
            <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" autoCorrect={false} />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create(
    {
        floatingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            marginTop: 100,
            marginHorizontal: 48,
            backgroundColor: '#4B033B',
            borderRadius: 8,
            boxShadow: '4px 4px 10px 2px',
            shadowColor: '#000000',
            shadowOffset: { width:3, height:3},
            shadowRadius: 6,
            shadowOpacity: 0.25,
        },
        numberInput: {
            height: 100,
            width: '40%',
            textAlign: 'center',
            fontSize: 50,
            borderBottomColor: '#DDB52f',
            borderBottomWidth: 3,
            color: '#FFFFFF',
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