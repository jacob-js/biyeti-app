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
import fr from 'moment/locale/fr';
import moment from 'moment';
import { en, registerTranslation } from 'react-native-paper-dates';

registerTranslation('en', en);
axios.defaults.baseURL = 'https://bookit10.herokuapp.com';
axios.defaults.timeout = 60000;

export default function App() {
  const [ isReady, setIsReady ] = useState();

  moment.updateLocale('fr', fr);

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
