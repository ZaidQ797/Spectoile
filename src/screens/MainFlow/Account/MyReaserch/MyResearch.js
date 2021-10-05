import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {TitleHeader, ResearchCard} from '../../../../components';
import I18n from '../../../../translation';
import {appIcons, colors, HP} from '../../../../utilities';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeSaveSearchRequest,
  userSavedSearchRequest,
} from '../../../../redux/actions';

const MyResearch = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {searchObj, userSavedSearches} = useSelector((state) => state.filter);

  useEffect(() => {
    onSaveSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveSearch = () => {
    setLoading(true);
    const cbSuccess = () => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(userSavedSearchRequest({}, token, cbSuccess, cbFailure));
  };

  const onRemoveSearch = (id) => {
    let data = new FormData();
    data.append('query_id', id);
    const cbSuccess = () => {
      onSaveSearch();
      alert('Recherche supprimée avec succès');
    };
    const cbFailure = () => {};
    dispatch(removeSaveSearchRequest(data, token, cbSuccess, cbFailure));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.pop()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <View style={styles.spacer} />
          <Text style={styles.qoute}>{I18n.t('my_research_qoute')}</Text>
          <View style={[styles.spacer, {marginTop: HP('2')}]} />
          {loading && (
            <Fragment>
              <View style={styles.spacer} />
              <ActivityIndicator />
            </Fragment>
          )}
          <FlatList
            data={userSavedSearches}
            extraData={userSavedSearches}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({item, index}) => (
              <ResearchCard key={index} item={item} onDelete={onRemoveSearch} />
            )}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default MyResearch;
