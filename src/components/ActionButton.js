import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ActionButton = ({
  text,
  textStyle,
  color1,
  color2,
  style,
  onPress,
  loading,
}) => {
  return (
    <LinearGradient colors={[color1, color2]} style={[style, styles.container]}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
  },
});

export default ActionButton;
