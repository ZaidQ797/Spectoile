import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, ActivityIndicator, View} from 'react-native';
import {ServiceCard, ListCard} from '../../../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  searchRequest,
  activeTabRequest,
  contentScrollingRequest,
} from '../../../../../redux/actions';
import {colors} from '../../../../../utilities';

const ByDefault = ({navigation}) => {
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
  const {gridView} = useSelector((state) => state.login);

  useEffect(() => {
    onSearchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      dispatch(activeTabRequest('default'));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);

  const onSearchAPI = (currPage = 1, isLoadMore = false) => {
    setLoading(true);
    let data = new FormData();
    data.append('title', '');
    data.append('page_id', currPage);
    const cbSuccess = (response) => {
      console.log(response.max_pages);
      setLoading(false);
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
    //  onSearchAPI(currentPage, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {}, [searchResult]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement?.height + contentOffset?.y >= contentSize?.height - 20
    );
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset?.y == 0;
  };

  return (
    <SafeAreaView style={styles.body}>
      {/* <View style={styles.spacer} /> */}
      <View>
        <FlatList
          data={searchResult}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          onScrollToTop={() => dispatch(contentScrollingRequest(false))}
          onScroll={({nativeEvent}) => {
            dispatch(contentScrollingRequest(true));
            if (isCloseToTop(nativeEvent)) {
              dispatch(contentScrollingRequest(false));
              //do something
            }
            if (isCloseToBottom(nativeEvent)) {
              // dispatch(contentScrollingRequest(true));
              // setScrolling(true);
              //do something
            }
          }}
          renderItem={({item, index}) => {
            if (!item) return null;
            return gridView ? (
              <ServiceCard
                showHeartIcon={false}
                key={index}
                navigation={navigation}
                item={item}
              />
            ) : (
              <ListCard navigation={navigation} key={index} item={item} />
            );
          }}
          keyExtractor={(item, index) => item + index.toString()}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={
          //   maxPageReached ? null : (
          //     <ActivityIndicator animating color={colors.p1} />
          //   )
          // }
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
      </View>
    </SafeAreaView>
  );
};

export default ByDefault;
