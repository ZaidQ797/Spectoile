import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {IconHeader, Loader, NoContent, SearchCard} from '../../../components';
import I18n from '../../../translation';
import {appIcons, colors, appImages} from '../../../utilities';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {searchRequest} from '../../../redux/actions';

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState(1);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [maxPageReached, setMaxPageReached] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {searchResult} = useSelector((state) => state.filter);

  useEffect(() => {
    onSearchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {}, [searchResult]);

  const onSearchAPI = (page = 1, isLoadMore = false) => {
    if (!isLoadMore) {
      setLoading(true);
    }
    let data = new FormData();
    data.append('title', searchText);
    data.append('page_id', page);
    const cbSuccess = (response) => {
      setLoading(false);
      console.log(response);
      setMaxPages(response.max_pages);
      setServices(response?.data);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(searchRequest(data, token, cbSuccess, cbFailure, isLoadMore));
  };

  const onLoadMore = () => {
    setLoadingMore(true);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    onSearchAPI(currentPage, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <SafeAreaView style={styles.main}>
      <IconHeader
        onLeftPress={() => navigation.toggleDrawer()}
        showSearch={false}
        onHeartPress={() => navigation.navigate('Favorites')}
      />
      {/* Banner View */}
      <ImageBackground
        source={appImages.homeBanner}
        style={styles.bannerContainer}>
        <View style={styles.topBannerCotainer}>
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={I18n.t('searchPlaceholder')}
                placeholderTextColor={colors.black}
                style={styles.input}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => onSearchAPI()}
              style={styles.iconContainer}>
              <Image source={appIcons.searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.qouteText}>{I18n.t('recent')}</Text>
      {loading ? (
        <View style={styles.centerView}>
          <ActivityIndicator animating color={colors.p1} />
        </View>
      ) : services?.length === 0 ? (
        <View style={styles.centerView}>
          <Text style={styles.simpleText}>No Results Found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResult}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListStyle}
          renderItem={({item, index}) => {
            return <SearchCard navigation={navigation} item={item} />;
          }}
          ListFooterComponent={
            maxPageReached ? null : (
              <ActivityIndicator animating color={colors.p1} />
            )
          }
          onEndReached={() => {
            console.log('onEndReached', maxPages, currentPage);
            if (currentPage >= maxPages) {
              setMaxPageReached(true);
            } else {
              setMaxPageReached(false);
              onLoadMore();
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
