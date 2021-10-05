import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {colors, HP, WP, appImages, family, size} from '../../utilities';
import {hasNotch} from 'react-native-device-info';

const ListCard = ({item, navigation}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  const regex = /(<([^>]+)>)/gi;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ServiceDetail', {
          post_id: item?.ID,
        });
      }}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item?.thumb_url ? {uri: item?.thumb_url} : appImages.serviceBG
          }
          resizeMode={'cover'}
          onLoadEnd={() => setLoadingImage(false)}
          imageStyle={styles.imageStyle}
          style={styles.image}
        />
      </View>
      <View style={styles.descContainer}>
        <Text numberOfLines={2} style={styles.lableStyle}>
          {item?.post_title}
        </Text>
        <Text numberOfLines={3} style={styles.descStyle}>
          {item?.post_content}
        </Text>
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
    flexDirection: 'row',
    height: hasNotch() && Platform.OS !== 'android' ? HP('12') : HP('15'),
  },
  imageContainer: {
    flex: 0.3,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomStartRadius: 5,
  },
  descContainer: {flex: 0.7, marginHorizontal: 20, marginVertical: 5},
  image: {
    //height: HP('25'),
    borderRadius: 5,
    width: WP('27'),
    height: hasNotch() && Platform.OS !== 'android' ? HP('12') : HP('15'),
    alignSelf: 'flex-start',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomStartRadius: 5,
  },
  imageStyle: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomStartRadius: 5,
    width: '20%',
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
    backgroundColor: 'red',
  },
  lableStyle: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.xxsmall,
  },
  locStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.lightGrey,
    marginVertical: HP('1'),
  },
  descStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxtiny,
    width: '90%',
    marginVertical: HP('2'),
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

export {ListCard};
