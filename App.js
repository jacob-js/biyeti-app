import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Routes from './src/Routes';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import useFonts from './hooks/useFonts';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { SSRProvider } from '@react-aria/ssr';

// axios.defaults.baseURL = 'https://bookitbackend.herokuapp.com';
axios.defaults.baseURL = 'http://192.168.1.171:8000';

export default function App() {
  const [ isReady, setIsReady ] = useState();

  const loadFonts = async () => {
    await useFonts()
  };

  const prepare = async () => {
    try {
      await loadFonts();
    } catch (error) {
      console.warn(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() =>{
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };

  return (
    <SSRProvider>
      <NativeBaseProvider config={config}>
        <Provider store={store}>
          <PaperProvider>
            <StatusBar translucent />
            <Routes />
          </PaperProvider>
        </Provider>
      </NativeBaseProvider>
    </SSRProvider>
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
