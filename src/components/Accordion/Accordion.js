import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {colors, family, size} from '../../utilities';

const Accordion = ({title, expanded, onToggle, isDone = false, children}) => {
  return (
    <List.Accordion
      title={title}
      titleStyle={styles.titleStyle}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, {backgroundColor: 'white'}]}
      expanded={expanded}
      onPress={onToggle}>
      <View style={styles.body}>{children}</View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 0,
    borderColor: colors.border,
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
  },
  body: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopEndRadius: 0,
    borderTopWidth: 0,
  },
});

export {Accordion};
