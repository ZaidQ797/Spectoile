/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  colors,
  HP,
  WP,
  appImages,
  appIcons,
  family,
  size,
} from '../../utilities';
import {getPriceImage, getRatingImage} from '../../utilities/constants';

const ServiceCard = ({
  item,
  navigation,
  onActionWishlist = () => {},
  showHeartIcon = true,
  index,
}) => {
  const [ratingImage, setRatingImage] = useState(appImages.start_0);
  const [priceImage, setPriceImage] = useState(appImages.price_0);

  const [loadingImage, setLoadingImage] = useState(true);

  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    try {
      setRatingImage(getRatingImage(parseInt(item?.avg_rating)));
      setPriceImage(getPriceImage(item?.avg_price_tag[0]));
    } catch (err) {}
  }, [item]);

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('ServiceDetail', {
          post_id: item?.ID,
        });
      }}
      style={styles.container}>
      <ImageBackground
        source={item?.thumb_url ? {uri: item?.thumb_url} : appImages.serviceBG}
        resizeMode={'cover'}
        onLoadEnd={() => setLoadingImage(false)}
        imageStyle={styles.imageStyle}
        style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.tagContainer}>
            <ScrollView contentContainerStyle={{flexDirection: 'row'}}>
              {item?.associated_cats
                ?.filter((elem) => elem.icon !== null)
                .map((item, index) => {
                  return (
                    <View key={index} style={styles.redView}>
                      <Image
                        resizeMode={'contain'}
                        style={styles.icon}
                        source={
                          item.icon === null
                            ? appIcons.categoryPlacholder
                            : {uri: item.icon}
                        }
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.heartContainer}>
            {showHeartIcon ? (
              <TouchableOpacity
                onPress={() =>
                  onActionWishlist(
                    item?.ID,
                    item?.in_wish_list ? 'remove' : 'add',
                  )
                }
                style={styles.whiteView}>
                <Image
                  resizeMode={'contain'}
                  style={styles.heartIcon}
                  source={
                    item?.in_wish_list
                      ? appIcons.heartFilled
                      : appIcons.heartIcon
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <Text style={styles.lableStyle}>{item?.post_title}</Text>
        <View style={{flexDirection: 'row'}}>
          {item.assocuated_locations?.map((elem, index) => (
            <Text
              key={index}
              style={[
                styles.locStyle,
                {marginHorizontal: index !== 0 ? WP('0.4') : 0},
              ]}>
              {elem?.name}
            </Text>
          ))}
        </View>

        <Text numberOfLines={2} style={styles.descStyle}>
          {item?.post_content?.replace(regex, '')}
        </Text>
        <View style={styles.bottomContainer}>
          <Image
            resizeMode={'contain'}
            source={ratingImage}
            style={styles.ratingIcon}
          />
          {/* <Rating
            imageSize={14}
            type={'custom'}
            ratingImage={appImages.ratingImage}
            ratingColor="transparent"
            tintColor={colors.p2}
            minValue={3}
            ratingCount={5}
            // tintColor={colors.p1}
          /> */}
          {/* <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad']}
            defaultRating={3}
            showRating={false}
            size={14}
            starStyle={{
              // tintColor: colors.p2,
              paddingVertical: 0,
              paddingTop: 0,
              backgroundColor: 'transparent',
              start: 0,
            }}
            selectedColor={colors.p2}
          /> */}
          <Image
            resizeMode={'contain'}
            source={priceImage}
            style={styles.priceIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('89%'),
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.94,
      },
      android: {
        elevation: 4,
      },
    }),
    marginHorizontal: WP('3'),
    borderRadius: 5,
    marginBottom: HP('2'),
  },
  image: {
    height: HP('25'),
    borderRadius: 5,
  },
  imageStyle: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    padding: WP('3'),
  },
  tagContainer: {
    flex: 0.7,
    flexDirection: 'row',
    width: WP('20'),
  },
  heartContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: WP('20'),
  },
  redView: {
    borderRadius: 5,
    backgroundColor: colors.p1,
    width: WP('10'),
    height: HP('5.5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: WP('2'),
  },
  whiteView: {
    borderRadius: 5,
    backgroundColor: colors.white,
    width: WP('10'),
    height: HP('5.5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: WP('2'),
  },
  icon: {
    width: WP('4'),
    height: HP('3'),
    tintColor: colors.white,
  },
  heartIcon: {
    width: WP('7'),
    height: HP('3'),
    tintColor: colors.p1,
  },
  body: {
    marginHorizontal: WP('5'),
    marginTop: WP('4'),
  },
  lableStyle: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.normal,
  },
  locStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.lightGrey,
    marginVertical: HP('1'),
  },
  descStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xsmall,
    width: '90%',
    marginTop: HP('0'),
  },
  bottomContainer: {
    marginVertical: WP('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingIcon: {
    width: WP('21'),
    height: WP('4'),
  },
  priceIcon: {
    width: WP('12'),
    height: WP('4'),
  },
});

export {ServiceCard};
