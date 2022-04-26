import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Center, Divider, Flex, HStack, theme, VStack } from 'native-base'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getPurchasesAction } from '../Redux/actions/tickets'
import { DashboardContext } from '../Screens/DashboardEventDetail'

const EventBookings = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const dispatch = useDispatch();
    const { event } = useContext(DashboardContext);
    const { data, rows, count, loading, error } = useSelector(({ tickets: { purchases } }) => purchases);

    useFocusEffect(
        useCallback(() =>{
            getPurchasesAction(event.id, page, pageSize)(dispatch);
        }, [event.id, page, pageSize, dispatch])
    )

  return (
    <View style={styles.container}>
        <HStack space={3} justifyContent="space-between">
            <Center h="130px" w="45%" bg={{
                linearGradient: {
                    colors: ["blue.600", "violet.800"],
                    start: [1, 1],
                    end: [0, 0]
                }
            }} rounded="3xl" shadow={3} px="5">
                <SIcon name='user' size={50} color="white" />
                <Divider my={2} bg="white" />
                <View>
                    <Text style={styles.count}>{count} Participant{count > 1 ? 's': ''}</Text>
                </View>
            </Center>
            <Center h="130px" w="45%" bg={{
                linearGradient: {
                    colors: ["yellow.600", "yellow.300"],
                    start: [1, 1],
                    end: [0, 0]
                }
            }} rounded="3xl" shadow={3} px="5" >
                <SIcon name='wallet' size={50} color="white" />
                <Divider my={2} bg="white" />
                <View>
                    <Text style={styles.count}>200$</Text>
                </View>
            </Center>
        </HStack>
        <Divider my={3} />
        <Flex direction='column'>
            {
                rows?.map((item, index) => (
                    <HStack p="15px" bg="gray.200" rounded="md" mb="3" alignItems="center" key={index}>
                        <AntIcon name="qrcode" size={35} />
                        <HStack justifyContent="space-between" w="5/6" alignItems="center">
                            <VStack marginLeft="10px">
                                <Text style={styles.user}>{item?.user.firstname} {item?.user.lastname}</Text>
                                <Text style={styles.price}>
                                    {item.ticket?.price}{item.ticket?.currency?.toLowerCase() === 'usd' ? '$': 'FC'}
                                </Text>
                            </VStack>
                            <Text style={styles.type}>{item?.ticket.name}</Text>
                        </HStack>
                    </HStack>
                ))
            }
        </Flex>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    count: {
        fontFamily: 'Barlow',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    user: {
        color: 'gray',
        fontFamily: 'Barlow'
    },
    price: {
        fontFamily: 'Barlow',
        fontWeight: 'bold',
        color: theme.colors.yellow[600]
    },
    type: {
        fontFamily: 'Barlow',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default EventBookings