import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAgentsAction } from '../Redux/actions/agents';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, FlatList, Heading, HStack, Spacer, VStack, Text, Flex, Button, theme as nbTheme } from 'native-base';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../assets/theme';
import AddAgentModal from '../Components/AddAgentModal';

export default function EventAgents({navigation, eventId}) {
    const dispatch = useDispatch();
    const { data, loading, count, rows } = useSelector(({ agents: { agents }}) => agents);
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const [showAddModal, setShowAddModal] = useState(false);

    const refresh = () => {
      getAgentsAction(null, eventId)(dispatch, navigation);
    }

    useEffect(() =>{
        refresh();
        return () => {
          getAgentsAction(user.id)(dispatch, navigation);
        }
    }, [navigation, eventId]);

  return (
    <Box>
      <Flex direction='row' justifyContent="space-between" alignItems="center" marginBottom="15px">
        <Heading fontSize="xl" p="4" pb="3">
          Agents
        </Heading>
        <Button width={50} marginRight={3} bgColor={theme.colors.default100}
          _text={{ color: "green.50" }}
          borderRadius={10}
          onPress={() => setShowAddModal(true)}
        >
          <AntIcon name="pluscircleo" color="white" />
        </Button>
      </Flex>
      <FlatList data={rows} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
              <Avatar size="48px" source={item.user?.avatar &&{
                uri: item.user?.avatar
              }} >
                <SIcon name='user' size={25} color={nbTheme.colors.gray[500]} />
              </Avatar>
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold fontFamily="Barlow">
                  {item.user?.firstname} {item?.user.lastname}
                </Text>
                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontFamily="Barlow">
                  {item.role}
                </Text>
              </VStack>
              <Spacer />
              {
                item.role.toLowerCase() === 'admin' &&
                item.user?.id !== user.id &&
                <Flex flexDirection="row" alignItems="flex-end">
                  <Button variant="outline" height="30px" borderColor={nbTheme.colors.primary[600]}>
                    <AntIcon name='edit' color={nbTheme.colors.primary[700]}/>
                  </Button>
                  <Button variant="outline" borderColor="danger.700" marginLeft={2} height="30px">
                    <AntIcon name='delete' color={nbTheme.colors.danger[700]} />
                  </Button>
                </Flex>
              }
            </HStack>
          </Box>} keyExtractor={item => item.id}
          onRefresh={refresh} refreshing={loading}
      />
      <AddAgentModal showModal={showAddModal} setShowModal={setShowAddModal} eventId={eventId} />
    </Box>
  )
}