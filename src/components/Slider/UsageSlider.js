import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {colors, family, HP, size, WP} from '../../utilities';
import {appSliders} from '../../utilities/assets';
import I18n from '../../translation';
import {hasNotch} from 'react-native-device-info';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const UsageSlider = ({data}) => {
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
        <Image resizeMode={'contain'} source={item.icon} style={styles.icon} />
        <Text style={styles.label}>{item.label}</Text>
        <Text numberOfLines={5} style={styles.subtitle}>
          {item.subtitle}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'contain'}
        source={appSliders.sliderArrow}
        style={styles.arrow}>
        <View style={styles.stepContainer}>
          <Text style={styles.step}>{I18n.t('step')}</Text>
          <Text style={styles.stepValue}>
            {currentIndex === 0 ? '01' : currentIndex === 1 ? '02' : '03'}
          </Text>
        </View>
      </ImageBackground>
      <Carousel
        ref={swiperRef}
        data={data}
        renderItem={_renderItem}
        sliderWidth={300}
        containerCustomStyle={styles.wrapper}
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
      {/* <Swiper
        dot={<View style={styles.dot} />}
        ref={swiperRef}
        automaticallyAdjustContentInsets
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => {
          setCurrentIndex(index);
          console.log(index);
        }}
        style={styles.wrapper}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.slide1}>
              <Image
                resizeMode={'contain'}
                source={item.icon}
                style={styles.icon}
              />
              <Text style={styles.label}>{item.label}</Text>
              <Text numberOfLines={4} style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>
          );
        })}
      </Swiper> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WP('8'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: WP('5'),
    alignItems: 'center',
  },
  wrapper: {
    height: HP('45'),
    //  marginHorizontal: WP('7'),
    // backgroundColor: 'red',
  },
  paginationContainer: {
    width: 50,
  },
  slide1: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    bottom: hasNotch() ? HP('3') : HP('1.2'),
    justifyContent: 'center',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 5,
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
  subtitle: {
    color: colors.black,
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
    fontSize: size.xsmall,
    paddingHorizontal: WP('4'),
    alignSelf: 'center',
  },
  arrow: {
    width: WP('25'),
    height: HP('25'),
    right: WP('3.3'),
    bottom: HP('3.5'),
    position: 'absolute',
    zIndex: 9,
    top: Platform.isPad ? WP('-1.5') : hasNotch() ? WP('-11.5') : WP('-6.5'),
    left: WP('-3.1'),
  },
  icon: {
    width: WP('30'),
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
    //marginHorizontal: -1,
    borderWidth: 3,
    borderColor: colors.p1,
    top: Platform.isPad ? WP('1') : WP('4'),
  },
});

export {UsageSlider};
