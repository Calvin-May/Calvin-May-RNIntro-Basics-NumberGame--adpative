import { Text, StyleSheet, Dimensions } from "react-native";
import Colours from "../../constants/colours";



export default function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

const DeviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: DeviceWidth < 380 ? 28 : 32,
        color: Colours.white,
        textAlign: 'center',
        padding: DeviceWidth < 380 ? 4 : 12,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: Colours.white,
    }
});