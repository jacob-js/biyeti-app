import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAgentsAction } from '../../../../Redux/actions/agents';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, FlatList, Heading, HStack, Spacer, VStack, Text, Flex, Button, theme as nbTheme, Divider } from 'native-base';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign'
import AddAgentModal from './AddAgentModal';
import EditAgentModal from './EditAgentModal';
import { theme } from '../../../../../assets/theme';
import { isEventAdmin } from '../../../../Utils/helpers';

export default function EventAgents({navigation, eventId}) {
    const dispatch = useDispatch();
    const { data, loading, count, rows } = useSelector(({ agents: { agents }}) => agents);
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editableAgent, setEditable] = useState({});

    const refresh = () => {
      getAgentsAction(null, eventId)(dispatch, navigation);
    }

    useEffect(() =>{
        refresh();
        return () => {
          getAgentsAction(user.id)(dispatch, navigation);
        }
    }, [navigation, eventId]);

    const onEdit = (agent) =>{
      setEditable(agent);
      setShowEditModal(true);
    }

  return (
    <Box bg="white" height="full">
      <View style={styles.header}>
        <Flex direction='row' justifyContent="space-between" alignItems="center">
          <Heading fontSize="xl">
            Membres
          </Heading>
          <Button width={50} marginRight={3} bgColor={theme.colors.default100}
            _text={{ color: "green.50" }}
            borderRadius={10}
            onPress={() => setShowAddModal(true)}
          >
            <AntIcon name="pluscircleo" color="white" />
          </Button>
        </Flex>
        <Text style={styles.descript}>Les membres sont ceux qui peuvent accéder à l'éspace de gestion de l'évenement</Text>
        <Divider mt="20px" />
      </View>
      <View>
        {
        rows.length > 0 &&
        rows.map((item, index) =>(
          <Box _dark={{
            borderColor: "gray.600"
          }} borderColor="coolGray.200" pl="4" pr="5" py="2"
            bg="gray.200"
            borderRadius={20}
            m="2"
            key={index}
          >
                  <HStack space={3} py="10px" justifyContent="space-between">
                    <Avatar size="48px" source={item.user?.avatar &&{
                      uri: item.user?.avatar
                    }} >
                      <SIcon name='user' size={25} color={nbTheme.colors.gray[500]} />
                    </Avatar>
                    <VStack justifyContent="center">
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
                      isEventAdmin(user, rows) &&
                      item.user?.id !== user.id ?
                      <Flex flexDirection="row" alignItems="flex-end">
                        <Button height="30px" borderWidth={1} borderRadius={10}
                          borderColor={nbTheme.colors.gray[300]} bgColor="white"
                          onPress={() => onEdit(item)}
                        >
                          <AntIcon name='edit' color={nbTheme.colors.gray[400]}/>
                        </Button>
                        <Button borderRadius={10} 
                          borderColor="danger.700" marginLeft={2} height="30px"
                          borderWidth={1} bgColor="gray.200"
                        >
                          <AntIcon name='close' color={nbTheme.colors.danger[700]} />
                        </Button>
                      </Flex>:null
                    }
                  </HStack>
                </Box>
        ))
      }
      </View>
      <AddAgentModal showModal={showAddModal} setShowModal={setShowAddModal} eventId={eventId} />
      <EditAgentModal showModal={showEditModal} setShowModal={setShowEditModal} agent={editableAgent} />
    </Box>
  )
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  descript: {
    fontFamily: "Barlow",
    marginTop: 10
  }
});