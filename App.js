import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/Routes';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import axios from 'axios';

axios.defaults.baseURL = 'https://bookitbackend.herokuapp.com';

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
      <Provider store={store}>
        <PaperProvider>
          <StatusBar translucent />
          <Routes />
        </PaperProvider>
      </Provider>
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
