import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importe o NavigationContainer
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Home from './components/home';
import Lojas from './components/lojas';
import ProductsManager from './components/productsmanager';
import FIM from './components/fim';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer> {/* Aqui envolvemos o App com NavigationContainer */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'user';
                break;
              case 'Produtos':
                iconName = 'neuter';
                break;
              case 'Lojas':
                iconName = 'store';
                break;
              case 'Cafes':
                iconName = 'Lattesmug-hot';
                break;
              default:
                iconName = 'splotch';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4682B4',
          inactiveTintColor: '#777',
          showLabel: true,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Lojas" component={Lojas} />
        <Tab.Screen
          name="Produtos"
          component={ProductsManager}
        />
        <Tab.Screen name="Saiba mais" component={FIM} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
