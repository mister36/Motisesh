import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderStyle} from '../styles';

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="ios-menu"
        size={24}
        style={styles.icon}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text style={styles.text}>TopCheer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: HeaderStyle.container,
  icon: {
    ...HeaderStyle.color,
    ...HeaderStyle.icon,
  },
  text: {
    ...HeaderStyle.color,
    ...HeaderStyle.text,
  },
});

export default Header;
