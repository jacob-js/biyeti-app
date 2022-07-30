import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './styles'
import { Divider } from 'native-base'
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { purchaseAction } from '../../../../Redux/actions/tickets';
import { useDispatch } from 'react-redux';
import Checkout from '../Checkout';
import context from '../../context';

const Tickets = ({tickets}) => {
    const { setShowPurchased } = useContext(context);
    const dispatch = useDispatch();
    const [showCheckout, setShowCheckout] = useState(false);
    const [ticketToBuy, setTicketToBuy] = useState({});

    const onTicketClick = (ticket) =>{
        if(ticket.price <= 0){
            purchaseAction(ticket)(dispatch, cb =>{
                if(cb){ setShowPurchased(true) }
            })
        }else{
            setShowCheckout(true);
            setTicketToBuy(ticket);
        }
    };

  return (
    <>
      {
        tickets?.map((ticket, index) =>(
            <View key={index}>
                <TouchableOpacity style={styles.ticket} key={index} onPress={() =>onTicketClick(ticket)}>
                    <View style={styles.ticketAvatar}>
                        {ticket.name.toLowerCase() === 'vip' ? <Image source={{
                            uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-vip-music-festival-flaticons-flat-flat-icons.png"
                        }} style={styles.vipIcon} /> :
                            <FaIcon name='ticket-alt' style={styles.ticketIcon} />
                        }
                    </View>
                    <View style={styles.ticketInfo}>
                        <Text style={styles.ticketName}>{ticket.name}</Text>
                        {
                            ticket.caption &&
                            <Text style={styles.ticketDesc}>{ticket.caption}</Text>
                        }
                        {
                            ticket.price > 0 ?
                            <Text style={styles.ticketPrice}>{ticket.price} {ticket.currency.toLowerCase() === 'usd' ? '$': 'FC'}</Text>:
                            <Text style={styles.ticketPrice}>GRATUIT</Text>
                        }
                    </View>
                </TouchableOpacity>
                {
                    index + 1 !== tickets.length && <Divider my={3} mb={3} />
                }
            </View>
        ))
      }
      <Checkout isOpen={showCheckout} setIsOpen={setShowCheckout} ticket={ticketToBuy} />
    </>
  )
}

export default Tickets