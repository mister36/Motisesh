import React, {Suspense} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  InteractionManager,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Animated, {timing, Easing, Value} from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';

import SessionSlider from './SessionSlider';
import SongButton from './SongButton';

const sessionUrlBase = 'http://192.168.1.72:4000/api/v1/audio/background?name=';

const heroOptions = [
  {
    type: 'hero',
  },
  {
    type: 'hero',
  },
  {
    type: 'hero',
  },
  {
    type: 'hero',
  },
  {
    type: 'hero',
  },
  {
    type: 'hero',
  },
];

const riseOptions = [
  {
    type: 'rise',
  },
  {
    type: 'rise',
  },
  {
    type: 'rise',
  },
  {
    type: 'rise',
  },
  {
    type: 'rise',
  },
  {
    type: 'rise',
  },
];

// used for any simple animations
const animConstructorFunc = (node, endVal, duration, easing = Easing.linear) =>
  timing(node, {
    duration,
    toValue: endVal,
    easing,
  });

const SongContainer = ({animateUp = false}) => {
  // state
  // decides which session options are shown, hero or rise
  const [optionsShown, setOptionsShown] = React.useState('hero');

  // anim values
  const {containerPosVal} = useMemoOne(
    () => ({containerPosVal: new Value(1)}),
    [],
  );

  // animates component based on props
  React.useEffect(() => {
    if (!animateUp) {
      animConstructorFunc(containerPosVal, 0, 300).start();
    } else if (animateUp) {
      animConstructorFunc(containerPosVal, 1, 300).start();
    }
  }, [animateUp]);
  return (
    // <Suspense
    //   fallback={
    //     <View
    //       style={{height: hp(20), width: hp(10), backgroundColor: 'blue'}}
    //     />
    //   }>
    <Animated.View
      style={[
        styles.container,
        {
          opacity: containerPosVal.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [
            {
              translateY: containerPosVal.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -hp(20)],
              }),
            },
          ],
        },
      ]}>
      <SessionSlider setOptionsShown={setOptionsShown} />

      <View style={styles.buttonContainer}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          contentContainerStyle={{
            width: wp(95),

            // justifyContent: 'space-between',
          }}
          numColumns={3}
          data={optionsShown === 'hero' ? heroOptions : riseOptions}
          keyExtractor={() => Math.random().toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.songOptionContainer}>
                <SongButton
                  length={wp(21)}
                  type={item.type}
                  sessionUrl={`${sessionUrlBase}${item.type}${index + 1}`}
                  sessionTitle={`${item.type} ${index + 1}`}
                  // voiceUrl={item.type === 'hero' ? ''}
                />
                <Text style={styles.songHeader}>
                  {item.type.toUpperCase()} {index + 1}
                </Text>
              </View>
            );
          }}
        />
        {/* <SongButton /> */}
      </View>
    </Animated.View>
    // </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    height: hp(40),
  },
  buttonContainer: {
    marginTop: hp(2),
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, .3)',
    width: wp(95),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    height: hp(33),
  },
  songOptionContainer: {
    alignItems: 'center',
    marginTop: hp(1),
    // borderRadius: wp(10),
    // borderWidth: 1,
  },
  songHeader: {
    fontFamily: 'NunitoSans-Black',
    color: '#ffffff',
  },
});

export default SongContainer;
