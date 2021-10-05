import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import I18n from '../../../translation';
import {Input, IconButton} from '../../../components';
import {WP, appIcons, colors, family, size, HP} from '../../../utilities';

const EditForm = ({type, onSave}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCounrty] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.form}>
      <Text style={styles.lable}>{I18n.t('first_name')}</Text>
      <Input
        placeholder={I18n.t('first_name')}
        placeholderTextColor={colors.black}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={styles.lable}>{I18n.t('last_name')}</Text>
      <Input
        placeholder={I18n.t('last_name')}
        placeholderTextColor={colors.black}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Text style={styles.lable}>{I18n.t('company_name')}</Text>
      <Input
        placeholder={I18n.t('company_name')}
        placeholderTextColor={colors.black}
        value={companyName}
        onChangeText={(text) => setCompanyName(text)}
      />
      <Text style={styles.lable}>{I18n.t('country')}</Text>
      <Input
        placeholder={I18n.t('country')}
        placeholderTextColor={colors.black}
        value={country}
        onChangeText={(text) => setCounrty(text)}
      />
      <Text style={styles.lable}>{I18n.t('street_address')}</Text>
      <Input
        placeholder={I18n.t('house_no')}
        placeholderTextColor={colors.black}
        value={address1}
        onChangeText={(text) => setAddress1(text)}
      />
      <Input
        placeholder={I18n.t('apartment')}
        placeholderTextColor={colors.black}
        value={address2}
        onChangeText={(text) => setAddress2(text)}
      />
      <Text style={styles.lable}>{I18n.t('town')}</Text>
      <Input
        placeholder={I18n.t('town')}
        placeholderTextColor={colors.black}
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Text style={styles.lable}>{I18n.t('state')}</Text>
      <Input
        placeholder={I18n.t('state')}
        placeholderTextColor={colors.black}
        value={state}
        onChangeText={(text) => setState(text)}
      />
      <Text style={styles.lable}>{I18n.t('postal_code')}</Text>
      <Input
        placeholder={I18n.t('postal_code')}
        placeholderTextColor={colors.black}
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
      />
      <Text style={styles.lable}>{I18n.t('phone')}</Text>
      <Input
        placeholder={I18n.t('phone')}
        placeholderTextColor={colors.black}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Text style={styles.lable}>{I18n.t('email')}</Text>
      <Input
        placeholder={I18n.t('email')}
        placeholderTextColor={colors.black}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <IconButton
        title={I18n.t('save_address')}
        withIcon={false}
        backgroundColor={colors.p2}
        icon={appIcons.loginIcon}
        iconColor={colors.white}
        style={styles.loginButton}
        titleColor={colors.white}
        onSubmit={() => onSave()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginHorizontal: WP('4'),
  },
  lable: {
    fontFamily: family.Montserrat_Medium,
    marginHorizontal: WP('1'),
    fontSize: size.xsmall,
    fontWeight: '500',
  },
});

export {EditForm};
