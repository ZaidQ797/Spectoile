import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import I18n from '../../../../../translation';
import styles from './styles';
import {IconButton} from '../../../../../components';
import {
  saveSearchRequest,
  activeTabRequest,
} from '../../../../../redux/actions';
import {colors} from '../../../../../utilities';
import {useSelector, useDispatch} from 'react-redux';

const SaveSearch = ({params, navigation}) => {
  const [savedID, setSavedID] = useState('');

  const dispatch = useDispatch();
  const {searchObj} = useSelector((state) => state.filter);
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      dispatch(activeTabRequest('search'));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);

  const onSaveSearch = () => {
    let data = new FormData();
    data.append('order-by', searchObj.orderBy);
    data.append('custom-search', searchObj.text);
    data.append('category', searchObj.category);
    data.append('location', searchObj.location);
    data.append('tag', searchObj.tag);
    const cbSuccess = () => {
      alert('Recherche enregistrée avec succès');
    };
    const cbFailure = () => {};
    dispatch(saveSearchRequest(data, token, cbSuccess, cbFailure));
  };

  const arrangeData = () => {
    let newArr = [];
    let obj = {
      2: {
        name: 'Ashfaq',
        title: 'Software engineer',
      },
      5: {
        name: 'Ashfaq',
        title: 'Software engineer',
      },
      8: {
        name: 'Ashfaq',
        title: 'Software engineer',
      },
      0: {
        name: 'Ashfaq',
        title: 'Software engineer',
      },
    };
    Object.entries(obj).map((item) => {
      newArr.push({
        id: item[0],
        ...item[1],
      });
    });
    console.log(newArr);
  };

  return (
    <View style={styles.body}>
      <IconButton
        backgroundColor={colors.p1}
        title={I18n.t('save_search')}
        titleColor={colors.white}
        withIcon={false}
        onSubmit={onSaveSearch}
      />
      <Text style={styles.saveQouteStyle}>
        Sauvegardez cette recherche pour y accéder plus facilement. Vous pourrez
        la retrouver dans votre compte
      </Text>
      {savedID !== '' ? (
        <View>
          <Text style={styles.text}>{I18n.t('search_saved')}</Text>
          <TouchableOpacity>
            <Text style={styles.cancelText}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default SaveSearch;
