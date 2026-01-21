import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from "../screens/WelcomeScreen";
import Loginscreen from "../screens/Loginscreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Tab' component={MyTab} />
        </Stack.Navigator>
    )
}

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Login" component={Loginscreen} />
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