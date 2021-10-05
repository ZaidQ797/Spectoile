import React, {useState, Fragment, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import {
  TitleHeader,
  GenInfoAccord,
  Spacer,
  GallerySecAcord,
  CategoryAcord,
  AmentiesAcord,
  TagsAcord,
  LocationAcord,
  ContactAcord,
  SocialAcord,
  OpenTableAcord,
  ReviewAcord,
  BusiHourAcord,
  IconButton,
  Loader,
  AdditionalAcord,
} from '../../../../components';
import I18n from '../../../../translation';
import {appIcons, colors, family} from '../../../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAddListingDataRequest,
  addListingRequest,
  clearAddListingFormRequest,
  clearWeektimeRequest,
  clearAdditionalRequest,
  validatePackageRequest,
} from '../../../../redux/actions';
import Snackbar from 'react-native-snackbar';
import AwesomeAlert from 'react-native-awesome-alerts';

const AddListing = ({navigation, route}) => {
  //Accordions
  const [genAccordion, setGeneralAccordion] = useState(true);
  const [galleryAccordion, setGalleryAccordion] = useState(false);
  const [categoryAccordion, setCategoryAccordion] = useState(false);
  const [tagsAccordion, setTagsAccordion] = useState(false);
  const [amentiesAccordion, setAmentiesAccordion] = useState(false);
  const [locationAccordion, setLocationAccordion] = useState(false);
  const [contactAcordion, setContactAccordion] = useState(false);
  const [socialAccord, setSocialAccord] = useState(false);
  const [openTableAcord, setOpenTableAcord] = useState(false);
  const [reviewAcord, setReviewAcord] = useState(false);
  const [busiHourAcord, setBusiHourAcords] = useState(false);
  const [additionAcord, setAdditionAcord] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [validPackAlert, setValidPackAlert] = useState(false);
  const [validPackAlertMsg, setValidPackAlertMsg] = useState('');

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {addListObj, addListData} = useSelector((state) => state.listings);

  useEffect(() => {
    getInitData();
    onValidPack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInitData]);

  useEffect(() => {}, [addListObj, addListData]);

  const getInitData = useCallback(() => {
    setTimeout(() => {
      setLoading(true);
    }, 300);
    const cbSuccess = () => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getAddListingDataRequest({}, token, cbSuccess, cbFailure));
  }, [dispatch, token]);

  const onAddListing = async () => {
    if (!validateForm()) {
      return;
    }
    setLoadingText(I18n.t('add_listing_loading_message'));
    let data = await makeFormData();
    console.log('data', data);
    setLoading(true);
    const cbSuccess = () => {
      setLoading(false);
      Snackbar.show({
        text: I18n.t('add_listing_success_message'),
        backgroundColor: colors.snackGreen,
        duration: Snackbar.LENGTH_SHORT,
      });
      dispatch(clearAddListingFormRequest());
      navigation.pop();
    };
    const cbFailure = (err) => {
      setLoading(false);
      Snackbar.show({
        text: err || I18n.t('no_internet_conn'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    };
    dispatch(addListingRequest(data, token, cbSuccess, cbFailure));
  };

  const makeFormData = async () => {
    let data = new FormData();
    data.append('edgtf_form_name', 'add_listing_form');
    data.append('is_listing_featured', addListObj.is_listing_featured);
    data.append('listing_id', addListObj.listing_id);
    data.append('title', addListObj.title);
    data.append('description', addListObj.description);
    data.append('excerpt', addListObj.excerpt);
    data.append('price_range', addListObj.price_range);
    data.append('title_logo_image', addListObj.title_logo_image);
    addListObj.featured_images.forEach((item, i) => {
      data.append('featured_images[]', {
        uri: item.uri,
        type: item.type,
        name: item.name,
        size: item.size,
      });
    });
    addListObj.gallery_images.forEach((item, i) => {
      data.append('gallery_images[]', {
        uri: item.uri,
        type: item.type,
        name: item.name,
        size: item.size,
      });
    });
    addListObj.categories?.forEach((item) => {
      data.append('categories[]', item);
    });
    addListObj.tags?.forEach((item) => {
      data.append('tags[]', item);
    });
    data.append('new_tag', addListObj.new_tag);
    data.append('city', addListObj.city);
    data.append('new_city', addListObj.new_city);
    data.append('full_address', addListObj.full_address);
    data.append('latitude', addListObj.latitude);
    data.append('longitude', addListObj.longitude);
    data.append('phone', addListObj.phone);
    data.append('email', addListObj.email);
    data.append('site_url', addListObj.site_url);
    data.append('facebook', addListObj.facebook);
    data.append('twiiter', addListObj.twiiter);
    data.append('instagram', addListObj.instagram);
    data.append('tripadvisor', addListObj.tripadvisor);
    data.append('youtube', addListObj.youTube);
    data.append('google_plus', addListObj.google_plus);
    data.append('pinterest', addListObj.pinterest);
    data.append('yelp', addListObj.yelp);
    addListObj.included_amenities?.forEach((item) => {
      data.append('included_amenities[]', item);
    });
    addListObj.excluded_amenities?.forEach((item) => {
      data.append('excluded_amenities[]', item);
    });
    data.append('open_table_id', addListObj.open_table_id);
    data.append('show_review', addListObj.show_review);
    data.append('enable_advanced_reviews', addListObj.enable_advanced_reviews);
    addListObj.buisness_hours?.forEach((item) => {
      data.append('time_zone_business_hours[]', JSON.stringify(item));
    });
    data.append('time_zone', '');
    addListObj.additional_info?.forEach((item) => {
      data.append('additional_info[]', JSON.stringify(item));
    });
    return data;
  };

  const validateForm = () => {
    if (
      addListObj?.listing_id === '' ||
      addListObj?.title === '' ||
      addListObj?.description === '' ||
      addListObj?.excerpt === ''
    ) {
      showAlert();
      return false;
    }
    return true;
  };

  const showAlert = () =>
    Alert.alert(
      'Alerte',
      'Veuillez remplir les champs obligatoires dans la section "Informations générales"',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );

  const clearForm = () => {
    dispatch(clearAddListingFormRequest());
    dispatch(clearWeektimeRequest());
    dispatch(clearAdditionalRequest());
    addListData.categories = addListData.categories.map((item) => {
      return {
        ...item,
        selected: false,
      };
    });
  };

  const onValidPack = () => {
    const cbSuccess = (res) => {
      console.log(res);
      if (res?.status === 'fail') {
        setTimeout(() => {
          setValidPackAlertMsg(res.message);
          setValidPackAlert(true);
        }, 1000);
      }
    };
    const cbFailure = () => {};
    dispatch(validatePackageRequest({}, token, cbSuccess, cbFailure));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.pop()}
          title={route?.params?.item?.label}
          right={
            <TouchableOpacity
              onPress={() => {
                clearForm();
              }}>
              <Text style={styles.clearFormText}>{I18n.t('clear')}</Text>
            </TouchableOpacity>
          }
          withRight
        />
        <View style={styles.body}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={styles.scrollView}>
            <View style={styles.spacer} />
            <GenInfoAccord
              expanded={genAccordion}
              title={I18n.t('general_info')}
              onToggle={() => setGeneralAccordion(!genAccordion)}
              isDone
            />
            <Spacer />
            <GallerySecAcord
              expanded={galleryAccordion}
              title={I18n.t('gallery_section')}
              onToggle={() => setGalleryAccordion(!galleryAccordion)}
              isDone
            />
            <Spacer />
            <CategoryAcord
              expanded={categoryAccordion}
              title={I18n.t('category')}
              onToggle={() => setCategoryAccordion(!categoryAccordion)}
              isDone
            />
            <Spacer />
            <TagsAcord
              expanded={tagsAccordion}
              title={I18n.t('tag_section')}
              onToggle={() => setTagsAccordion(!tagsAccordion)}
              isDone
            />
            <Spacer />
            <LocationAcord
              expanded={locationAccordion}
              title={I18n.t('location')}
              onToggle={() => setLocationAccordion(!locationAccordion)}
            />
            <Spacer />
            <ContactAcord
              expanded={contactAcordion}
              title={I18n.t('contact_information')}
              onToggle={() => setContactAccordion(!contactAcordion)}
            />
            <Spacer />
            <SocialAcord
              expanded={socialAccord}
              title={I18n.t('social_networks')}
              onToggle={() => setSocialAccord(!socialAccord)}
            />
            <Spacer />
            <AmentiesAcord
              expanded={amentiesAccordion}
              title={I18n.t('amenties_section')}
              onToggle={() => setAmentiesAccordion(!amentiesAccordion)}
            />
            <Spacer />
            <OpenTableAcord
              expanded={openTableAcord}
              title={I18n.t('open_table_resersation')}
              onToggle={() => setOpenTableAcord(!openTableAcord)}
            />
            <Spacer />
            <ReviewAcord
              expanded={reviewAcord}
              title={I18n.t('reviews_management')}
              onToggle={() => setReviewAcord(!reviewAcord)}
            />
            <Spacer />
            <BusiHourAcord
              expanded={busiHourAcord}
              title={I18n.t('setting_open_hours')}
              onToggle={() => setBusiHourAcords(!busiHourAcord)}
            />
            <Spacer />
            <AdditionalAcord
              expanded={additionAcord}
              title={I18n.t('additional_info_section')}
              onToggle={() => setAdditionAcord(!additionAcord)}
            />
            <Spacer />
            <Spacer />
            <IconButton
              title={I18n.t('add_listing')}
              backgroundColor={colors.p1}
              icon={appIcons.plusCircleIcon}
              iconColor={colors.white}
              style={styles.loginButton}
              titleColor={colors.white}
              onSubmit={() => {
                onAddListing();
                // navigation.pop();
                // navigation.navigate('App');
              }}
            />
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      {loadingText !== '' ? (
        <Loader loading={loading} tagline={loadingText} showTagLine />
      ) : (
        <Loader loading={loading} />
      )}
      <AwesomeAlert
        show={validPackAlert}
        showProgress={false}
        title="Alerte"
        message={validPackAlertMsg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Annuler"
        confirmText="Pack d'achat"
        messageStyle={{fontFamily: family.Montserrat_Regular}}
        titleStyle={{fontFamily: family.Montserrat_Bold}}
        confirmButtonTextStyle={{fontFamily: family.Montserrat_Bold}}
        confirmButtonColor={colors.p1}
        onCancelPressed={() => {
          setValidPackAlert(false);
        }}
        onConfirmPressed={() => {
          setValidPackAlert(false);
          setTimeout(() => {
            navigation.pop();
            navigation.navigate('AddListingFlow', {
              screen: 'Packages',
            });
          }, 300);
        }}
      />
    </Fragment>
  );
};

export default AddListing;
