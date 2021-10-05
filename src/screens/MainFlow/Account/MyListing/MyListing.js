import React, {useState, Fragment, useEffect} from 'react';
import {View, SafeAreaView, ScrollView, Text, FlatList} from 'react-native';
import styles from './styles';
import {TitleHeader, SearchCard, Loader} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';
import {
  getListingRequest,
  deleteListingRequest,
} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const MyListing = ({navigation, route}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    onGetListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetListing = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setServices(
        res.map((item) => {
          return {
            ...item,
            post_title: item.title,
            ID: item.id,
          };
        }),
      );
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getListingRequest({}, token, cbSuccess, cbFailure));
  };

  const onDeleteListing = (id) => {
    setDeleting(true);
    let data = new FormData();
    data.append('listing_id', id);
    const cbSuccess = (res) => {
      onGetListing();
      setDeleting(false);
    };
    const cbFailure = () => {
      setDeleting(false);
    };
    dispatch(deleteListingRequest(data, token, cbSuccess, cbFailure));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.pop()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.spacer} />
            <Text style={styles.qoute}>{I18n.t('my_list_qoute')}</Text>

            {loading && (
              <Fragment>
                <View style={styles.spacer} />
                <ActivityIndicator />
              </Fragment>
            )}
            <FlatList
              data={services}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListStyle}
              renderItem={({item, index}) => {
                return (
                  <SearchCard
                    key={index}
                    navigation={navigation}
                    item={item}
                    showButtons
                    onDelete={onDeleteListing}
                  />
                );
              }}
            />
          </ScrollView>
        </View>
        {/* <Loader loading={loading} /> */}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default MyListing;
