import { StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
export default function GameScreen({gameNumber}) {
  return (
    <View style={styles.gameContainer}>
      <Title>Opponent's Guess</Title>
      <Text>GUESS</Text>

      <View>
        <Text>Higher or Lower?</Text>
        +
        -
        <View>Log Rounds</View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        padding: 24,
        marginVertical: 100,
        marginHorizontal: 48,
        backgroundColor: '#4B033B',
        borderRadius: 8,
        boxShadow: '4px 4px 10px 2px',
        shadowColor: '#000000',
        shadowOffset: { width:3, height:3},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
