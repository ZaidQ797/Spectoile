import React, {useState, useEffect, Fragment, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {IconHeader, FilterPopup, Loader} from '../../../../components';
import styles from './styles';
import MapView, {Marker} from 'react-native-maps';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {appIcons, colors} from '../../../../utilities';
import I18n from '../../../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterRequest,
  setGridView,
  contentScrollingRequest,
} from '../../../../redux/actions';

//Tabs
import ByDefault from './ByDefault';
import FitlerTab from './FitlerTab';
import SaveSearch from './SaveSearch';

const TabNavigator = createMaterialTopTabNavigator();

const SearchResult = ({navigation, route}) => {
  const _mapView = useRef();

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchCoord, setSearchCoord] = useState('');

  const dispatch = useDispatch();
  const {token, gridView} = useSelector((state) => state.login);
  const {
    searchObj,
    sortAlert,
    filterResults,
    activeTab,
    scrolling,
  } = useSelector((state) => state.filter);

  useEffect(() => {
    console.log('scrolling');
    animateToMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolling]);

  useEffect(() => {
    setSearchText(route?.params.search_text);
  }, [route?.params.search_text]);

  useEffect(() => {
    dispatch(contentScrollingRequest(false));
    searchObj.text = searchText;
    onFilterAPICall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    onFilterAPICall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchObj]);

  const onFilterAPICall = () => {
    //setLoading(true);
    setTimeout(() => {
      setLoading(true);
    }, 100);
    let data = new FormData();
    data.append('title', searchText);
    data.append('order_by', searchObj?.orderBy);
    data.append('page_id', 1);
    if (searchCoord !== '') {
      data.append('latitude', searchCoord?.latitude);
      data.append('longitude', searchCoord?.longitude);
    }
    const cbSuccess = (res) => {
      if (res?.length > 0) {
        console.log(res);
        setMarkers(
          res
            .map((item, index) => {
              if (
                item?.map_location?.latitude === '' &&
                item?.map_location?.longitude === ''
              ) {
                return {
                  coordinates: {
                    latitude: '',
                    longitude: '',
                  },
                  title: item?.post_title,
                  address: item?.map_location?.address,
                  ID: item?.ID,
                };
              }
              return {
                coordinates: {
                  latitude:
                    Platform.OS === 'android'
                      ? parseFloat(item?.map_location?.latitude)
                      : item?.map_location?.latitude,
                  longitude:
                    Platform.OS === 'android'
                      ? parseFloat(item?.map_location?.longitude)
                      : item?.map_location?.longitude,
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                },
                title: item?.post_title,
                address: item?.map_location?.address,
                ID: item?.ID,
              };
            })
            .filter(
              (elem) =>
                elem.coordinates.latitude !== '' &&
                elem.coordinates.longitude !== '',
            ),
        );
      } else {
        setMarkers([]);
      }
      setResponse(res);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(filterRequest(data, token, cbSuccess, cbFailure));
  };

  useEffect(() => {}, [gridView, filterResults, activeTab]);

  useEffect(() => {
    onFilterAPICall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortAlert]);

  useEffect(() => {
    console.log('markers', markers);
    animateToMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  const animateToMarker = () => {
    setTimeout(() => {
      //_mapView?.current.animateToCoordinate(region, 200);
      if (markers?.length > 0 || _mapView?.current) {
        const coords = markers?.map((element) => {
          return {
            latitude: element.coordinates.latitude,
            longitude: element.coordinates.longitude,
          };
        });
        _mapView?.current?.fitToCoordinates(coords, {
          edgePadding: {
            bottom: 200,
            right: 50,
            top: 150,
            left: 50,
          },
          animated: true,
        });
      }
    }, 300);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <IconHeader
          onLeftPress={() => navigation.toggleDrawer()}
          onSearchPress={() => navigation.navigate('Search')}
          onHeartPress={() => navigation.navigate('Favorites')}
        />
        {!scrolling && (
          <MapView
            ref={_mapView}
            style={styles.mapView}
            zoomControlEnabled
            zoomEnabled
            zoomTapEnabled
            enableZoomControl
            focusable
            annotations={markers}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {markers?.map((item, index) => {
              console.log('item marker', item);
              return (
                <Marker
                  key={index}
                  coordinate={item?.coordinates}
                  title={item?.title}
                  focusable
                  description={item?.address}>
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
              );
            })}
          </MapView>
        )}

        {/* Result Informatin View */}
        <View style={styles.resultInfoContainer}>
          <View style={styles.resultInfoContaier1}>
            <Text numberOfLines={1} style={styles.simpleText}>
              {response.length}
              {I18n.t('result_found')}
            </Text>
          </View>
          <View style={styles.resultInfoContaier2}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setGridView(false));
              }}>
              <Image
                style={[
                  styles.listIcon,
                  {tintColor: !gridView ? colors.p2 : colors.black},
                ]}
                source={appIcons.listIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.resultInfoContaier3}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setGridView(true));
              }}>
              <Image
                style={[
                  styles.icon,
                  {tintColor: gridView ? colors.p2 : colors.lightGrey},
                ]}
                source={appIcons.gridIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setShowPopup(true)}
            style={styles.resultInfoContaier4}>
            <Text numberOfLines={1} style={styles.simpleText}>
              {I18n.t('filtered')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <TabNavigator.Navigator
          tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor: '#36A7E7',
            indicatorStyle: {
              backgroundColor: colors.p1,
            },
          }}>
          <TabNavigator.Screen
            options={{
              tabBarLabel: ({label, focused}) => {
                return (
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color: focused ? colors.p1 : colors.black,
                      },
                    ]}>
                    {I18n.t('filtered')}
                  </Text>
                );
              },
            }}
            component={FitlerTab}
            name={'Filter'}
          />
          <TabNavigator.Screen
            options={{
              tabBarLabel: ({label, focused}) => {
                return (
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color: focused ? colors.p1 : colors.black,
                      },
                    ]}>
                    {I18n.t('save_search')}
                  </Text>
                );
              },
            }}
            component={SaveSearch}
            name={'SaveSearch'}
          />
          <TabNavigator.Screen
            options={{
              tabBarLabel: ({label, focused}) => {
                return (
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color: focused ? colors.p1 : colors.black,
                      },
                    ]}>
                    {I18n.t('by_default')}
                  </Text>
                );
              },
            }}
            component={ByDefault}
            name={'ByDefault'}
          />
        </TabNavigator.Navigator>
        {/* Filter Modal */}
        <FilterPopup
          isVisible={showPopup}
          onValues={(lookingFor, coordinate) => {
            setTimeout(() => {
              if (lookingFor !== '') {
                searchObj.text = lookingFor;
                setSearchText(lookingFor);
              }
              if (coordinate !== null) {
                searchObj.coordinate = coordinate;
                setSearchCoord(coordinate);
              }
            }, 100);
            setShowPopup(false);
          }}
          onCancel={() => setShowPopup(false)}
        />
      </SafeAreaView>
      <Loader loading={loading} />
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default SearchResult;
