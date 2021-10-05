import {StyleSheet} from 'react-native';
import {HP, WP} from '../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: colors.p1,
  },
  text: {
    fontSize: 55,
    color: 'white',
  },
  imageStyles: {
    // resizeMode: "stretch",
    width: WP('100%'),
    height: HP('100%'),
    zIndex: 100,
    position: 'absolute',
  },
  background: {
    width: WP('100%'),
    height: HP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: WP(60),
    height: HP(60),
  },
});

export default styles;
