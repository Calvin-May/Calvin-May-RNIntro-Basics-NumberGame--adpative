import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colours from './constants/colours';

export default function App() {
  // Number provided by the user, for the app to guess
  const [gameNumber, setGameNumber] = useState();

  function numberChosenHandler(chosenNumber) {
    setGameNumber(chosenNumber);
  }

  let screen = <StartGameScreen onNumberSelected={numberChosenHandler} />

  if (gameNumber) {
    screen = <GameScreen gameNumber={gameNumber} />
  }

  return (
    <LinearGradient colors={[Colours.accent500, Colours.primary900,]} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMethod='cover' 
        style={styles.rootScreen}
        imageStyle={styles.backgroundStyle}
      >
      <SafeAreaView style={styles.rootScreen}>
        { screen }
      </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundStyle: {
    opacity: 0.18
  }
});
