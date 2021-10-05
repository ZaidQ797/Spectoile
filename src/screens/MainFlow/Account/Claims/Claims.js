import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {TitleHeader, AddPaymentCard, ClaimedCard} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {getClaimedRequest} from '../../../../redux/actions';

const Claims = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {claimed} = useSelector((state) => state.listings);

  useEffect(() => {
    onGetClaims();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('claimed', claimed);
  }, [claimed]);

  const onGetClaims = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getClaimedRequest({}, token, cbSuccess, cbFailure));
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
            {loading ? (
              <View style={styles.centerView}>
                <ActivityIndicator size={'large'} animating color={colors.p1} />
              </View>
            ) : claimed?.length > 0 ? (
              <FlatList
                data={claimed}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                renderItem={({item, index}) => (
                  <ClaimedCard item={item} index={index} />
                )}
              />
            ) : (
              <AddPaymentCard
                title={I18n.t('no_claim_qoute')}
                showButton={false}
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Claims;
