import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {TitleHeader, Loader} from '../../../../components';
import styles from './styles';
import {Divider} from 'react-native-elements';
import {appImages, colors, family} from '../../../../utilities';
import I18n from '../../../../translation';
import Carousel from 'react-native-snap-carousel';
import {scrollInterpolator, animatedStyles} from './Animations';
import {useSelector, useDispatch} from 'react-redux';
import {userPackagesRequest} from '../../../../redux/actions';
import moment from 'moment';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const MyPackages = ({navigation, route}) => {
  const _carouselRef = useRef();

  const [slider, setSlider] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    onGetPacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetPacks = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setSlider(res);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(userPackagesRequest({}, token, cbSuccess, cbFailure));
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.merciCard}>
          <ImageBackground
            resizeMode={'contain'}
            source={appImages.merciBG}
            style={styles.merciBg}>
            <Text numberOfLines={2} style={styles.merciText}>
              {item?.package_name}
            </Text>
          </ImageBackground>
          <View
            style={[
              styles.greenView,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor:
                  item?.items_remaining === 0 ? '#FF0000' : colors.lightGreen,
              },
            ]}>
            <Text style={styles.statusText}>
              {item?.items_remaining === 0
                ? 'Statut: inactif'
                : 'Statut: Actif'}
            </Text>
          </View>
          <Row
            label={I18n.t('expiration_date')}
            value={moment(item?.expiration_date * 1000).format('DD/MM/YYYY')}
          />
          <Divider style={styles.divider} />
          <Row
            label={I18n.t('references_included')}
            value={item?.items_included}
          />
          <Divider style={styles.divider} />
          <Row
            label={I18n.t('references_remaining')}
            value={item?.items_remaining}
          />
          <Divider style={styles.divider} />
          <Row
            label={I18n.t('highlights_included')}
            value={item?.featured_items_included}
          />
          <Divider style={styles.divider} />
          <Row
            label={I18n.t('upgrades_remaining')}
            value={item?.featured_items_remaining}
          />
          <Divider style={styles.divider} />
          <Row
            label={I18n.t('authorized_annoucments')}
            value={item?.ads_allowed}
          />
          <Divider style={styles.divider} />
        </View>
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.pop()}
          title={route?.params?.item?.label}
        />
        <View>
          <Carousel
            ref={_carouselRef}
            data={slider}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={(_index) => setIndex(_index)}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
        </View>
        {slider.length === 0 && !loading ? (
          <View style={styles.centerView}>
            <Text style={styles.redText}>No Purchased Packages Available</Text>
          </View>
        ) : null}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      <Loader loading={loading} />
    </Fragment>
  );
};

const Row = ({label, value}) => (
  <View style={styles.rowCotainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default MyPackages;
