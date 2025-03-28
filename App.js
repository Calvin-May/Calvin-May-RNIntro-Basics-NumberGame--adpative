import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colours from './constants/colours';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';  // Deprecated, do not use this in real apps instead use expo-splash-screen package

export default function App() {
  // Number provided by the user, for the app to guess
  const [gameNumber, setGameNumber] = useState();
  const [gameOver, setGameOver] = useState(true);

  // Hook that loads Fonts stored in */assets/fonts
  const [fontsLoaded] = useFonts({  // Array Destructuring to return variable that tells us if fonts have loaded
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // If the fonts have not finished loading, show a splash/loading screen
  if (!fontsLoaded) {
    return <AppLoading />
  }

  function startGame(chosenNumber) {
    setGameNumber(chosenNumber);
    setGameOver(false);
  }

  function gameOverHandler() {
    setGameOver(true);
  }

  let screen = <StartGameScreen onNumberSelected={startGame} />

  if (gameNumber) {
    screen = <GameScreen gameNumber={gameNumber} onGameOver={gameOverHandler} />
  }

  if (gameOver && gameNumber) {
    screen = <GameOverScreen />
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
