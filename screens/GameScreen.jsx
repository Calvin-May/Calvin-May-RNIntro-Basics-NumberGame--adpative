import { Alert, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import Title from "../components/ui/Title";
import Colours from "../constants/colours";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(minBoundary, maxBoundary, exclude);
  } else {
    return randomNumber;
  }
}

export default function GameScreen({ gameNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, gameNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (gameNumber === currentGuess)
    {
        onGameOver();
    }
  }, [currentGuess, gameNumber, onGameOver]);

  function nextGuessHandler(direction) {
    // Check for User Honesty - avoiding infinite loop when using generateRandomBetween()
    if (
      (direction === "lower" && currentGuess < gameNumber) ||
      (direction === "higher" && currentGuess > gameNumber)
    ) {
      Alert.alert("Please be honest with the phone...", "Cheating is frowned upon", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }

    // Check for and Generate the next guess based on the Users feedback
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(`Min: ${minBoundary} - Max: ${maxBoundary}`);
    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    // Set the New Guess
    setCurrentGuess(newGuess);
  }

  return (
    <View style={styles.gameContainer}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              +
            </PrimaryButton>
          </View>
          <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              -
            </PrimaryButton>
          </View>
        </View>
        <View></View>
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
    backgroundColor: Colours.primary800,
    borderRadius: 8,
    boxShadow: "4px 4px 10px 2px",
    shadowColor: Colours.black,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  buttonsContainer: {},
  buttonContainer: {},
});
