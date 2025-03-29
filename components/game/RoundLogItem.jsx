import { StyleSheet, Text, View } from "react-native";
import Colours from "../../constants/colours";

export default function RoundLogItem({roundNumber = 3, guess = 3}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colours.primary800,
        borderWidth: 2,
        borderRadius: 40,
        padding: 12,
        marginHorizontal: 8,
        marginVertical: 15,
        backgroundColor: Colours.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: '1px 3px 6px 0px',
        shadowColor: Colours.black,
        shadowOffset: { width:3, height:3},
        shadowRadius: 6,
        shadowOpacity: 0.25,

    },
    itemText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
});