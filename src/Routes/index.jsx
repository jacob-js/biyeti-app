import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { drawerRoutes, routes, notSecuredRoutes, securedRoutes } from './routes';
import Header from './Header';
import { DrawerContents } from './DrawerContents';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../Components/LoadingPage';
import axios from 'axios';
import Context from './context';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
    const { loading, auth } = useSelector(({ users: { currentUser } }) => currentUser);
    const [notifCount, setNotifCount] = useState(0);

    const getUnreadNotif = async () => {
        try {
            const res = await axios.get('/api/v1/notifications?status=unread&p_size=1&p=1');
            setNotifCount(res.data.data?.count);
        } catch (error) {
        }
    };

    useEffect(() =>{
        let timer;
        (() =>{
            if(auth){
                timer = setInterval(() =>{
                    getUnreadNotif();
                }, 12000);
            }
        })();

        return () =>{
            clearInterval(timer);
        }
    }, [auth]);
    
    return (
        <NavigationContainer>
            {
                loading ?
                    <LoadingPage />:
                <Stack.Navigator initialRouteName="Drawer" defaultScreenOptions={{
                    animationTypeForReplace: 'pop',
                    unmountOnBlur: true
                }}>
                    {
                        auth === true ?
                        <>
                            {
                                securedRoutes.map((route, index) => (
                                    <Stack.Screen name={route.name} component={route.component} options={{
                                        headerShown: route.withHeader, title: route.title, unmountOnBlur: true,
                                        ...route.headerOptions
                                    }} key={index} />
                                ))
                            }
                            <Stack.Screen name="Drawer" options={{
                                headerShown: false,
                                unmountOnBlur: true
                            }} >
                                {stackProps => (
                                    <Drawer.Navigator initialRouteName='Home'
                                        screenOptions={{
                                            header: ({navigation, route, options}) =>{
                                                return <Context.Provider
                                                    value={{
                                                        notifCount
                                                    }}
                                                >
                                                    <Header DrawerNavigation={navigation} drawerRoute={route} options={options} {...stackProps} />
                                                </Context.Provider>
                                            }
                                        }}
                                        
                                        drawerContent={props => (
                                            <Context.Provider
                                                value={{
                                                    notifCount
                                                }}
                                            >
                                                <DrawerContents drawer={{...props}} stack={ {...stackProps} } />
                                            </Context.Provider>
                                        )}
                                    >
                                        {
                                            drawerRoutes.map((route, index) =>(
                                                <Drawer.Screen name={route.name} key={index}
                                                    options={{
                                                        unmountOnBlur: true
                                                    }}
                                                >
                                                    {
                                                        (props) => <route.component {...props} stackProps={stackProps} />
                                                    }
                                                </Drawer.Screen>
                                            ))
                                        }
                                    </Drawer.Navigator>
                                )}    
                            </Stack.Screen>
                        </>
                        : auth === false &&
                        notSecuredRoutes.map((route, index) => (
                            <Stack.Screen name={route.name} component={route.component} options={{
                                headerShown: route.withHeader, title: route.title, unmountOnBlur: true
                            }} key={index} />
                        ))
                    }
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}