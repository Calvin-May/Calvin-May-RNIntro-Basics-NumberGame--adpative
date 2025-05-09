import { StyleSheet, View, Dimensions } from "react-native";
import Colours from "../../constants/colours";
export default function Card({children}) {

    return (
        <View style={styles.floatingContainer}>
            {children}
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    floatingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        marginTop: deviceWidth < 380 ? 12 : 36,
        backgroundColor: Colours.primary800,
        borderRadius: 8,
        boxShadow: '4px 4px 10px 2px',
        shadowColor: Colours.black,
        shadowOffset: { width:3, height:3},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});