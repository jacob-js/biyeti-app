import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Center, Divider, Flex, HStack, theme, VStack, Button } from 'native-base'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getPurchasesAction } from '../Redux/actions/tickets'
import { DashboardEventContext } from '../Utils/contexts'
import useAxios from 'axios-hooks'

function EventBookings() {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const dispatch = useDispatch();
    const { event, setViewScan } = useContext(DashboardEventContext);
    const { data, rows, count, loading, error } = useSelector(({ tickets: { purchases } }) => purchases);
    const [{data: scannedData, loading: loadingScanned}, getScanned] = useAxios({ url: `/api/v1/tickets/scanned/${event.id}?p=1&p_size=2` });

    useFocusEffect(
        useCallback(() =>{
            getPurchasesAction(event.id, page, pageSize)(dispatch);
        }, [event.id, page, pageSize, dispatch])
    );

    useFocusEffect(
        useCallback(() =>{
            getScanned()
        }, [])
    );

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
                    <Text style={styles.count}>{scannedData?.data.count} qui paricipe{scannedData?.data.count > 1 ? 'nt': ''}</Text>
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
                    <Text style={styles.count}>{count} {`Réservation${count > 1 ? 's': ''}`}</Text>
                </View>
            </Center>
        </HStack>
        <Button
            title='Scanner'
            style={styles.btn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            leftIcon={<MatIcon name='qrcode-scan' color="white" size={20} />}
            onPress={() =>setViewScan(true)}
        >Scanner</Button>
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
    },
    btn: {
        height: 50,
        backgroundColor: theme.colors.yellow[600],
        // shadowOpacity: 0.4,
        // elevation: 15,
        borderRadius: 15,
        marginTop: 20,
        // marginBottom: 20,
    }
})

export default EventBookings