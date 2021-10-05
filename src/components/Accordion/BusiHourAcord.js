import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  Accordion,
  Spacer,
  DropDown,
  IconButton,
  PickTimePopup,
} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size, colors} from '../../utilities';
import {useSelector, useDispatch} from 'react-redux';
import {removeInWeektime} from '../../redux/actions';
import {Icon} from 'react-native-elements';
import {Table, Row} from 'react-native-table-component';

const BusiHourAcord = ({title, expanded, onToggle}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [heads, setHeads] = useState([
    I18n.t('day'),
    I18n.t('open_time'),
    I18n.t('close_time'),
    I18n.t('remove'),
  ]);

  const dispatch = useDispatch();
  const {weekTimes, addListData, addListObj} = useSelector(
    (state) => state.listings,
  );

  useEffect(() => {
    if (weekTimes?.length > 0) {
      let newArr = [];
      weekTimes?.map((item) => {
        newArr.push({
          day: item.weekday?.value,
          open_time: item?.openTime?.value,
          end_time: item?.endTime?.value,
          '24h_open': item?.is24hour?.value,
          closed: item?.closed?.value,
        });
      });
      addListObj['buisness_hours'] = newArr;
    } else {
      addListObj['buisness_hours'] = [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekTimes]);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <DropDown
        zIndex={10}
        data={addListData.timeZones}
        searchable
        label={I18n.t('datetime_zone')}
        getVal={(item) => {
          addListObj.time_zone_busuness_hours = item.value;
        }}
      />
      <Text style={styles.label}>{I18n.t('timezone_qoute')}</Text>
      <Spacer />
      {weekTimes?.length > 0 && (
        <Table style={{marginHorizontal: WP('5')}}>
          <Row
            data={heads}
            flexArr={[1, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
      )}
      {weekTimes?.map((item, index) => {
        return (
          <View key={index} style={styles.timeRowContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.day,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: WP('18'),
                  textAlign: 'center',
                  alignSelf: 'center',
                  right: WP('4'),
                },
              ]}>
              {item?.weekday?.label}
            </Text>
            <Text style={[styles.day, {right: WP('2'), width: WP('15')}]}>
              {item?.openTime?.label}
            </Text>
            <Text
              style={[
                styles.day,
                {marginHorizontal: WP('5'), right: WP('3'), width: WP('15')},
              ]}>
              {item?.endTime?.label}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(removeInWeektime(item.id))}>
              <Icon name={'delete'} type={'material'} color={colors.snackRed} />
            </TouchableOpacity>
          </View>
        );
      })}
      <Spacer />
      <IconButton
        backgroundColor={colors.p2}
        withIcon={false}
        title={I18n.t('add_new_item')}
        titleColor={colors.white}
        style={styles.selectHoursButton}
        onSubmit={() => setShowPopup(true)}
      />
      <Spacer />

      <View style={styles.body} />
      <PickTimePopup
        isVisible={showPopup}
        onCancel={() => setShowPopup(false)}
      />
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
    marginHorizontal: WP('5'),
    marginTop: WP('2'),
  },
  day: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    textAlign: 'center',
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
  selectHoursButton: {
    width: '90%',
    alignSelf: 'center',
  },
  timeRowContainer: {
    flexDirection: 'row',
    marginHorizontal: WP('10'),
    marginVertical: HP('0.5'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center', fontSize: size.xtiny, paddingVertical: WP('1')},
  // text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});

export {BusiHourAcord};
