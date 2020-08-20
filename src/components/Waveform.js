import * as React from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Animation
import Animated, {
  Value,
  Easing,
  Transition,
  Transitioning,
  timing,
  block,
  clockRunning,
  set,
  cond,
  startClock,
  Clock,
} from 'react-native-reanimated';
// import {timing} from 'react-native-redash';
import LottieView from 'lottie-react-native';
import {useMemoOne} from 'use-memo-one';

// store
import {useSessionStore} from '../zustand/store';

const Waveform = ({style}) => {
  const [opacityVal, setOpacityVal] = React.useState(new Value(0));

  const runOpacityAnim = (startingVal, endingVal) => {
    const clock = new Clock();

    const state = {
      finished: new Value(0),
      position: new Value(startingVal),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 300,
      toValue: new Value(endingVal),
      easing: Easing.linear,
    };

    return block([
      startClock(clock),

      timing(clock, state, config),

      // we made the block return the updated position
      state.position,
    ]);
  };

  React.useEffect(() => {
    // console.log('received voice state change');
    useSessionStore.subscribe(
      voicePlaying => {
        if (voicePlaying === true) {
          setOpacityVal(runOpacityAnim(0, 1));
        } else {
          setOpacityVal(runOpacityAnim(1, 0));
        }
      },
      state => state.voicePlaying,
    );
  }, []);

  return (
    <Animated.View style={[{opacity: opacityVal}, style]}>
      <LottieView
        source={require('../assets/animations/waveform.json')}
        style={[{width: wp(100)}]}
        autoPlay={true}
      />
    </Animated.View>
  );
};

export default Waveform;
