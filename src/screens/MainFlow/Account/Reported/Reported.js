import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from './styles';
import {
  TitleHeader,
  AddPaymentCard,
  ReportedCard,
} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {getReportedRequest} from '../../../../redux/actions';

const Reported = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {reported} = useSelector((state) => state.listings);

  useEffect(() => {
    onGetReported();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetReported = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getReportedRequest({}, token, cbSuccess, cbFailure));
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
            ) : reported?.length > 0 ? (
              <FlatList
                data={reported}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                renderItem={({item, index}) => (
                  <ReportedCard item={item} index={index} />
                )}
              />
            ) : (
              <AddPaymentCard
                title={I18n.t('no_report_qoute')}
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

export default Reported;
