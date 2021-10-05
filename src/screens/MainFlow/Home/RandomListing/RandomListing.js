import React, {useState, useEffect} from 'react';
import {SafeAreaView, ImageBackground, Text, View} from 'react-native';
import {
  IconHeader,
  IconButton,
  ServiceCard,
  Spacer,
} from '../../../../components';
import {appIcons, colors, appImages} from '../../../../utilities';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRandomPostRequest,
  addToWishlistRequest,
  removeFromWishlistRequest,
} from '../../../../redux/actions';

const RandomListing = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [randomData, setRandomData] = useState(null);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {randomPost} = useSelector((state) => state.services);

  useEffect(() => {
    onGetRandomPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetRandomPost = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setRandomData(res);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getRandomPostRequest(null, token, cbSuccess, cbFailure));
  };

  //adding or removin from wishlist
  const onActionWishlist = (ID, type) => {
    let data = new FormData();
    data.append('type', type); //add or remove
    data.append('itemID', ID);
    let cbSuccess = (response) => {
      setRandomData({
        ...randomData,
        in_wish_list: !randomData.in_wish_list,
      });
      console.log('Wishlist action api success @@@*******@@@@', response);
    };
    let cbFailure = (error) => {
      console.log('Wishlist action api error   @@@*******@@@@', error);
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
        showSearch={false}
        onHeartPress={() => navigation.navigate('Favorites')}
      />
      {/* Banner View */}
      <ImageBackground
        source={appImages.randomListBG}
        style={styles.bannerContainer}>
        <View style={styles.topBannerCotainer}>
          <Text style={styles.whiteText}>Pas d'inspiration ?</Text>
          <Text style={styles.whiteBoldText}>Idée aléatoire</Text>
        </View>
      </ImageBackground>
      <Text style={styles.qouteText}>Idée au hasard.</Text>
      <Text style={styles.qouteSubText}>
        Nous avons sélectionné une idée au hasard dans notre annuaire pour vous.
      </Text>
      <IconButton
        title={'Autre proposition'}
        backgroundColor={colors.p1}
        icon={appIcons.refershingIcon}
        iconColor={colors.white}
        isLoading={loading}
        titleColor={colors.white}
        style={styles.loginButton}
        onSubmit={() => {
          onGetRandomPost();
        }}
      />
      <Spacer />
      <View style={styles.cardContainer}>
        {randomData ? (
          <ServiceCard
            index={0}
            navigation={navigation}
            //           item={{
            //             ID: 2375,
            //             associated_cats: [],
            //             assocuated_locations: [
            //               {
            //                 count: 5,
            //                 description: '',
            //                 filter: 'raw',
            //                 name: 'Lausanne',
            //                 parent: 233,
            //                 slug: 'lausanne',
            //                 taxonomy: 'listing-location',
            //                 term_group: 0,
            //                 term_id: 239,
            //                 term_taxonomy_id: 239,
            //               },
            //               {
            //                 count: 5,
            //                 description: '',
            //                 filter: 'raw',
            //                 name: 'Lausanne',
            //                 parent: 233,
            //                 slug: 'lausanne',
            //                 taxonomy: 'listing-location',
            //                 term_group: 0,
            //                 term_id: 239,
            //                 term_taxonomy_id: 239,
            //               },
            //             ],
            //             avg_price_tag: ['3'],
            //             avg_rating: 0,
            //             comment_count: '0',
            //             comment_status: 'open',
            //             filter: 'raw',
            //             guid:
            //               'https://idees-sorties.ch/?post_type=listing-item&#038;p=2375',
            //             in_wish_list: false,
            //             menu_order: 0,
            //             ping_status: 'closed',
            //             pinged: '',
            //             post_author: '1',
            //             post_content: `Découvrez la céramique d'une toute nouvelle manière à l'atelier de la Harpe ! Commencez par imaginer un simple projet et concrétisez-le avec vos mains. Testez de différents matériaux et des techniques variées pour laisser libre court à votre imagination. Tous les mardis de 19 heures à 21 heures.
            // ↵
            // ↵Nous vous invitons à bien vouloir nous contacter en avance afin de savoir si des places sont encore disponibles pour nos divers ateliers de poterie.`,
            //             post_content_filtered: '',
            //             post_date: '2019-08-09 08:56:59',
            //             post_date_gmt: '2019-08-09 06:56:59',
            //             post_excerpt: '',
            //             post_mime_type: '',
            //             post_modified: '2019-08-09 08:57:32',
            //             post_modified_gmt: '2019-08-09 06:57:32',
            //             post_name: 'atelier-ceramique-de-la-harpe',
            //             post_parent: 0,
            //             post_password: '',
            //             post_status: 'publish',
            //             post_title: 'Atelier Céramique de la Harpe',
            //             post_type: 'listing-item',
            //             thumb_url:
            //               'https://idees-sorties.ch/wp-content/uploads/2019/08/9910_default_landscape.jpg',
            //             to_ping: '',
            //           }}
            item={randomData}
            onActionWishlist={onActionWishlist}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default RandomListing;
