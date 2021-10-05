import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Accordion, Spacer, DropDown, Input} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size} from '../../utilities';
import {useSelector} from 'react-redux';

const ReviewAcord = ({title, expanded, onToggle}) => {
  const [showReviews, setShowReviews] = useState([
    {
      label: I18n.t('default'),
      value: 'default',
    },
    {
      label: I18n.t('yes'),
      value: 'yes',
    },
    {
      label: I18n.t('no'),
      value: 'no',
    },
  ]);

  const {addListObj} = useSelector((state) => state.listings);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <DropDown
        zIndex={10}
        label={I18n.t('show_reviews')}
        data={showReviews}
        getVal={(val) => {}}
      />
      <Text style={styles.label}>{I18n.t('show_reviews_subtitle')}</Text>
      <Spacer />
      <Spacer />
      <DropDown
        zIndex={9}
        label={I18n.t('enabled_advance_review')}
        data={showReviews}
        getVal={(val) => {
          addListObj.enable_advanced_reviews = val.value;
        }}
      />
      <Text style={styles.label}>
        {I18n.t('enable_advance_reviews_subtitle')}
      </Text>
      <Spacer />
      <Spacer />
      <Spacer />
      <View style={styles.body} />
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
});

export {ReviewAcord};
