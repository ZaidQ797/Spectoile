import React, {useRef, useEffect, useState, Fragment} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GOOGLE_MAP_API_KEY, colors, HP, WP} from '../../../../utilities';
import styles from './styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import I18n from '../../../../translation';
import Geocoder from 'react-native-geocoding';

const AddAddress = ({navigation, route}) => {
  const _mapview = useRef();

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [error, setError] = useState('');
  const [autoAddress, setAutoAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMapReady, setisMapReady] = useState(false);
  const [paddingTop, setPaddingTop] = useState(1);
  const [marginBottom, setMarginBottom] = useState(1);
  const [userLocation, setUserLocation] = useState('');
  const [regionLoading, setRegionLoading] = useState(false);
  const [screenKey, setScreenKey] = useState(route?.params?.key);

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY); // use a valid API key
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Current Location',
            message:
              'Spectetoile needs to get your current location to search services near you',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Premission Granted');
          await getCurrentLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {}, [region]);

  const onMapReady = () => {
    setisMapReady(true);
    setMarginBottom(0);
    setPaddingTop(0);
  };

  // fetch location details as a JOSN from google map API
  const getAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        region?.latitude +
        ',' +
        region?.longitude +
        '&key=' +
        GOOGLE_MAP_API_KEY,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setUserLocation(responseJson.results[0].formatted_address);
        setRegionLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('current Location', position);
        const regionData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.007,
        };
        setRegion(regionData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  };

  // Update state on region change
  const onRegionChange = async (regionInfo) => {
    // console.log('[region]', regionInfo);
    setRegion(regionInfo);
    setRegionLoading(true);
    getAddress();
  };

  const goToInitialLocation = () => {
    if (isMapReady) {
      setTimeout(() => _mapview.component.animateToRegion(region), 200);
    }
  };

  const getLatLngFromAddress = ({description}) => {
    console.log('Description', description);
    Geocoder.from(description)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log('JSON', location);
        setRegion({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lng),
          // latitudeDelta: 0.0522,
          // longitudeDelta: 0.0321,
        });
        setTimeout(() => {
          _mapview.current.animateToRegion(region, 500);
        }, 300);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.topInputContainer}>
          <View style={styles.backButtonCotainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <Icon
                name={'arrow-left'}
                size={15}
                type={'simple-line-icon'}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.googleAutoInputOuterCotainer}>
            <GooglePlacesAutocomplete
              placeholder={I18n.t('complete_place')}
              value={autoAddress}
              textInputProps={{
                placeholderTextColor: colors.black,
              }}
              onPress={(data, details = null) => {
                getLatLngFromAddress(data);
                setAutoAddress(data?.description);
                console.log(data, details);
              }}
              query={{
                key: GOOGLE_MAP_API_KEY,
                language: 'en',
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  marginHorizontal: 5,
                  borderTopWidth: 0,
                  borderRadius: 25,
                  alignSelf: 'center',
                  color: '#000000',
                },
                textInput: {
                  color: colors.black,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 25,
                  top: 2,
                  ...Platform.select({
                    ios: {
                      shadowColor: colors.black,
                      shadowOffset: {width: 2, height: 1},
                      shadowOpacity: 0.2,
                    },
                    android: {
                      elevation: 1,
                    },
                  }),
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
          </View>
        </View>

        <View style={styles.body}>
          <MapView.Animated
            style={styles.mapView}
            ref={_mapview}
            showsUserLocation
            showsMyLocationButton
            zoomEnabled
            loadingEnabled
            zoomTapEnabled
            region={region}
            initialRegion={goToInitialLocation()}
            onRegionChangeComplete={onRegionChange}>
            <Marker.Animated
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              title={'Location'}
              draggable
            />
          </MapView.Animated>
        </View>
        <View style={styles.bottomContainer}>
          <Text numberOfLines={2} style={styles.address}>
            {!regionLoading ? userLocation : ''}
          </Text>
        </View>
        <TouchableOpacity onPress={getCurrentLocation} style={styles.locateme}>
          <MaterialIcons name="gps-fixed" size={20} />
          <Text style={styles.locateMeBtn}>Locate me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.confirm}>
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default AddAddress;
