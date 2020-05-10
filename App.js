/** LIBRERIAS */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
/** COMPONENTES */
import Login from './src/modules/login/index';
import Logout from './src/modules/login/logout';
import Register from './src/modules/login/register';
import Home from './src/modules/home/index';
import Productos from './src/modules/productos/index';
import Carrito from './src/modules/carrito/index';
import Pedidos from './src/modules/pedidos/pedidos';
import MisPedidos from './src/modules/pedidos/mispedidos';
import PedidosActual from './src/modules/carrito/pedido';

import {AsyncStorage} from 'react-native';

const HomeStack = createBottomTabNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName = "Inicio" >
    <HomeStack.Screen
      name="Inicio"
      component={Home}
      options={{
        tabBarLabel: 'INICIO',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home" color={"#A4D2FF"} size={20} />
        ),
      }}

    />
    
    <HomeStack.Screen
      name="Carrito"
      component={Carrito}
      options={{
        tabBarLabel: 'CARRITO',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="cart" color={"#A4D2FF"} size={20} />
        ),
      }}
    />

    <HomeStack.Screen
      name="pedidos"
      component={Pedidos}
      options={{
        tabBarLabel: 'PEDIDOS',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="reorder-horizontal" color={"#A4D2FF"} size={20} />
        ),
      }}
    />

    <HomeStack.Screen
      name="Misproductos"
      component={Productos}
      options={{
        tabBarLabel: 'MIS PRODUCTOS',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="buffer" color={"#A4D2FF"} size={20} />
        ),
      }}
    />

    <HomeStack.Screen
      name="Perfil"
      component={Productos}
      options={{
        tabBarLabel: 'PERFIL',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account" color={"#A4D2FF"} size={20} />
        ),
      }}
    />

    <HomeStack.Screen
      name="logout"
      component={ Logout }
      options={{
        tabBarLabel: 'SALIR',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="logout" color={"#A4D2FF"} size={20} />
        ),
      }}
      
    />
  </HomeStack.Navigator> 
);

const Stack = createStackNavigator();

const InitialStackScreen = ({ navigation }) => (
    <Stack.Navigator
        headerMode='none'
        initialRouteName = "Ingresa" >
        <Stack.Screen
          name="Ingresa"
          component={Login}
          options={{
            ...generalOptions, title: 'INGRESA',
          }}
        />
        <Stack.Screen
          name="Regístrate"
          component={Register}
          options={{ ...generalOptions, title: 'REGÍSTRATE' }}
        />
        <Stack.Screen
          name="Inicio"
          component={HomeStackScreen}
          options={{ ...generalOptions, title: 'INICIO' }}
        />
        <Stack.Screen
          name="PedidoActual"
          component={PedidosActual}
          options={{ ...generalOptions }}
        />
      </Stack.Navigator>
);


function App() {
  return (
    <NavigationContainer>
      <InitialStackScreen/>
    </NavigationContainer>
  );
}

export default App;

const generalOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#8AC4FF',
  },
  headerLeft: null,
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
}