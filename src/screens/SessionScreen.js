import * as React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';

// Permission
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';

// Components

// Context
import SessionContext from '../context/SessionContext';

import AsyncStorage from '@react-native-community/async-storage';
import date from 'date-and-time';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';

const SessionScreen = () => {
  const [completed, setCompleted] = React.useState(-1);

  requestDownloadPermission(requestReadFilePermission);

  const calcSessions = async () => {
    try {
      let sessions = await AsyncStorage.getItem('sessionInfo');
      sessions = JSON.parse(sessions);

      const today = sessions[date.format(new Date(), 'MMM DD YYYY')];

      // if there are no logged sessions for today, set completed === 0
      today ? setCompleted(today.length) : setCompleted(0);
    } catch (error) {
      console.error(error);
    }
  };

  calcSessions();

  const svgSide = wp(40);
  const radius = wp(12);
  const circum = 2 * radius * Math.PI;

  return (
    <LinearGradient colors={['#F18F64', '#EF5841']} style={styles.container}>
      <View style={styles.topRow}>
        {/* Background Circle */}
        {/* /        <Image
          source={{
            uri:
              'https://www.musitechnic.com/wp-content/uploads/2016/07/tiger1.jpg',
          }}
          style={{height: 400, width: 360, position: 'absolute'}}
        />/ */}
        <Svg width={svgSide} height={svgSide} style={[styles.mainSvgCircle]}>
          <Circle
            stroke="#FFFFFF3A"
            strokeWidth={wp(2)}
            fill="none"
            cx={svgSide / 2}
            cy={svgSide / 2}
            r={radius}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#FFFFFF"
            strokeWidth={wp(2)}
            fill="none"
            cx={svgSide / 2}
            cy={svgSide / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={circum * (completed / 5)}
            strokeLinecap="round"
            transform={`rotate(-90, ${svgSide / 2}, ${svgSide / 2})`}
          />

          {/* Text */}
          <SvgText
            fontSize={wp(10)}
            x={svgSide / 2}
            y={svgSide / 2 + wp(18) / 2 - hp(2.5)}
            textAnchor="middle"
            fontFamily="OpenSans-SemiBold"
            fill="#FFFFFF">
            {5 - completed}
          </SvgText>
          <SvgText
            fontSize={wp(6)}
            textAnchor="middle"
            fontFamily="Lato-Regular"
            x={svgSide / 2}
            y={svgSide}
            fill="#FFFFFF">
            Sessions left
          </SvgText>
        </Svg>
      </View>

      <View style={styles.bottomView}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            // justifyContent: 'space-between',
          }}
          style={{paddingBottom: hp(6)}}
        />
        <Pressable style={styles.beginButton}>
          <Text style={styles.beginButtonText}>Begin</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: '#F47F4D',
    // backgroundColor: '#E7803D',
  },
  bottomView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: hp(8),
    borderTopRightRadius: hp(8),
    height: hp(70),
    width: wp(100),
    marginTop: 'auto',
    // elevation: 10,
  },
  mainSvgCircle: {
    alignSelf: 'flex-end',
  },
  topRow: {
    marginTop: hp(1),
  },
  beginButton: {
    width: wp(80),
    backgroundColor: '#27C2C6',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(14),
  },
  beginButtonText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: wp(6),
  },
});

export default SessionScreen;
