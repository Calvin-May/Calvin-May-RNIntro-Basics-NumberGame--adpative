import { View, Text, StyleSheet } from "react-native"
import Colours from "../../constants/colours";

export default function NumberContainer({children}) {

    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        padding: 24,
        margin: 24,
        borderRadius: 8,
        borderColor: Colours.accent500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        color: Colours.accent500,
        fontSize: 36,
        fontWeight: 'Bold',
    }

});