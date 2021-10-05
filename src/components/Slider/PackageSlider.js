import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Image, Platform, Alert} from 'react-native';
import {colors, family, HP, size, WP} from '../../utilities';
import {appIcons} from '../../utilities/assets';
import {IconButton} from '../../components';
import I18n from '../../translation';
import {Divider} from 'react-native-elements';
import {hasNotch} from 'react-native-device-info';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const PackageSlider = ({data, onBuyPack}) => {
  const swiperRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {}, [currentIndex]);

  const onSwipe = (index) => {
    switch (index) {
      case 0:
        setCurrentIndex(index);
        break;
      case 1:
        setCurrentIndex(index);
        break;
      case 2:
        setCurrentIndex(index);
        break;
      default:
        return;
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.slide1}>
        <View style={styles.h1Cotnainer}>
          <Text style={styles.h1}>{item?.post_title}</Text>
        </View>
        <View style={styles.whiteView}>
          <Text style={styles.h2}>{item?.localizedPrice}</Text>
          <Divider style={styles.divider} />
          <View style={styles.spacer} />
          {item?.package_additional?.map((elem, key) => (
            <ValueRow
              key={key}
              lable={elem.label}
              value={elem.value}
              available={elem.checked}
            />
          ))}
        </View>
        <IconButton
          title={I18n.t('buy_this_pack')}
          backgroundColor={colors.p1}
          icon={appIcons.buyPackIcon}
          iconColor={colors.white}
          titleColor={colors.white}
          style={styles.loginButton}
          loaderColor={colors.white}
          onSubmit={() => {
            onBuyPack(item?.ID, item);
          }}
        />
      </View>
    );
  };

  if (data === undefined || data === null) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <Carousel
        ref={swiperRef}
        data={data}
        renderItem={_renderItem}
        sliderWidth={300}
        containerCustomStyle={styles.wrapper}
        contentContainerCustomStyle={{
          height: WP('125'),
        }}
        itemWidth={300}
        sliderHeight={400}
        onSnapToItem={(index) => onSwipe(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={currentIndex}
        dotElement={<View style={styles.activeDot} />}
        inactiveDotElement={<View style={styles.dot} />}
        containerStyle={styles.paginationContainer}
        carouselRef={swiperRef}
        tappableDots={!!swiperRef}
      />
    </View>
  );
};

const ValueRow = ({lable, value, available}) => (
  <View style={styles.row}>
    <View style={styles.iconContainer}>
      <Image
        style={styles.valuerowIcon}
        source={available === 'yes' ? appIcons.tickIcon : appIcons.crossIcon}
      />
    </View>
    <View style={styles.featureContainer}>
      <Text style={styles.feature}>
        {lable} {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // marginHorizontal: WP('4'),
    borderRadius: 20,
    //  borderWidth: 1,
    borderColor: colors.border,
    // height: WP('140'),
    marginTop: WP('5'),
    backgroundColor: colors.bgLightColor,
    // alignSelf: 'center',
  },
  h1Cotnainer: {
    height: WP('17'),
    backgroundColor: colors.p2,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontFamily: family.Montserrat_Bold,
    color: colors.white,
    bottom: HP('1.5'),
    borderRadius: 20,
  },
  buttonContainer: {
    width: '80%',
    // position: 'relative',
    // zIndex: 999,
    // bottom: -20,
    backgroundColor: 'red',
    marginTop: 20,
  },
  loginButton: {
    zIndex: 9,
    position: 'absolute',
    width: '85%',
    marginTop: hasNotch() && Platform.OS !== 'android' ? HP('49') : HP('56'),
    alignSelf: 'center',
  },
  h2: {
    fontFamily: family.Montserrat_Bold,
    color: colors.black,
    marginTop: HP('4'),
    fontSize: size.h3,
  },
  featureContainer: {
    flex: 0.9,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  wrapper: {
    height: hasNotch() ? WP('125') : HP('65'),
    borderRadius: 20,
    alignSelf: 'center',
  },
  slide1: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 10,
  },
  whiteView: {
    borderRadius: 20,
    bottom: HP('3'),
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 5,
  },
  label: {
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: family.Montserrat_Bold,
    textAlign: 'center',
    bottom: HP('2'),
  },
  feature: {
    color: colors.black,
    fontFamily: family.Montserrat_Regular,
    textAlign: 'left',
    marginLeft: WP('3'),
    fontSize: size.tiny,
  },
  subtitle: {
    color: colors.black,
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
    fontSize: size.xsmall,
    paddingHorizontal: WP('4'),
  },
  arrow: {
    width: WP('25'),
    height: HP('25'),
    right: WP('3.3'),
    bottom: HP('3.5'),
    position: 'absolute',
    zIndex: 100,
    top: WP('-6.5'),
    left: WP('-3.1'),
  },
  icon: {
    width: WP('25'),
    height: HP('30'),
  },
  step: {
    color: colors.white,
    fontWeight: '500',
    fontFamily: family.Montserrat_Bold,
    textAlign: 'left',
    position: 'absolute',
  },
  stepValue: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: family.Montserrat_Bold,
    textAlign: 'center',
    paddingTop: WP('5'),
    paddingLeft: WP('1'),
    position: 'absolute',
    fontSize: size.h5,
  },
  stepContainer: {
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: 1000,
    left: WP('7'),
    top: HP('10.3'),
  },
  dot: {
    backgroundColor: colors.white,
    width: hasNotch() ? WP('4.3') : Platform.isPad ? WP('3.3') : WP('4.3'),
    height: hasNotch() ? HP('2') : HP('2.5'),
    borderRadius: Platform.isPad ? 50 : 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 3,
    borderColor: colors.border,
    top: Platform.isPad ? WP('1') : WP('4'),
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: colors.white,
    width: hasNotch() ? WP('4.3') : Platform.isPad ? WP('3.3') : WP('4.3'),
    height: hasNotch() ? HP('2') : HP('2.5'),
    borderRadius: Platform.isPad ? 50 : 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 3,
    borderColor: colors.p1,
    top: Platform.isPad ? WP('1') : WP('4'),
  },
  divider: {
    width: '100%',
    marginTop: HP('3'),
  },
  spacer: {
    marginTop: WP('8'),
  },
  row: {
    flexDirection: 'row',
    marginVertical: WP('1.5'),
    marginHorizontal: WP('4'),
  },
  valuerowIcon: {
    alignSelf: 'center',
  },
  paginationContainer: {
    width: 50,
    alignSelf: 'center',
    bottom: HP('3'),
  },
});

export {PackageSlider};
