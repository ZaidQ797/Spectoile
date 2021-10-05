import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import {Icon} from 'react-native-elements';
import {
  IconHeader,
  CatCard,
  UsageSlider,
  AdCard,
  ServiceCard,
  SmallLoader,
  NoContent,
  Spacer,
  IconButton,
} from '../../../components';
import {
  appIcons,
  appImages,
  colors,
  HP,
  WP,
  admob_ios_app_id,
} from '../../../utilities';
import I18n from '../../../translation';
import {appSliders} from '../../../utilities/assets';
import {
  getCategoriesRequest,
  getServicesRequest,
  updateCategories,
  wishlistCountRequest,
  addToWishlistRequest,
  removeFromWishlistRequest,
} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import {Alert} from 'react-native';

const Home = ({navigation}) => {
  const [staticCategories, setStaticCategories] = useState([
    {
      id: 0,
      label: I18n.t('workshops'),
      icon: appIcons.workshopCategory,
      selected: false,
    },
    {
      id: 1,
      label: I18n.t('attractions'),
      icon: appIcons.attrCategory,
      selected: true,
    },
    {
      id: 2,
      label: I18n.t('beauty'),
      icon: appIcons.beautyCategory,
      selected: false,
    },
    {
      id: 3,
      label: I18n.t('culture'),
      icon: appIcons.cultureCategory,
      selected: false,
    },
  ]);
  const [slider, setSlider] = useState([
    {
      id: 0,
      label: I18n.t('home_slider_title3'),
      subtitle: I18n.t('home_slider_subtitle3'),
      icon: appSliders.usageSlider3,
      step: '01',
    },
    {
      id: 1,
      label: I18n.t('home_slider_title2'),
      subtitle: I18n.t('home_slider_subtitle2'),
      icon: appSliders.usageSlider2,
      step: '02',
    },
    {
      id: 2,
      label: I18n.t('home_slider_title1'),
      subtitle: I18n.t('home_slider_subtitle1'),
      icon: appSliders.usageSlider1,
      step: '03',
    },
  ]);
  const [staticServices, setStaticServices] = useState([
    {
      id: 0,
      label: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      subtitle: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
    {
      id: 1,
      label: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      subtitle: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
    {
      id: 2,
      label: 'Swiss Museum of Speleology',
      icon: appImages.serviceBG,
      selected: false,
      location: 'Chamoson, Valais',
      subtitle: 'Reconstructed cave entrance, history of the spél',
      rating: 5,
      price: '100',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [maxPageReached, setMaxPageReached] = useState(false);
  const [currentSlug, setCurrentSlug] = useState('');
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const categoriesLoading = useSelector((state) => state.categories.loading);
  const servicesLoading = useSelector((state) => state.services.loading);
  const {services} = useSelector((state) => state.services);
  const {categories} = useSelector((state) => state.categories);

  //Get Categories & Services Frist Time
  useEffect(() => {
    if (token !== '') {
      getCategories();
      getWishlistCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getCategories = async () => {
    try {
      const cbSuccess = (response) => {
        setCurrentSlug(response[0]?.slug);
        getServices(response[0]?.slug);
      };
      const cdFailure = () => {};
      dispatch(getCategoriesRequest({token}, cbSuccess, cdFailure));
    } catch (err) {
      console.log(err);
    }
  };

  const getWishlistCount = () => {
    const cbSuccess = () => {};
    const cbFailure = () => {};
    dispatch(wishlistCountRequest({token}, cbSuccess, cbFailure));
  };

  useEffect(() => {}, [loadingMore]);

  const getServices = async (slug, page = 1, isLoadMore = false) => {
    console.log(isLoadMore);
    try {
      let serviceData = new FormData();
      serviceData.append('slug', slug);
      serviceData.append('page_id', page);
      const cbSuccess = (response) => {
        console.log(response);
        setMaxPage(response[0]?.max_pages);
        if (loadingMore) {
          setLoadingMore(false);
        }
      };
      const cdFailure = () => {
        if (loadingMore) {
          setLoadingMore(false);
        }
      };

      dispatch(
        getServicesRequest(
          serviceData,
          token,
          cbSuccess,
          cdFailure,
          isLoadMore,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [categories, servicesLoading, services]);

  //fired when tag pressed
  const onTagPress = (slug) => {
    const cbSuccess = (selectedSlug) => {
      console.log('selectedSlug', selectedSlug);
      setCurrentSlug(selectedSlug);
      getServices(selectedSlug);
    };
    const cdFailure = () => {};
    dispatch(updateCategories({slug, categories}, cbSuccess, cdFailure));
  };

  const onLoadMore = () => {
    setLoadingMore(true);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      getServices(currentSlug, currentPage, true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  //adding or removin from wishlist
  const onActionWishlist = (ID, type) => {
    let data = new FormData();
    data.append('type', type); //add or remove
    data.append('itemID', ID);
    let cbSuccess = (response) => {
      getServices(currentSlug, 1);
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
      <StatusBar barStyle={'dark-content'} />
      <IconHeader
        onLeftPress={() => navigation.toggleDrawer()}
        onSearchPress={() => navigation.navigate('Search')}
        onHeartPress={() => {
          navigation.navigate('Favorites');
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewCotainer}>
        {/* Banner View */}
        <ImageBackground
          source={appImages.homeBanner}
          style={styles.bannerContainer}>
          <View style={styles.topBannerCotainer}>
            <Text style={styles.welcomeText}>{I18n.t('welcome')}</Text>
            <Text style={styles.qouteText}>{I18n.t('best')}</Text>
            <Text style={styles.qouteText}>{I18n.t('activities')}</Text>
            <View style={styles.searchContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={I18n.t('searchPlaceholder')}
                  placeholderTextColor={colors.black}
                  style={styles.input}
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={searchText !== '' ? false : true}
                onPress={() =>
                  navigation.navigate('SearchResult', {
                    search_text: searchText,
                  })
                }
                style={styles.iconContainer}>
                <Icon
                  type={'feather'}
                  name={'search'}
                  color={colors.white}
                  size={WP('6')}
                />
                {/* <Image source={appIcons.searchIcon} style={styles.searchIcon} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <Text numberOfLines={2} style={styles.animatedText}>
            {I18n.t('bestIdeasQoute')}
          </Text>
        </ImageBackground>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categoriesLoading ? (
            <SmallLoader loading={categoriesLoading} height={HP('10')} />
          ) : categories?.length === 0 ? (
            <NoContent
              onRefreshPress={() => getCategories()}
              height={HP('13')}
            />
          ) : (
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: HP('2')}}
              keyExtractor={(item, index) => item + index.toString()}
              renderItem={({item, index}) => {
                return (
                  <CatCard
                    label={item.name}
                    icon={item.icon}
                    selected={item.selected}
                    onPress={onTagPress}
                    id={item.id}
                    item={item}
                  />
                );
              }}
            />
          )}
        </View>

        <Text style={[styles.redText, {marginTop: -HP('5')}]}>
          {I18n.t('live')}
        </Text>
        <Text style={styles.blackLable}>{I18n.t('currently_wanted')}</Text>
        <View style={styles.spacer} />

        {/* {servicesLoading && !loadingMore ? (
          <SmallLoader
            loading={servicesLoading}
            width={'100%'}
            height={HP('25')}
          />
        ) : null} */}

        <FlatList
          data={services}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index.toString()}
          onEndReachedThreshold={0.04}
          onEndReached={() => {
            if (currentPage >= maxPage) {
              setMaxPageReached(true);
            } else {
              setMaxPageReached(false);
              onLoadMore();
            }
          }}
          renderItem={({item, index}) => {
            return (
              <ServiceCard
                index={index}
                navigation={navigation}
                item={item}
                onActionWishlist={onActionWishlist}
              />
            );
          }}
        />

        {/* Ad View */}
        {/* TODO */}
        {/* Update test id with original id */}
        <Spacer />
        <View style={styles.banner}>
          <BannerAd unitId={admob_ios_app_id} size={BannerAdSize.BANNER} />
        </View>
        <Spacer />
        <ImageBackground
          style={styles.bottomCotainer}
          source={appImages.randomBack}>
          <View style={styles.bottomInnerContainer}>
            {/* <Text numberOfLines={2} style={styles.simpleBlack}>
              {I18n.t('joinus_now')}
            </Text> */}
            <Text style={styles.title}>
              “Les interminables recherches c'est du passé”
            </Text>
            <View style={styles.spacer} />
            <Text style={styles.subtitle}>
              Désormais il n’y a plus besoin de passer du temps pour rechercher
              des événements. Idées Sorties rassemble pour vous des milliers
              d’adresses dans toute la Suisse afin de vous proposer les
              meilleures sorties. Avis des clients, horaires et réservations
              tout est fait pour vous simplifier la vie.
            </Text>
            <View style={styles.spacer} />
            <IconButton
              title={'Idée aléatoire'}
              backgroundColor={colors.p1}
              icon={appIcons.circleChevronRight}
              iconColor={colors.white}
              titleColor={colors.white}
              style={styles.loginButton}
              onSubmit={() => {
                navigation.navigate('RandomListing');
                // navigation.navigate('Auth', {
                //   screen: 'Login',
                // });
              }}
            />
            <View style={styles.spacer} />
          </View>
        </ImageBackground>
        {/* Use Swiper */}
        <Text style={styles.redText}>{I18n.t('it_is_so')}</Text>
        <Text style={styles.blackLable}>{I18n.t('simple_fast')}</Text>
        <UsageSlider data={slider} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
