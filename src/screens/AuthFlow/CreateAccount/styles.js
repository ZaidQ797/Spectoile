import {StyleSheet} from 'react-native';
import {WP, HP, colors} from '../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
  },
  logo: {
    width: WP(45),
    height: HP(45),
  },
  logoContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    marginHorizontal: WP(5),
    paddingBottom: HP(4),
  },
  buttonStyle: {
    marginHorizontal: WP(5),
  },
  bottomSafeArea: {
    flex: 0,
    backgroundColor: 'transparent',
  },
});

export default styles;
