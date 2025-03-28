
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colours from "../constants/colours";

export default function PrimaryButton({ children, onPress }) {

    return (  
        <View style={styles.buttonOuterContainer}>
            <Pressable 
              onPress={onPress} 
              android_ripple={{color: Colours.primary500}} 
              style={(pressData) => pressData.pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '1px 2px 8px',
    },
    buttonInnerContainer: {
        backgroundColor: Colours.primary400,
        paddingVertical: 8,
        paddingHorizontal: 16,
        
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    
    pressed: {
        opacity: 0.75,
        
    }

});