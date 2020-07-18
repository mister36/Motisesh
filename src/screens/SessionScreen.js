import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';

import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';

import {PieChart} from 'react-native-chart-kit';

// Context
import SessionContext from '../context/SessionContext';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ButtonStyle, CardStyle, HeaderStyle} from '../styles';
import LinearGradient from 'react-native-linear-gradient';

// Motion
import Interactable from 'react-native-interactable';

// Icons
import Icon from 'react-native-vector-icons/AntDesign';

// Components
import LegendPiece from '../components/LegendPiece';

// Utils
import getStats from '../utils/getStats';

const SessionScreen = () => {
  requestDownloadPermission(requestReadFilePermission);

  const {makeConfigVisible} = React.useContext(SessionContext);
  const [stats, setStats] = React.useState({});
  const [pieData, setPieData] = React.useState({});

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  React.useEffect(() => {
    const sessionsLeft = async () => {
      try {
        const info = await getStats();
        setStats(info);
        setPieData([
          {
            name: 'Chores',
            number: info.categoryCount.chores,
            color: '#92D354',
          },
          {
            name: 'Workout',
            number: info.categoryCount.workout,
            color: '#D33232',
          },
          {
            name: 'General',
            number: info.categoryCount.general,
            color: '#3B66D3',
          },
          {
            name: 'Study',
            number: info.categoryCount.study,
            color: '#E9912E',
          },
          {
            name: 'Work',
            number: info.categoryCount.work,
            color: 'purple',
          },
        ]);
        console.log(stats);
      } catch (error) {
        setStats(-1);
      }
    };
    sessionsLeft();
  }, []);

  // RNFetchBlob.fs
  //   .exists(`file:///${RNFetchBlob.fs.dirs.DocumentDir}/hype.mp4`)
  //   .then(val => console.log('file exists?:', val));

  return JSON.stringify(stats) !== '{}' && JSON.stringify(pieData) !== '{}' ? (
    // <ScrollView style={{flex: 1}}>
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      // colors={['#5D1A1A', '#D3503B']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.header}>Cheer Session</Text>
      </View>

      {/* Video stuff */}
      <View style={styles.videoContainer}>
        {/* Goes over video */}
        <View style={styles.videoOverlay}>
          <Text style={styles.videoText}>Start</Text>
        </View>

        <Video
          source={{
            uri: `file:///${RNFetchBlob.fs.dirs.DocumentDir}/hype.mp4`,
          }}
          repeat
          muted={true}
          resizeMode="cover"
          style={styles.videoButton}
        />
      </View>

      <View style={styles.swipeContainer}>
        {/* <Text>Swipe to start</Text> */}
        <Interactable.View
          horizontalOnly
          snapPoints={[{x: 0, tension: 1500}, {x: wp(85)}]}
          alertAreas={[{id: 'buttonSpace', influenceArea: {left: wp(70)}}]}
          onAlert={event => console.log(event.id, event.value)}
          animatedNativeDriver={true}

          // frictionAreas={[{damping: 0.7, influenceArea: {right: wp(50)}}]}
        >
          <Image
            source={require('../assets/images/logo.png')}
            style={{height: wp(16.6), width: wp(14)}}
          />
        </Interactable.View>
      </View>

      {/* All stats */}

      <Text style={styles.statsHeader}>Session stats</Text>
      <View style={styles.sessionCompleted}>
        <View style={styles.row}>
          <Icon name="arrowup" style={styles.arrow} />
          <Text style={styles.sessionNum}>{stats.sessionsToday}</Text>
          <Text style={styles.sessionComText}>
            Sessions completed{'\n'}today
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="arrowup" style={styles.arrow} />
          <Text style={styles.sessionNum}>{stats.sessionsOverall}</Text>
          <Text style={styles.sessionComText}>
            Sessions completed{'\n'}all time
          </Text>
        </View>
      </View>

      <View style={styles.pieContainer}>
        <PieChart
          data={pieData}
          height={hp(20)}
          width={wp(50)}
          chartConfig={chartConfig}
          accessor="number"
          hasLegend={false}
          paddingLeft={wp(10)}
        />
        <View style={styles.legendContainer}>
          <LegendPiece text="Chores" color="#92D354" />
          <LegendPiece text="Workout" color="#D33232" />
          <LegendPiece text="General" color="#3B66D3" />
          <LegendPiece text="Study" color="#E9912E" />
          <LegendPiece text="Work" color="#B53ACD" />
        </View>
      </View>
    </LinearGradient>
  ) : (
    // </ScrollView>
    <ActivityIndicator color="#27C2C6" style={styles.spinner} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...HeaderStyle.text,
    ...HeaderStyle.color,
    alignSelf: 'center',
    marginTop: hp(1),
  },
  videoContainer: {
    marginBottom: hp(3),
    marginTop: hp(3),
  },
  videoButton: {
    height: wp(56.25),
    width: wp(100),
  },
  videoText: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Regular',
    fontSize: wp(8),
    position: 'absolute',
    bottom: hp(1),
  },
  videoOverlay: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    // backgroundColor: 'rgba(242, 155, 43, .4)',
    height: wp(56.25),
    width: wp(100),
    position: 'absolute',
    zIndex: 10,
  },
  swipeContainer: {
    backgroundColor: '#27C2C6',
  },
  statsHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(3),
    marginLeft: wp(5),
    color: '#D15621',
  },
  arrow: {
    color: '#0A3641',
    fontSize: hp(7),
    textAlignVertical: 'center',
  },
  sessionCompleted: {
    ...CardStyle.mainStyle,
    marginTop: hp(2),
    width: wp(80),
    alignSelf: 'center',
    padding: hp(1),
  },
  sessionNum: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(4),
    color: '#0A3641',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  sessionComText: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.4),
    marginLeft: wp(10),
    textAlignVertical: 'center',
  },
  pieContainer: {
    ...CardStyle.mainStyle,
    width: wp(80),
    alignSelf: 'center',
    marginTop: hp(5),
    flexDirection: 'row',
  },
  legendContainer: {
    justifyContent: 'center',
  },
  spinner: {
    marginTop: hp(50),
    transform: [{scaleX: 3}, {scaleY: 3}],
  },
});

export default SessionScreen;
