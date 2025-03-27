
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function PrimaryButton({ children }) {

    function pressHandler() {
        console.log('Button Pressed!')
    }
    return (  
        <View style={styles.buttonOuterContainer}>
            <Pressable 
              onPress={pressHandler} 
              android_ripple={{color: '#640233'}} 
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
        backgroundColor: '#72063C',
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