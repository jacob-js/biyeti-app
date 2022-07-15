import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import FeatIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import React, { useCallback, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { theme } from '../../assets/theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MiniEventCard from '../Commons/MiniEventCard';
import Empty from '../Commons/Empty';
import ContentLoader from 'react-native-easy-content-loader';
import axios from 'axios';
import EventListItem from '../Commons/EventListItem';

const SearchResult = ({route}) => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [count, setCount] = useState(0);

    const getData = async(text) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/events/search?query=${text}&p_size=${10}&p=${page}`);
            if(page === 1) {
                setRows(res.data.data.rows);
            }else{
                setRows([...rows, ...res.data.data.rows]);
            }
            setCount(res.data.data?.count);
        } catch (error) {
        }
        setLoading(false);
    };

    const onClear = () =>{
        setQuery('');
        setPage(1);
        setRows([]);
        setCount(0);
    };

    const onEndReached = () => {
        if(query.length > 0 && count > rows.length){
            setPage(page + 1);
            getData();
        }
    };

    useFocusEffect(
        useCallback(() => {

            return () => {}
        }, [])
    );

    const debounce = (cb) =>{
        let timeout;
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb(...args);
            }, 1000);
        }
    };

    const onChangeText = debounce(text =>{
        setQuery(text);
        setPage(1);
        setRows([]);
        setCount(0);
        if(text.length > 0){
            getData(text);
        }
    })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FeatIcon name="chevron-left" 
            size={30} color={theme.colors.light}
            onPress={() => navigation.goBack()}
        />
        <Searchbar
            placeholder="Rechercher"
            style={styles.search}
            collapsable
            clearButtonMode='while-editing'
            inputStyle={styles.inputStyle}
            onChangeText={text => onChangeText(text)}
            autoFocus
            icon={() => <EvilIcon name="search" size={20} color={theme.colors.light} />}
            clearIcon={() => 
                query.length > 0 &&
                <EvilIcon 
                    name="close" 
                    size={20} 
                    color={theme.colors.light}
                    onPress={onClear}
                />
            }
        />
      </View>

      <View style={styles.content}>

        <FlatList
            contentContainerStyle={styles.scrollViewContainer}
            ListHeaderComponent={() => <Text style={styles.title}>Resultats de la recherche</Text>}
            ListFooterComponent={
                loading &&
                <>
                    <ContentLoader pRows={0} pWidth={320} pHeight={200} 
                        active
                        tWidth={Dimensions.get('window').width - 30}
                        tHeight={60}
                        titleStyles={styles.skeleton}
                    /> 
                    <ContentLoader pRows={0} pWidth={320} pHeight={200} 
                        active
                        tWidth={Dimensions.get('window').width - 30}
                        tHeight={60}
                        titleStyles={styles.skeleton}
                    />  
                </>
            }
            data={rows}
            renderItem={({ item }) => <EventListItem event={item} />}
            onEndReached={onEndReached}
            ListEmptyComponent={!loading && <Empty />}
            onEndReachedThreshold={0.2}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        paddingTop:  30,
        paddingBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        shadowColor: theme.colors.light100,
        elevation: 5,
        borderColor: theme.colors.light100,
        backgroundColor: 'white',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    search: {
        width: '90%',
        elevation: 0,
        borderColor: theme.colors.light100,
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
    },
    inputStyle: {
        fontSize: 12,
    },
    content: {
        flex: 1,
        // paddingTop: 20,
    },
    scrollViewContainer: {
        paddingTop: 20,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'Barlow-Bold',
        textTransform: 'uppercase',
        color: theme.colors.light,
        marginBottom: 20
    },
    skeleton: {
        borderRadius: 15,
        marginLeft: -10
    }
});

export default SearchResult