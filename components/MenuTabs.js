import * as React from 'react'; 
import { View, StyleSheet, Text} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import ProductsManager from './productsmanager';
import Home from './home.js';
import Lojas from './lojas.js';
import FIM from './fim.js';
 
function HomeScreen() {
    return <Home />;
  }
  
 
function ListScreen() { 
    return <Lojas />;
} 
 
function ProductScreen() { 
    return <ProductsManager/>
 
} 
 
function NotificationsScreen() { 
        return <FIM />;
    } 
 
const Tab = createBottomTabNavigator(); 
 
export default function Menu() { 
    return ( 
        <NavigationContainer> 
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
                <Tab.Screen name="Home" component={HomeScreen} /> 
                <Tab.Screen name="Lojas" component={ListScreen} /> 
                <Tab.Screen 
                    name="Produtos" 
                    component={ProductScreen} 
                /> 
                <Tab.Screen name="Saiba mais" component={NotificationsScreen} /> 
                </Tab.Navigator> 
        </NavigationContainer> 
    ); 
} 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }, 
    iconTabRound: { 
        width: 60, 
        height: 90, 
        borderRadius: 30, 
        marginBottom: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 6, 
        shadowColor: '#9C27B0', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 5, 
    } 
});