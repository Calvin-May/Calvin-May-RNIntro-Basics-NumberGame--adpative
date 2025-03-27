import { StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function StartGameScreen() {

    return (
        <View style={styles.floatingContainer}>
            <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" autoCorrect={false} />
            <PrimaryButton>Reset</PrimaryButton>
            <PrimaryButton>Confirm</PrimaryButton>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        floatingContainer: {
            padding: 16,
            marginTop: 100,
            marginHorizontal: 24,
            backgroundColor: '#4B033B',
            borderRadius: 8,
            boxShadow: '4px 4px 10px 2px',
            shadowColor: '#000000',
            shadowOffset: { width:3, height:3},
            shadowRadius: 6,
            shadowOpacity: 0.25,
            alignItems: 'center'
        },
        numberInput: {
            height: 80,
            width: '20%',
            textAlign: 'center',
            fontSize: 38,
            borderBottomColor: '#DDB52f',
            borderBottomWidth: 3,
            color: '#FFFFFF',
            marginVertical: 8,
            fontWeight: 'bold'
        }
    }
)