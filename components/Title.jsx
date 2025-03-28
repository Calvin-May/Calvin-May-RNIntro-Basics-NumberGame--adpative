import { Text, StyleSheet } from "react-native";



export default function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'Bold',
        color: '#DDB52F',
        textAlign: 'center',
        padding: 12,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#DDB52F'
    }
});