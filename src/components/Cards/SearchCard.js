import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors, HP, WP, appImages, family, size} from '../../utilities';
import I18n from '../../translation';
import {ActivityIndicator} from 'react-native';
import {Fragment} from 'react';
import HTML from 'react-native-render-html';

const SearchCard = ({item, navigation, showButtons = false, onDelete}) => {
  const regex = /(<([^>]+)>)/gi;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!showButtons) {
          navigation.navigate('ServiceDetail', {
            post_id: item?.ID,
          });
        }
      }}
      disabled={showButtons}
      style={styles.container}>
      <ImageBackground
        source={item?.thumb_url ? {uri: item?.thumb_url} : appImages.serviceBG}
        resizeMode={'cover'}
        imageStyle={styles.imageStyle}
        style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.tagContainer} />
          <View style={styles.heartContainer} />
        </View>
      </ImageBackground>
      <View style={styles.body}>
        {/* <Text style={styles.lableStyle}>
          {item?.post_title?.replace(regex, '')}
        </Text> */}
        <HTML
          html={item?.post_title}
          // eslint-disable-next-line react-native/no-inline-styles
          baseFontStyle={{
            fontFamily: family.Montserrat_Bold,
            marginBottom: 0,
            marginTop: 0,
            paddingBottom: 0,
            paddingTop: 0,
            textAlign: 'left',
          }}
        />
        {showButtons ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ServiceDetail', {
                  post_id: item?.ID,
                });
              }}
              style={styles.button}>
              <Icon size={18} name={'preview'} type={'material'} />
              <Text style={styles.btnText}>{I18n.t('previewUpper')}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => alert('TODO')}
              style={styles.button}>
              <Icon size={15} name={'edit'} type={'feather'} />
              <Text style={styles.btnText}>{I18n.t('editUpper')}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => onDelete(item.ID)}
              style={styles.button}>
              <Icon size={18} name={'delete'} type={'antdesign'} />
              <Text style={styles.btnText}>{I18n.t('deleteUpper')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text numberOfLines={3} style={styles.descStyle}>
            {item?.post_content?.replace(regex, '')}
          </Text>
        )}
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
  button: {
    borderWidth: 1,
    padding: HP('1.5'),
    borderRadius: 5,
    borderColor: colors.border,
    backgroundColor: colors.bgLightColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: WP('0'),
    marginVertical: HP('2'),
  },
  btnText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxtiny,
    color: colors.black,
    left: WP('1'),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export {SearchCard};
