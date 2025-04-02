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
  const [gameNumber, setGameNumber] = useState();   // Tracks the number entered by the user, for the phone to guess
  const [gameOver, setGameOver] = useState(true);   // Tracks game state, only true while the game is actively being played
  const [gameRounds, setGameRounds] = useState(0);  // Tracks the number of rounds that occurred until the phone guessed the correct number

  // Hook that loads Fonts stored in */assets/fonts
  const [fontsLoaded] = useFonts({  // Array Destructuring to return variable that tells us if fonts have loaded
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // If the fonts have not finished loading, show a splash/loading screen
  if (!fontsLoaded) {
    return <AppLoading />
  }

  /**
   * Function used to start the game by assigning the game number and gameOver states
   * @param {number} chosenNumber 
   */
  function startGame(chosenNumber) {
    setGameNumber(chosenNumber);
    setGameOver(false);
  }

  /**
   * Event Handler to handle game over logic, sets the number of rounds played and gameOver state to true
   * @param {*} numberOfRounds 
   */
  function gameOverHandler(numberOfRounds) {
    setGameRounds(numberOfRounds)
    setGameOver(true);
  }

  /**
   * Event Handler that allows users to initiate a new game; this function resets all game stats
   */
  function startNewGameHandler() {
    setGameNumber(null);
    setGameOver(true);
    setGameRounds(0)
  }


  // Assume a new Game, so load the StartGameScreen with the startGame function in props
  let screen = <StartGameScreen onNumberSelected={startGame} /> // Screen Variable used to determine which screen to load based on state

  // Check to see if a Game Number is selected by the user, if so reassign the screen variable with the GameScreen, passing both the GameNumber and the GameOverHandler in props
  if (gameNumber) {
    screen = <GameScreen gameNumber={gameNumber} onGameOver={gameOverHandler} />
  }

  // Check to see if the Game is Over and if the Game Number was selected; if so, reassign screen with the GameOverScreen
  //-GameOver is true by default, if a gameNubmer is not selected it means that the game has not even begun
  if (gameOver && gameNumber) {
    screen = <GameOverScreen numberOfRounds={gameRounds} gameNumber={gameNumber} onStartNewGame={startNewGameHandler} />
  }
  return (
    <>
        <StatusBar style='dark' />
        <LinearGradient colors={[Colours.accent500, Colours.primary900,]} style={styles.rootScreen}>
          <ImageBackground 
            source={require('./assets/images/background.png')} 
            resizeMethod='cover' 
            style={styles.rootScreen}
            imageStyle={styles.backgroundStyle}
          >
          {/* Automatically provide padding to render content within the safe boundaries of IOS devices (IOS ONLY)  */}
          <SafeAreaView style={styles.rootScreen}>
            { // Load whichever JSX component currently assigned to the Screen Variable 
              screen  
            }
          </SafeAreaView>
          </ImageBackground>
        </LinearGradient>
    </>
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
