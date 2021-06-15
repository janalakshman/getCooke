import React from 'react';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import LoadingScreen from './components/LoadingScreen'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Navigation from './Navigation';


export default function App() {
  
  const [loaded] = useFonts({
    'ExoBoldItalic' : require('./assets/fonts/Exo/Exo-BoldItalic.ttf'),
    'ExoBold' : require('./assets/fonts/Exo/Exo-Bold.ttf'),
    'ExoSemiBold' : require('./assets/fonts/Exo/Exo-SemiBold.ttf'),
    'ExoSemiBoldItalic' : require('./assets/fonts/Exo/Exo-SemiBoldItalic.ttf'),
    'ExoMedium' : require('./assets/fonts/Exo/Exo-Medium.ttf'),
    'ExoRegular' : require('./assets/fonts/Exo/Exo-Regular.ttf'),
    'ExoMediumItalic' : require('./assets/fonts/Exo/Exo-MediumItalic.ttf'),
    'ExoBlack' : require('./assets/fonts/Exo/Exo-Black.ttf'),
    'ExoLightItalic' : require('./assets/fonts/Exo/Exo-LightItalic.ttf')
  });

  if(!loaded) {
    return (<LoadingScreen />)
  }

  let persistor = persistStore(store);


  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
  );
}
