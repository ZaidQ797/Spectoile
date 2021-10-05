import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, family, size, WP} from '../../utilities';

const UploadCard = ({title, label, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.labelStyle}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    flexDirection: 'row',
    paddingHorizontal: WP('2'),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: WP('2'),
  },
  btnContainer: {
    backgroundColor: colors.p1,
    height: WP('8'),
    width: WP('30'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: family.Montserrat_Regular,
    color: colors.black,
    fontSize: size.tiny,
  },
  labelStyle: {
    fontFamily: family.Montserrat_Regular,
    color: colors.white,
    fontSize: size.xtiny,
  },
});

export {UploadCard};
