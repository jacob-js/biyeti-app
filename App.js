import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/Routes';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [ isReady, setIsReady ] = useState();

  const loadFonts = async () => {
    await useFonts()
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <NativeBaseProvider>
      <PaperProvider>
        <Routes />
        <StatusBar style="light" backgroundColor='rgba(0, 0, 0, 1)' />
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
