import { View, Text, StyleSheet, Dimensions } from "react-native"
import Colours from "../../constants/colours";

export default function NumberContainer({children}) {

    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        padding: deviceWidth < 380 ? 12 : 24, // Use padding 12 on deviceWidth less than 450, otherwise use 24
        margin: deviceWidth < 380 ? 12 :  24,
        borderRadius: 8,
        borderColor: Colours.accent500,
        alignItems: 'center',
    },
    numberText: {
        color: Colours.accent500,
        fontSize: deviceWidth < 380 ? 28 :  36,
        fontWeight: 'Bold',
    }

});