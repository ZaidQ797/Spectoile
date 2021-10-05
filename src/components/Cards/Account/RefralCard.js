import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {appIcons, colors, family, HP, WP} from '../../../utilities';
import {Icon} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

const RefralCard = ({item, index, lastItem}) => {
  const [btns, setBtns] = useState([
    {
      text: (
        <Icon name={'eyeo'} type={'antdesign'} color={colors.p1} size={20} />
      ),
      backgroundColor: colors.bgLightColor,
      underlayColor: colors.bgLightColor,
      icon: appIcons.editIcon,
      onPress: () => {},
      type: 'default',
    },
    {
      text: <Image style={styles.editIcon} source={appIcons.editIcon} />,
      backgroundColor: colors.orange,
      underlayColor: colors.black,
      icon: appIcons.editIcon,
      onPress: () => {},
      type: 'default',
    },
    {
      text: <Image style={styles.delIcon} source={appIcons.deleteIcon} />,
      backgroundColor: colors.p1,
      underlayColor: colors.white,
      icon: appIcons.deleteIcon,
      onPress: () => {},
    },
  ]);

  return (
    <Swipeout right={btns} autoClose="true" backgroundColor="transparent">
      <TouchableOpacity
        style={[
          styles.main,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderBottomWidth: lastItem ? 1 : 0,
          },
        ]}
        key={index}>
        <Image
          source={item.image}
          resizeMode={'contain'}
          style={styles.image}
        />
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  main: {
    height: HP('12'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: WP('25'),
    height: HP('9'),
    marginVertical: WP('5'),
  },
  text: {
    fontFamily: family.Montserrat_Bold,
    textAlign: 'center',
  },
  delIcon: {
    tintColor: colors.white,
    color: colors.white,
  },
  editIcon: {
    tintColor: colors.white,
    color: colors.white,
  },
  btnContaier: {
    borderWidth: 1,
  },
});

export {RefralCard};
