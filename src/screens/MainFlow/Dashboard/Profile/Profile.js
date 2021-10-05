import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {TitleHeader, ProfileView, Loader} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileRequest} from '../../../../redux/actions';

const Profile = ({navigation, route}) => {
  const [loading, setLaoding] = useState(false);
  const [profileRes, setProfileRes] = useState(null);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {profile} = useSelector((state) => state.profile);

  useEffect(() => {
    onGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetProfile = () => {
    setLaoding(true);
    const cbSuccess = (res) => {
      setLaoding(false);
      setProfileRes(res);
    };
    const cbFailure = (_err) => {
      setLaoding(false);
    };
    dispatch(getProfileRequest({}, token, cbSuccess, cbFailure));
  };

  useEffect(() => {}, [profileRes]);

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.goBack()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <Text style={styles.profileQoute}>{I18n.t('proifle_qoute')}</Text>
          <ProfileView data={profileRes} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      <Loader loading={loading} />
    </Fragment>
  );
};

export default Profile;
