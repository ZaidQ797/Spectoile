import React, {useEffect, Fragment, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {
  IconHeader,
  ImageSwiper,
  ServiceInfoCard,
  RatingBar,
  ReviewCard,
  Input,
  RatingWithLabel,
  IconButton,
  Loader,
  GoogleCaptcha,
  Spacer,
} from '../../../../components';
import {appIcons, family} from '../../../../utilities';
import styles from './styles';
import I18n from '../../../../translation';
import {colors, WP} from '../../../../utilities';
import {useDispatch, useSelector} from 'react-redux';
import {
  getServiceDetail,
  addToWishlistRequest,
  removeFromWishlistRequest,
  addReviewRequest,
} from '../../../../redux/actions';
import HTML from 'react-native-render-html';
import {calTotalAvgRating} from '../../../../utilities/constants';
import {getDeviceName} from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import clip from 'text-clipper';

const ServiceDetail = ({navigation, route}) => {
  const [serviceDetail, setServiceDetail] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [titleOfAsses, setTitleOfAsses] = useState('');
  const [comment, setComment] = useState('');
  const [ratingZero, setRatingZero] = useState(0);
  const [ratingOne, setRatingOne] = useState(0);
  const [ratingTwo, setRatingTwo] = useState(0);
  const [ratingThree, setRatingThree] = useState(0);
  const [onAddRemoveWish, setOnAddRemoveWish] = useState(false);
  const [totalRatingObj, setTotalRatingObj] = useState(null);
  const [addingReview, setAddingReview] = useState(false);

  const [Desc, setDesc] = useState('');
  const [buttonName, setButtonName] = useState(I18n.t('readMore'));

  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.services);
  const {token, user} = useSelector((state) => state.login);

  //Rerender everytime when ServiceDetail Changes
  useEffect(() => {
    if (serviceDetail) {
      setDesc(
        clip(serviceDetail?.post_content, 200, {
          html: true,
        }),
      );
      setButtonName(I18n.t('readMore'));
    }
  }, [serviceDetail]);

  //Call detail api
  useEffect(() => {
    onServiceDetail(route?.params?.post_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.post_id]);

  const onServiceDetail = (postID) => {
    if (!postID) return;
    let data = new FormData();
    data.append('ID', postID);
    const cbSuccess = (response) => {
      setServiceDetail(response);
      if (response) {
        let ratingResponse = calTotalAvgRating(
          response?.rating?.global_rating_total,
          response?.rating?.atmosphere_total,
          response?.rating?.persone_total,
          response?.rating?.price_tags_total,
        );
        console.log(ratingResponse);
        setTotalRatingObj(ratingResponse);
      }

      if (onAddRemoveWish) {
        setOnAddRemoveWish(false);
      }
    };
    const cdFailure = () => {
      if (onAddRemoveWish) {
        setOnAddRemoveWish(false);
      }
    };
    dispatch(getServiceDetail(data, token, cbSuccess, cdFailure));
  };

  const renderTruncatedFooter = () => (
    <Text onPress={() => handleTextReady()} style={styles.readMoreBtnText}>
      {buttonName}
    </Text>
  );

  const handleTextReady = () => {
    try {
      if (serviceDetail?.post_content) {
        if (buttonName === I18n.t('readMore')) {
          setDesc(serviceDetail?.post_content);
          setButtonName(I18n.t('readLess'));
        } else {
          if (serviceDetail?.post_content) {
            setDesc(
              clip(serviceDetail?.post_content, 200, {
                html: true,
              }),
            );
            setButtonName(I18n.t('readMore'));
          }
        }
      }
    } catch (err) {}
  };

  const onCaptchaComplete = (res) => {
    if (res === 'Complete') {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const onAddReview = async () => {
    let deviceName = await getDeviceName();
    if (titleOfAsses === '' || comment === '') {
      // eslint-disable-next-line no-alert
      alert(I18n.t('enter_all_fields'));
      return;
    }
    if (!captchaVerified) {
      // eslint-disable-next-line no-alert
      alert(I18n.t('confirmIdentity'));
      return;
    }
    setAddingReview(true);
    let data = new FormData();
    data.append('edgtf_comment_title', titleOfAsses);
    data.append('post_id', serviceDetail?.ID);
    data.append('comment', comment);
    data.append('edgtf_global_rating', ratingZero);
    data.append('personel', ratingOne);
    data.append('atmosphere', ratingTwo);
    data.append('price-tags', ratingThree);
    data.append('comment_agent', deviceName);
    const cbSuccess = () => {
      Alert.alert(
        `Merci d’avoir posté un avis`,
        'Votre avis a été publié avec succès',
        [{text: 'Ok', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      setTitleOfAsses('');
      setComment('');
      setAddingReview(false);
      onServiceDetail(route?.params?.post_id);
    };
    const cbFailure = () => {
      setAddingReview(false);
    };
    dispatch(addReviewRequest(data, token, cbSuccess, cbFailure));
  };

  //adding or removin from wishlist
  const onActionWishlist = (ID, type) => {
    setOnAddRemoveWish(true);
    let data = new FormData();
    data.append('type', type); //add or remove
    data.append('itemID', ID);
    let cbSuccess = (response) => {
      onServiceDetail(route?.params?.post_id);
      console.log('Wishlist action api success @@@*******@@@@', response);
    };
    let cbFailure = (error) => {
      setOnAddRemoveWish(false);
      console.log('Wishlist action api error   @@@*******@@@@', error);
    };
    if (type === 'add') {
      dispatch(addToWishlistRequest(data, token, cbSuccess, cbFailure));
    } else {
      dispatch(removeFromWishlistRequest(data, token, cbSuccess, cbFailure));
    }
  };

  if (loading && !onAddRemoveWish) {
    return (
      <Fragment>
        <SafeAreaView style={[styles.main]}>
          <StatusBar backgroundColor={colors.white} />
          <IconHeader
            onLeftPress={() => navigation.toggleDrawer()}
            onSearchPress={() => navigation.navigate('Search')}
            onHeartPress={() => navigation.navigate('Favorites')}
          />
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={colors.p1} />
          </View>
        </SafeAreaView>
        <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <StatusBar backgroundColor={colors.white} />
        <IconHeader
          onLeftPress={() => navigation.toggleDrawer()}
          onSearchPress={() => navigation.navigate('Search')}
          onHeartPress={() => navigation.navigate('Favorites')}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewCotainer}>
          {serviceDetail && serviceDetail?.gallery[0] !== null ? (
            <ImageSwiper data={serviceDetail?.gallery} />
          ) : null}
          <ServiceInfoCard
            onActionWishlist={onActionWishlist}
            item={serviceDetail}
          />
          <View style={styles.body}>
            <Text style={[styles.summrizeText, {marginTop: WP('1')}]}>
              {I18n.t('about')}
            </Text>
            {Desc !== '' ? (
              <HTML
                html={Desc}
                baseFontStyle={{
                  fontFamily: family.Montserrat_Regular,
                }}
              />
            ) : null}

            {serviceDetail?.post_content !== 'undefined' &&
            serviceDetail?.post_content?.length > 200
              ? renderTruncatedFooter()
              : null}
            <Text style={styles.summrizeText}>{I18n.t('sumurize')}</Text>
            {serviceDetail?.amenities_include?.map((item, index) => (
              <FeatureRow index={index} lable={item.name} />
            ))}
            <View style={styles.ratingContainer}>
              <Text numberOfLines={2} style={styles.ratingNo}>
                {totalRatingObj?.totalRating}
              </Text>
              <Text numberOfLines={2} style={styles.simpleText}>
                {serviceDetail?.reviews?.length === 0
                  ? ''
                  : totalRatingObj?.keyword}
              </Text>
              <View style={styles.whiteContainer}>
                <Text numberOfLines={2} style={styles.simpleText}>
                  {serviceDetail?.reviews?.length} avis
                </Text>
              </View>
              <RatingRow
                label={I18n.t('note_global')}
                strength={serviceDetail?.rating?.global_rating_total}
              />
              <RatingRow
                label={I18n.t('personal')}
                strength={serviceDetail?.rating?.persone_total}
              />
              <RatingRow
                label={I18n.t('ambiance')}
                strength={serviceDetail?.rating?.atmosphere_total}
              />
              <RatingRow
                label={I18n.t('tarifs')}
                strength={serviceDetail?.rating?.price_tags_total}
              />
            </View>
            <Text numberOfLines={2} style={styles.blacklabel}>
              {I18n.t('evaulation')}
            </Text>
            {serviceDetail?.reviews?.length === 0 ? (
              <View style={styles.noReviewContainer}>
                <Text style={styles.simpleText}>Pas encore d'avis</Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={serviceDetail?.reviews}
                  horizontal
                  keyExtractor={(item, index) => item + index.toString()}
                  renderItem={({item, index}) => (
                    <ReviewCard item={item} index={index} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            <Text numberOfLines={2} style={styles.blacklabel}>
              {I18n.t('write_an_opinion')}
            </Text>
            <Text numberOfLines={2} style={[styles.loginText]}>
              {I18n.t('logged_in_as')}
              <Text style={styles.username}> {user?.user_display_name}</Text>
              {/* <TouchableOpacity
                style={[styles.logout, {top: HP('0.95')}]}
                onPress={() => alert('TODO Logout User')}>
                <Text style={[styles.logout, {top: HP('0.35')}]}>
                  {' '}
                  {I18n.t('logged_in_as_2')}
                </Text>
              </TouchableOpacity> */}
            </Text>
            <Spacer />
            <GoogleCaptcha
              onCaptchaComplete={onCaptchaComplete}
              cancelButtonText={'Annuler'}
            />
            {/* <Input onlyInput placeholder={I18n.t('enter_above_text')} /> */}
            <Spacer />
            <View style={styles.simpleRow}>
              <RatingWithLabel
                onValue={(value) => setRatingZero(value)}
                readonly={false}
                lable={I18n.t('note_global')}
              />
              <RatingWithLabel
                onValue={(value) => setRatingOne(value)}
                readonly={false}
                lable={I18n.t('personal')}
              />
            </View>
            <View style={styles.simpleRow}>
              <RatingWithLabel
                onValue={(value) => setRatingTwo(value)}
                readonly={false}
                lable={I18n.t('ambiance')}
              />
              <RatingWithLabel
                onValue={(value) => setRatingThree(value)}
                readonly={false}
                lable={I18n.t('tarifs')}
              />
            </View>
            <Input
              onlyInput
              value={titleOfAsses}
              onChangeText={(text) => setTitleOfAsses(text)}
              placeholder={I18n.t('title_of_assesment')}
            />
            <Input
              multiline
              onlyInput
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder={I18n.t('comment')}
            />
            <IconButton
              backgroundColor={colors.p1}
              icon={appIcons.sendIcon}
              title={I18n.t('send')}
              titleColor={colors.white}
              style={styles.sendButton}
              onSubmit={onAddReview}
              isLoading={addingReview}
            />
            <IconButton
              backgroundColor={colors.p2}
              icon={appIcons.locationPin}
              style={styles.contactButton}
              title={I18n.t('contact')}
              titleColor={colors.white}
              onSubmit={() =>
                navigation.navigate('Contact', {
                  contactInfo: serviceDetail?.map_location,
                  workingHours: serviceDetail?.working_hours,
                  listingTitle: serviceDetail?.post_title,
                })
              }
            />
            <IconButton />
          </View>
        </KeyboardAwareScrollView>
        <Loader loading={loading && !onAddRemoveWish} />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

const FeatureRow = ({index, icon, lable}) => (
  <View key={index} style={styles.featureContaier}>
    <Image
      resizeMode={'contain'}
      source={appIcons.checkedIcon}
      style={styles.checkIcon}
    />
    <Text numberOfLines={2} style={styles.featureText}>
      {lable}
    </Text>
  </View>
);

const RatingRow = ({strength, label}) => {
  useEffect(() => {}, [strength, label]);

  if (label === undefined || strength === undefined) return null;
  return (
    <View>
      <View style={styles.row}>
        <Text numberOfLines={2} style={styles.simpleText}>
          {label}
        </Text>
        <Text numberOfLines={2} style={styles.simpleText}>
          {strength}%
        </Text>
      </View>
      <RatingBar strength={strength} />
    </View>
  );
};

export default ServiceDetail;
