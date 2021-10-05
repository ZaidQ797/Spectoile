import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  Accordion,
  Spacer,
  IconButton,
  PickAdditionalPopup,
} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size, colors} from '../../utilities';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromAdditional} from '../../redux/actions';
import {Icon} from 'react-native-elements';
import {Table, Row} from 'react-native-table-component';

const AdditionalAcord = ({title, expanded, onToggle}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [heads, setHeads] = useState([
    I18n.t('label'),
    I18n.t('value'),
    I18n.t('remove'),
  ]);

  const dispatch = useDispatch();
  const {additionalInfo, addListObj} = useSelector((state) => state.listings);

  useEffect(() => {
    if (additionalInfo?.length > 0) {
      let newArr = [];
      additionalInfo?.map((item) => {
        newArr.push({
          label: item?.label,
          value: item?.value,
          value_link: item?.valueLink,
        });
      });
      addListObj['additional_info'] = newArr;
    } else {
      addListObj['additional_info'] = [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalInfo]);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      {additionalInfo?.length > 0 && (
        <Table style={{marginHorizontal: WP('5')}}>
          <Row
            data={heads}
            flexArr={[1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
      )}
      {additionalInfo?.map((item, index) => {
        return (
          <View key={index} style={styles.timeRowContainer}>
            <Text
              numberOfLines={2}
              style={[
                styles.day, // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: WP('25'),
                  textAlign: 'center',
                  alignSelf: 'center',
                },
              ]}>
              {item?.label}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.day, {width: WP('15'), marginRight: WP('18')}]}>
              {item?.value}
            </Text>
            <TouchableOpacity
              style={{right: WP('9')}}
              onPress={() => dispatch(removeFromAdditional(item.id))}>
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
      <PickAdditionalPopup
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
    marginHorizontal: 20,
    marginVertical: HP('0.5'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    backgroundColor: '#f1f8ff',
    height: HP('5'),
  },
  text: {textAlign: 'center', fontSize: size.xtiny, paddingVertical: WP('1')},
});

export {AdditionalAcord};
