import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/modules/login/index';
import Register from './src/modules/login/register';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ingresa" component={Login} />
        <Stack.Screen name="Regístrate" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;