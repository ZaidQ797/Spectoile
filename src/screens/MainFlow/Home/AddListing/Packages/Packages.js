import React, {useState, Fragment, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import {IconHeader, PackageSlider, Loader} from '../../../../../components';
import {colors} from '../../../../../utilities';
import styles from './styles';
import I18n from '../../../../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInitialRoute,
  getPackagesRequest,
  addToCartRequest,
} from '../../../../../redux/actions';
import * as RNIap from 'react-native-iap';
import getSymbolFromCurrency from 'currency-symbol-map';

const items = Platform.select({
  ios: ['pack_standard', 'pack_premium'],
  android: [],
});

const Packages = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    dispatch(setInitialRoute('App'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onGetPacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onGetPacks = () => {
    setTimeout(() => {
      setLoading(true);
    }, 300);
    const cbSuccess = (res) => {
      setSlider(res?.reverse());
      getInAppProducts(res);
      console.log(res);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getPackagesRequest({}, token, cbSuccess, cbFailure));
  };

  const getCurrencySymbol = (currencyCode) => {
    return getSymbolFromCurrency(currencyCode);
  };

  const getInAppProducts = () => {
    RNIap.initConnection()
      .then(() => {
        console.log('connected to store...');
        RNIap.getSubscriptions(items)
          .then((res) => {
            setProducts(
              slider.map((item) => {
                if (item.ID === 44) {
                  return {
                    ...item,
                    localizedPrice: res[1].localizedPrice,
                    productId: res[1].productId,
                  };
                }
                if (item.ID === 46) {
                  return {
                    ...item,
                    localizedPrice: res[0].localizedPrice,
                    productId: res[0].productId,
                  };
                }
                return {
                  ...item,
                  localizedPrice: `${getCurrencySymbol(res[0].currency)} 0.00`,
                };
              }),
            );
            console.log('products found...', res);
          })
          .catch((err) => {
            console.log('error getting the products...', err);
          });
      })
      .catch(() => {
        console.log('error connecting to store...');
      });
  };

  const onBuyPack = (packID, item) => {
    let data = new FormData();
    data.append('quantity', 1);
    data.append('product_id', packID);
    setLoading(true);
    const cbSuccess = (res) => {
      if (res === 'you cannot add same item more then one') {
        setLoading(false);
        setTimeout(() => {
          Alert.alert(
            'Alerte',
            `Vous ne pouvez pas ajouter plus d’ un pack`,
            [
              {
                text: I18n.t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Check-out', onPress: () => navigation.navigate('Cart')},
            ],
            {cancelable: false},
          );
        }, 1000);
      } else {
        setLoading(false);
        navigation.navigate('Cart', {
          item: item,
        });
      }
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(addToCartRequest(data, token, cbSuccess, cbFailure));
  };

  useEffect(() => {
    console.log('slider', slider);
    getInAppProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider]);

  useEffect(() => {
    console.log('products', products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <StatusBar barStyle="dark-content" />
        <IconHeader
          onLeftPress={() => navigation.toggleDrawer()}
          onSearchPress={() => navigation.navigate('Search')}
          onHeartPress={() => navigation.navigate('Favorites')}
        />
        <View style={styles.body}>
          <View style={styles.sliderCotainer}>
            <Text style={styles.redText}>{I18n.t('packages')}</Text>
            <Text numberOfLines={2} style={styles.blackText}>
              {I18n.t('select_pack')}
            </Text>
            <PackageSlider data={products} onBuyPack={onBuyPack} />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      <Loader loading={loading} />
    </Fragment>
  );
};

export default Packages;
