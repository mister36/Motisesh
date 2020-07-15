import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';
import LinearGradient from 'react-native-linear-gradient';
import {PieChart} from 'react-native-chart-kit';

// Context
import SessionContext from '../context/SessionContext';
// Styles
import {ButtonStyle, CardStyle, HeaderStyle} from '../styles';
// Icons
import Icon from 'react-native-vector-icons/AntDesign';
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
            color: '#DC8E33',
            legendFontColor: '#DC8E33',
            legendFontSize: 15,
          },
          {
            name: 'Workout',
            number: info.categoryCount.workout,
            color: '#D33232',
            legendFontColor: '#D33232',
            legendFontSize: 15,
          },
          {
            name: 'General',
            number: info.categoryCount.general,
            color: '#3B66D3',
            legendFontColor: '#3B66D3',
            legendFontSize: 15,
          },
          {
            name: 'Study',
            number: info.categoryCount.study,
            color: '#2A8FAD',
            legendFontColor: '#2A8FAD',
            legendFontSize: 15,
          },
          {
            name: 'Work',
            number: info.categoryCount.work,
            color: 'purple',
            legendFontColor: 'purple',
            legendFontSize: 15,
          },
        ]);
        console.log(stats);
      } catch (error) {
        setStats(-1);
      }
    };
    sessionsLeft();
  }, []);

  return JSON.stringify(stats) !== '{}' && JSON.stringify(pieData) !== '{}' ? (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      // colors={['#5D1A1A', '#D3503B']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.header}>Cheer Session</Text>
        {/* <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        /> */}
      </View>

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
          height={hp(30)}
          width={wp(90)}
          chartConfig={chartConfig}
          accessor="number"
          paddingLeft={wp(5)}
        />
      </View>

      <TouchableOpacity
        style={styles.continueButtonStyle}
        onPress={() => makeConfigVisible(true)}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    <ActivityIndicator color="blue" style={styles.spinner} />
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
  logo: {
    height: wp(55.8),
    width: wp(47.5),
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  continueButtonStyle: {
    ...ButtonStyle.color,
    ...ButtonStyle.align,
    width: wp(40),
    height: hp(7),
    alignItems: 'center',
    alignSelf: 'center',
    top: hp(5),
  },
  continueText: {
    fontFamily: 'Lato-Black',
    fontSize: hp(2.8),
  },
  cardContainer: {
    marginTop: hp(5),
  },
  card: {
    ...CardStyle.mainStyle,
    marginTop: hp(2),
    borderRadius: 4,
    height: hp(9),
    justifyContent: 'center',
    width: wp(50),
    marginLeft: wp(2),
  },
  cardText: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.5),
    color: 'black',
    marginLeft: wp(1),
  },
  arrow: {
    color: '#0A3641',
    fontSize: hp(7),
    textAlignVertical: 'center',
  },
  sessionCompleted: {
    ...CardStyle.mainStyle,
    marginTop: hp(2),
    borderRadius: 4,
    width: wp(95),
    alignSelf: 'center',
    padding: hp(1),
  },
  sessionNum: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(5),
    color: '#0A3641',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  sessionComText: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.8),
    marginLeft: wp(10),
    textAlignVertical: 'center',
  },
  pieContainer: {
    ...CardStyle.mainStyle,
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(5),
  },
  spinner: {
    marginTop: hp(50),
    transform: [{scaleX: 3}, {scaleY: 3}],
  },
});

export default SessionScreen;
