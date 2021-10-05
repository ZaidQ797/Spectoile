import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {IconHeader, ContactCard} from '../../../../../components';
import I18n from '../../../../../translation';
import {appIcons} from '../../../../../utilities';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
import Moment from 'moment';

const Contact = ({navigation, route}) => {
  const _mapView = useRef();

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isData, setIsData] = useState(false);

  useEffect(() => {
    if (
      route?.params?.contactInfo?.latitude !== '' &&
      route?.params?.contactInfo?.longitude !== ''
    ) {
      setIsData(true);
      setRegion({
        latitude: parseFloat(route?.params?.contactInfo?.latitude),
        longitude: parseFloat(route?.params?.contactInfo?.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [
    route?.params?.contactInfo,
    route?.params?.workingHours,
    route?.params?.listingTitle,
  ]);

  useEffect(() => {
    animateToLocation();
  }, [region, animateToLocation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateToLocation = () => {
    _mapView?.current.animateToRegion(region, 1000);
  };

  return (
    <SafeAreaView style={styles.main}>
      <IconHeader
        onLeftPress={() => navigation.toggleDrawer()}
        onSearchPress={() => navigation.navigate('Search')}
        onHeartPress={() => navigation.navigate('Favorites')}
      />
      <ScrollView>
        <MapView
          ref={_mapView}
          style={styles.mapView}
          zoomControlEnabled
          zoomEnabled
          region={region}
          initialRegion={region}>
          {isData ? (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title={route?.params?.listingTitle}
              description={route?.params?.contactInfo?.address}>
              <ImageBackground
                resizeMode={'contain'}
                source={appIcons.markerIcon}
                style={styles.markerContainer}>
                <View style={styles.markerInnerContainer}>
                  <Image
                    resizeMode={'cover'}
                    source={appIcons.workshopCategory}
                    style={styles.marker}
                  />
                </View>
              </ImageBackground>
            </Marker>
          ) : null}
        </MapView>
        <ContactCard contactInfo={route?.params?.contactInfo} />
        <View style={styles.body}>
          {route?.params?.workingHours !== '' ? (
            <Fragment>
              <Text style={styles.title}>{I18n.t('hours')}</Text>
              <View style={styles.spacer} />
              {route?.params?.workingHours?.map((item, index) => (
                <TimeRow
                  key={index}
                  day={item.day}
                  time={item.open_time + ' - ' + item.end_time}
                />
              ))}
              <View style={styles.spacer} />
              <Text style={styles.localTime}>
                {I18n.t('local_time')} {Moment(new Date()).format('HH:mm')}
              </Text>
              <View style={styles.spacer} />
            </Fragment>
          ) : null}
          {/* <IconButton
            backgroundColor={colors.p1}
            icon={appIcons.locationPin}
            title={I18n.t('contact_establishment')}
            style={styles.contactButton}
            titleColor={colors.white}
            onSubmit={() => navigation.navigate('Contact')}
          /> */}
          <View style={styles.spacer} />
          <View style={styles.spacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TimeRow = ({key, day, time}) => (
  <View key={key} style={styles.timeRowContainer}>
    <View style={styles.dayContainer}>
      <Text style={styles.simpleText}>{day}</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.simpleText}>{time}</Text>
    </View>
  </View>
);

export default Contact;
