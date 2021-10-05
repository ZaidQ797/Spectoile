import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import {Accordion, Spacer, DropDown, Input} from '../../components';
import I18n from '../../translation';
import {
  WP,
  HP,
  family,
  size,
  colors,
  GOOGLE_MAP_API_KEY,
  appIcons,
} from '../../utilities';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const LocationAcord = ({title, expanded, onToggle}) => {
  const [address, setAddress] = useState('');
  const [autoAddress, setAutoAddress] = useState('');
  const [loadidngResults, setLoadingResults] = useState(false);
  const [showAutoPlaceView, setShowAutoPlaceView] = useState(false);

  const [newCity, setNewCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [coords, setCoords] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [showingResults, setShowingResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [region, setRegion] = useState(null);

  const {addListData, addListObj} = useSelector((state) => state.listings);

  const addCityRef = useRef();
  const fullAddRef = useRef();
  const _mapView = useRef();

  useEffect(() => {}, [addListData]);

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY);
    setNewCity(addListObj.new_city);
    if (addListObj.full_address !== '') {
      setSelectedAddress({
        description: addListObj.full_address,
      });
      setLatitude(addListObj.latitude);
      setLongitude(addListObj.longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse');
    }
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
        setCoords(regionData);
        getAddress(regionData);
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  };

  // fetch location details as a JOSN from google map API
  const getAddress = (regionData) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        regionData?.latitude +
        ',' +
        regionData?.longitude +
        '&key=' +
        GOOGLE_MAP_API_KEY,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Response JSON', responseJson.results[0].formatted_address);
        //  setUserLocation(responseJson.results[0].formatted_address);
        ///  setAutoAddress(responseJson.results[0].formatted_address);
        setShowAutoPlaceView(false);
        setAutoAddress('');
        setSelectedAddress({
          description: responseJson.results[0].formatted_address,
        });
        addListObj.full_address = responseJson.results[0].formatted_address;
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(err));
        console.log(err);
      });
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
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        });
        getAddress({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lng),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321,
        });
      })
      .catch((error) => console.log(error));
  };

  const onChangeAddress = async () => {
    setLoadingResults(true);
    setShowAutoPlaceView(true);
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_API_KEY}&input=${autoAddress}`,
      })
      .then((response) => {
        console.log(response.data);
        setShowingResults(response.data.predictions);
        setLoadingResults(false);
      })
      .catch((e) => {
        setLoadingResults(false);
        console.log(e.response);
      });
  };

  useEffect(() => {
    if (autoAddress === '') {
      setShowAutoPlaceView(false);
    } else {
      onChangeAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAddress]);

  useEffect(() => {
    setTimeout(() => {
      if (region) {
        addListObj.latitude = region.latitude.toString();
        addListObj.longitude = region.longitude.toString();
        setLatitude(region.latitude.toString());
        setLongitude(region.longitude.toString());
        _mapView?.current.animateToCoordinate(region, 200);
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  const animateAlreadyMaped = (region) => {
    setTimeout(() => {
      if (region) {
        setLatitude(region.latitude.toString());
        setLongitude(region.longitude.toString());
        _mapView?.current.animateToCoordinate(region, 200);
      }
    }, 1000);
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <DropDown
        searchable
        data={addListData.cities}
        label={I18n.t('city')}
        getVal={(item) => {
          console.log('Selected city', item.value);
          addListObj.city = item.value;
        }}
      />
      <View style={styles.body}>
        <Spacer />
        <Input
          placeholder={I18n.t('add_another_city')}
          reference={addCityRef}
          onSubmitEditing={() => fullAddRef.current.focus()}
          returnKeyType={'next'}
          value={newCity}
          onChangeText={(text) => {
            setNewCity(text);
            addListObj.new_city = text;
          }}
        />
        <Text style={styles.missingQoute}>{I18n.t('missing_your_city')}</Text>
        <Input
          placeholder={I18n.t('add_address')}
          value={autoAddress}
          onChangeText={(txt) => {
            setAutoAddress(txt);
          }}
          rightIcon={
            <TouchableOpacity onPress={() => getCurrentLocation()}>
              <Image source={appIcons.currentLocIcon} />
            </TouchableOpacity>
          }
          onlyInputWithRight
        />
        {selectedAddress && !showAutoPlaceView && (
          <View>
            <Text numberOfLines={5} style={styles.selectedAddress}>
              {I18n.t('selectedAddress')}:
            </Text>
            <Text numberOfLines={2} style={styles.address}>
              {selectedAddress?.description}
            </Text>
          </View>
        )}

        {showAutoPlaceView ? (
          <View
            style={{
              backgroundColor: colors.white,
              height: HP('20'),
              bottom: HP('1.8'),
            }}>
            {loadidngResults ? (
              <ActivityIndicator color={colors.p2} style={styles.indicator} />
            ) : (
              <FlatList
                data={showingResults}
                keyExtractor={(item, index) => item + index.toString()}
                contentContainerStyle={styles.flatlistContainer}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAddress(item);
                      setShowAutoPlaceView(false);
                      getLatLngFromAddress(item);
                    }}
                    key={index}>
                    <Text numberOfLines={2} style={styles.autoCompText}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        ) : null}
        <View style={styles.spacer} />
        <Spacer />
        <MapView
          //  provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          zoomControlEnabled
          zoomEnabled
          ref={_mapView}>
          <Marker
            coordinate={region}
            title={selectedAddress?.description}
            focusable>
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
        </MapView>
        <Input
          placeholder={'Latitude'}
          //reference={addCityRef}
          value={latitude}
          editable={false}
          onChangeText={(text) => {
            setLatitude(text);
          }}
          //  onSubmitEditing={() => fullAddRef.current.focus()}
          returnKeyType={'default'}
        />
        <Input
          placeholder={'Longitude'}
          // reference={addCityRef}
          // onSubmitEditing={() => fullAddRef.current.focus()}
          returnKeyType={'default'}
          value={longitude}
          editable={false}
          onChangeText={(text) => {
            setLongitude(text);
          }}
        />
        <Spacer />
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: WP('5.5'),
  },
  image: {
    width: WP('34'),
    height: HP('15'),
    marginRight: WP('5'),
    marginBottom: WP('5'),
    borderRadius: 5,
  },
  itemCotnainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: WP('1'),
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    left: 2,
    fontSize: size.tiny,
    width: WP('30'),
  },
  missingQoute: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    marginHorizontal: WP('2'),
  },
  mapView: {
    flex: 1,
    height: HP('40'),
    borderRadius: 5,
  },
  selectedAddress: {
    marginHorizontal: 0,
    fontSize: size.tiny,
    fontFamily: family.Montserrat_Regular,
  },
  autoCompText: {
    marginHorizontal: 10,
    marginBottom: 8,
    fontSize: size.small,
  },
  flatlistContainer: {
    paddingTop: 10,
  },
  indicator: {
    alignSelf: 'center',
    top: 10,
  },
  address: {
    fontFamily: family.Montserrat_Bold,
    paddingTop: 8,
  },
  marker: {
    width: WP('3'),
    height: WP('4'),
  },
  markerContainer: {
    width: WP('17'),
    height: WP('14'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInnerContainer: {
    backgroundColor: colors.white,
    bottom: HP('1'),
    width: WP('8'),
    height: WP('8'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export {LocationAcord};
