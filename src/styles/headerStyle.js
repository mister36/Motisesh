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
  fontFamily: 'Lato-Black',
  fontSize: hp(5),
};

export const icon = {
  position: 'absolute',
  left: wp(5),
  fontSize: hp(5),
};
