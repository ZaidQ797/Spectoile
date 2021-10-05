import React from 'react';
import Snackbar from 'react-native-snackbar';
import {colors} from '../../utilities';

const ShowSnack = ({title, btnTitle, status, onPress}) => {
  let backgroundColor =
    status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue';

  return Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor,
    action: {
      text: btnTitle || 'Ok',
      textColor: colors.white,
      onPress: onPress,
    },
  });
};

export {ShowSnack};
