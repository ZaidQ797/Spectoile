import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Accordion, Spacer, Input} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size} from '../../utilities';
import {useSelector} from 'react-redux';

const OpenTableAcord = ({title, expanded, onToggle}) => {
  const [id, setID] = useState('');

  const {addListObj} = useSelector((state) => state.listings);
  useEffect(() => {
    setID(addListObj.open_table_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <View style={styles.body}>
        <Spacer />
        <Input
          placeholder={I18n.t('open_table_id')}
          value={id}
          onChangeText={(text) => {
            setID(text);
            addListObj.open_table_id = text;
          }}
        />
        <Text style={styles.subtitle}>{I18n.t('open_table_id_subtitle')}</Text>
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
  subtitle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
  },
});

export {OpenTableAcord};
