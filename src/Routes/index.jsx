import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { routes } from './routes';
import Header from './Header';
import { DrawerContents } from './DrawerContents';

const Drawer = createDrawerNavigator();

export default function Routes() {
    
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'
                screenOptions={{
                    header: ({navigation, route, options}) =>{
                        return <Header navigation={navigation} options={options} />
                    }
                }}
                drawerContent={props => <DrawerContents {...props} />}
            >
                {
                    routes.map((route, index) =>(
                        <Drawer.Screen name={route.name} key={index} component={route.component} />
                    ))
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
}