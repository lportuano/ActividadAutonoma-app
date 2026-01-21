import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from "../screens/WelcomeScreen";
import Loginscreen from "../screens/Loginscreen";
import RegistroScreen from '../screens/RegistroScreen';
import GuardarScreen from '../screens/GuardarScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LeerScreen from '../screens/LeerScreen';
import EditarScreen from '../screens/EditarScreen';
import EliminarScreen from '../screens/EliminarScreen';

//ICONOS

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={Loginscreen} />
            <Stack.Screen name='Register' component={RegistroScreen} />
            <Stack.Screen name='Tab' component={MyTab} />
        </Stack.Navigator>
    )
}

function MyTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopColor: '#333',
                    height: 65,
                    paddingBottom: 8
                },
                tabBarActiveTintColor: '#E50914',
                tabBarInactiveTintColor: '#8c8c8c',
            }}
        >
            <Tab.Screen name="Perfil" component={PerfilScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        <MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
                }}
            />
            <Tab.Screen name="Lista" component={LeerScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        <FontAwesome name="list" size={24} color={color} />
                }}
            />
            <Tab.Screen name="Agregar" component={GuardarScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        <FontAwesome6 name="add" size={24} color={color} />
                }}
            />
            <Tab.Screen name="Editar" component={EditarScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        <Feather name="edit" size={24} color={color} />
                }}
            />
            <Tab.Screen name="Eliminar" component={EliminarScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        <AntDesign name="delete" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}



export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}