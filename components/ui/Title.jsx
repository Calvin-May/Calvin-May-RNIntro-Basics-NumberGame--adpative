import { Text, StyleSheet } from "react-native";
import Colours from "../../constants/colours";



export default function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 32,
        color: Colours.white,
        textAlign: 'center',
        padding: 12,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: Colours.white
    }
});