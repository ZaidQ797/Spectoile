import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, FlatList} from 'react-native';
import {IconHeader, ServiceCard} from '../../../components';
import I18n from '../../../translation';
import {appImages} from '../../../utilities';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  getWishlistRequest,
  addToWishlistRequest,
  removeFromWishlistRequest,
} from '../../../redux/actions';

const Favorites = ({navigation}) => {
  const [services, setServices] = useState([
    {
      id: 0,
      post_title: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      subtitle: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
    {
      id: 1,
      post_title: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      post_content: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
    {
      id: 2,
      post_title: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      post_content: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
  ]);

  const {token} = useSelector((state) => state.login);
  const {wishlist} = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [wishlist]);

  const getWishlistData = () => {
    let cbSuccess = () => {};
    let cbFailure = () => {};
    dispatch(getWishlistRequest({token}, cbSuccess, cbFailure));
  };

  //adding or removin from wishlist
  const onActionWishlist = (ID, type) => {
    let data = new FormData();
    data.append('type', type); //add or remove
    data.append('itemID', ID);
    let cbSuccess = (response) => {
      console.log('Wishlist action api success @@@*******@@@@', response);
      getWishlistData();
    };
    let cbFailure = (error) => {
      console.log('Wishlist action api error @@@*******@@@@', error);
    };
    if (type === 'add') {
      dispatch(addToWishlistRequest(data, token, cbSuccess, cbFailure));
    } else {
      dispatch(removeFromWishlistRequest(data, token, cbSuccess, cbFailure));
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <IconHeader
        onLeftPress={() => navigation.toggleDrawer()}
        showHeart={false}
        onSearchPress={() => navigation.navigate('Search')}
      />
      <Text style={styles.qouteText}>{I18n.t('favorites')}</Text>
      <FlatList
        data={wishlist}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        renderItem={({item, index}) => {
          return (
            <ServiceCard
              navigation={navigation}
              item={item}
              key={index}
              onActionWishlist={onActionWishlist}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Favorites;
