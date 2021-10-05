import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  appImages,
  colors,
  family,
  HP,
  size,
  WP,
  getRatingImage,
} from '../../utilities';
import {Rating, AirbnbRating} from 'react-native-elements';
import I18n from '../../translation';
import moment from 'moment';
import {Spacer} from '../Spacer/Spacer';

const ReviewCard = ({item, index}) => {
  const [profileImage, setProfileImage] = useState('');
  const [globeRating, setGlobeRating] = useState(appImages.start_0);
  const [personalRating, setPersonalRating] = useState(appImages.start_0);
  const [atomoshpirRating, setAtomoshpirRating] = useState(appImages.start_0);
  const [pricetagsRating, setPricetagsRating] = useState(appImages.start_0);

  useEffect(() => {
    try {
      setProfileImage(item.rating.aviator_image);
      setGlobeRating(getRatingImage(item?.rating?.global_rating));
      setAtomoshpirRating(getRatingImage(item?.rating?.atmosphere));
      setPersonalRating(getRatingImage(item?.rating?.personel));
      setPricetagsRating(getRatingImage(item?.rating?.price_tags));
    } catch (err) {}
  }, [item]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.container]}>
      <View style={styles.profileContainer}>
        <Image
          source={
            profileImage !== '' ? {uri: profileImage} : appImages.userImage
          }
          style={styles.profile}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{item?.comment_author}</Text>
        <Text style={styles.date}>
          {moment(item?.comment_date).format('LL')}
        </Text>
        <View style={styles.row}>
          <RatingWithLabel
            image={globeRating}
            startSize={WP('15')}
            lable={I18n.t('note_global')}
          />
          <RatingWithLabel
            image={personalRating}
            startSize={WP('15')}
            lable={I18n.t('personal')}
          />
        </View>
        <View style={styles.row}>
          <RatingWithLabel
            image={atomoshpirRating}
            startSize={WP('15')}
            lable={I18n.t('ambiance')}
          />
          <RatingWithLabel
            image={pricetagsRating}
            startSize={WP('15')}
            lable={I18n.t('tarifs')}
          />
        </View>
        <Text numberOfLines={3} style={[styles.comment]}>
          {item?.comment_content}
        </Text>
      </View>
    </View>
  );
};

export const RatingWithLabel = ({
  rating,
  lable,
  readonly = true,
  onValue,
  startSize,
  image = appImages.start_0,
}) => {
  useEffect(() => {}, [readonly]);
  return (
    <View style={styles.ratingWithLableContaiener}>
      <Text numberOfLines={1} style={styles.simpleText}>
        {lable}
      </Text>
      {readonly ? (
        <Image
          resizeMode={'contain'}
          source={image}
          style={[styles.ratingIcon, {width: startSize}]}
        />
      ) : (
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad']}
          defaultRating={0}
          showRating={false}
          size={16}
          onFinishRating={(value) => onValue(value)}
          starStyle={styles.starStyle}
          selectedColor={colors.p2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: HP('24'),
    //  width: '80%',
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: WP('5'),
    borderRadius: 2,
    borderColor: colors.border,
    //backgroundColor: 'red',
    flex: 1,
    // marginHorizontal: WP('4'),
  },
  profileContainer: {
    ///  flex: 0.3,
    borderRadius: 2,
    width: '20%',
  },
  infoContainer: {
    // flex: 0.7,
    // width: '100%',
    marginHorizontal: WP('7'),
  },
  profile: {
    width: WP('23'),
    height: HP('10'),
    borderRadius: 5,
  },
  username: {
    left: WP('4'),
    fontFamily: family.Montserrat_Medium,
    marginTop: WP('1.5'),
    fontSize: size.small,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    left: WP('4'),
    width: WP('50'),
  },
  ratingWithLableContaiener: {
    paddingVertical: WP('2'),
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxxtiny,
    textAlign: 'left',
    width: WP('20'),
  },
  ratingStyle: {
    marginVertical: WP('2'),
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  ratingIcon: {
    width: WP('24'),
    height: WP('5'),
    marginTop: WP('2'),
  },
  starStyle: {
    // tintColor: colors.p2,
    paddingVertical: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
    start: 0,
    marginTop: HP('1'),
  },
  date: {
    left: WP('4'),
    top: WP('0'),
    fontFamily: family.Montserrat_Regular,
    marginTop: WP('1.5'),
    fontSize: size.xtiny,
  },
  comment: {
    left: WP('4'),
    top: WP('0'),
    fontFamily: family.Montserrat_Regular,
    marginTop: WP('1.5'),
    fontSize: size.xxsmall,
    width: WP('50'),
    lineHeight: 18.3,
  },
});

export {ReviewCard};
