import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Accordion, Spacer, Input} from '../../components';
import I18n from '../../translation';
import {WP, HP, family, size} from '../../utilities';
import {useSelector} from 'react-redux';

const ContactAcord = ({title, expanded, onToggle}) => {
  const phoneRef = useRef();
  const emailRef = useRef();
  const siteRef = useRef();

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [siteURL, setSiteURL] = useState('');

  useEffect(() => {
    setPhone(addListObj.phone);
    setEmail(addListObj.email);
    setSiteURL(addListObj.site_url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {addListObj} = useSelector((state) => state.listings);

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <View style={styles.body}>
        <Spacer />
        <Input
          placeholder={I18n.t('phone')}
          reference={phoneRef}
          onSubmitEditing={() => emailRef.current.focus()}
          returnKeyType={'next'}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            addListObj.phone = text;
          }}
        />
        <Input
          placeholder={I18n.t('email')}
          reference={emailRef}
          onSubmitEditing={() => siteRef.current.focus()}
          returnKeyType={'next'}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            addListObj.email = text;
          }}
        />
        <Input
          placeholder="Site URL"
          reference={siteRef}
          returnKeyType={'default'}
          value={siteURL}
          onChangeText={(text) => {
            setSiteURL(text);
            addListObj.site_url = text;
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
});

export {ContactAcord};
