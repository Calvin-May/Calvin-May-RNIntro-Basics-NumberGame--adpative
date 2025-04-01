import { StyleSheet, Text, Dimensions } from "react-native";
import Colours from "../../constants/colours";
export default function InstructionText({children, style}) {

    return (
        <Text style={[styles.instructionText, style]}>
            {children}
        </Text>
    );
}


function setFontSize(small, large) {
    const DeviceWidth = Dimensions.get('window').width;

    const FontSize = DeviceWidth < 380 ? small : large

    return FontSize;
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colours.accent500,
        fontSize: setFontSize(22,28),
        //fontSize: DeviceWidth < 380 ? 22 : 28,
    },  
});