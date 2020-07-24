import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const container = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export const color = {
  color: '#CA2121',
};

export const text = {
  fontFamily: 'NunitoSans-ExtraBold',
  fontSize: hp(4.5),
  letterSpacing: -wp(0.4),
};

export const icon = {
  position: 'absolute',
  left: wp(5),
  fontSize: hp(5),
};
