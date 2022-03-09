import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { drawerRoutes, routes } from './routes';
import Header from './Header';
import { DrawerContents } from './DrawerContents';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {
                    routes.map((route, index) => (
                        <Stack.Screen name={route.name} component={route.component} options={{
                            headerShown: route.withHeader
                        }} key={index} />
                    ))
                }
                <Stack.Screen name="Drawer" options={{
                    headerShown: false
                }} >
                    {stackProps => (
                        <Drawer.Navigator initialRouteName='Home'
                            screenOptions={{
                                header: ({navigation, route, options}) =>{
                                    return <Header DrawerNavigation={navigation} options={options} {...stackProps} />
                                }
                            }}
                            drawerContent={props => <DrawerContents {...props} { ...stackProps } />}
                        >
                            {
                                drawerRoutes.map((route, index) =>(
                                    <Drawer.Screen name={route.name} key={index} component={route.component} { ...stackProps } />
                                ))
                            }
                        </Drawer.Navigator>
                    )}    
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}