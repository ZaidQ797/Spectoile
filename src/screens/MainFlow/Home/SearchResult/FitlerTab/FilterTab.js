import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import {DropDown, ListCard, SearchCard} from '../../../../../components';
import I18n from '../../../../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {
  sortAlert,
  activeTabRequest,
  contentScrollingRequest,
} from '../../../../../redux/actions';

const FitlerTab = ({navigation}) => {
  const [services, setServices] = useState([]);

  const dispatch = useDispatch();
  const {filterResults, searchObj} = useSelector((state) => state.filter);
  const {gridView} = useSelector((state) => state.login);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      dispatch(activeTabRequest('filter'));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    console.log('filterResult', filterResults);
    setServices(filterResults);
  }, [filterResults]);

  function makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement?.height + contentOffset?.y >= contentSize?.height - 20
    );
  };

  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    return contentOffset?.y === 0;
  };

  return (
    <View style={styles.main}>
      <View style={styles.spacer} />
      <DropDown
        zIndex={10}
        data={[
          {
            label: I18n.t('sort_by_date'),
            value: 'date',
          },
          {
            label: I18n.t('sort_by_title'),
            value: 'title',
          },
          {
            label: I18n.t('sort_by_featured_first'),
            value: 'featured-first',
          },
          {
            label: I18n.t('sort_by_featured_last'),
            value: 'featured-last',
          },
          {
            label: I18n.t('sort_by_price_htl'),
            value: 'price-range-high',
          },
          {
            label: I18n.t('sort_by_price_lth'),
            value: 'price-range-low',
          },
          {
            label: I18n.t('sort_by_id'),
            value: 'ID',
          },
          {
            label: I18n.t('sort_by_random'),
            value: 'rand',
          },
          {
            label: I18n.t('sort_by_menu_order'),
            value: 'menu_order',
          },
        ]}
        label={I18n.t('default_sort')}
        getVal={(item) => {
          searchObj.orderBy = item.value;
          dispatch(sortAlert(makeid()));
        }}
      />
      <View style={styles.spacer} />
      {/* <DropDown zIndex={9} data={[]} label={I18n.t('open')} /> */}
      <View style={styles.spacer} />
      <FlatList
        data={services}
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
            // setScrolling(true);
            //do something
          }
        }}
        extraData={services}
        renderItem={({item, index}) => {
          return gridView ? (
            <SearchCard navigation={navigation} item={item} />
          ) : (
            // <ServiceCard key={index} navigation={navigation} item={item} />
            <ListCard navigation={navigation} key={index} item={item} />
          );
        }}
      />
    </View>
  );
};

export default FitlerTab;
