import date from 'date-and-time';
import AsyncStorage from '@react-native-community/async-storage';

export default async () => {
  try {
    const stats = {
      sessionsToday: 0,
      sessionsOverall: 0,
      categoryCount: {chores: 0, workout: 0, general: 0, study: 0, work: 0},
    }; // will return this object

    let info = await AsyncStorage.getItem('sessionInfo');
    info = JSON.parse(info); // turns data into object

    const today = info[date.format(new Date(), 'MMM DD YYYY')]; // array of sessions completed today (e.g, info['Jul 20 2020'])

    // Number of sessions today
    stats.sessionsToday = today ? today.length : 0;

    for (const dateStr in info) {
      // Number of total sessions
      stats.sessionsOverall += info[dateStr].length;

      //   Number of sessions per category //TODO make this O(n) not O(n2)
      info[dateStr].forEach((val, index) => {
        // val = {category: "workout", "time": 5}
        stats.categoryCount[val.category] += 1;
      });
    }

    // console.log('///////////////////////////////');
    // console.log(stats);
    // console.log('data in storage:', info);
    return stats;
  } catch (error) {
    console.error(error);
  }
};

export const decToMin = dec => {
  // decimal
  const num = dec.toString();

  const min = num.split('.')[0]; // minutes
  const afterDec = num.split('.')[1];
  const sec = Math.round(parseFloat(`0.${afterDec}`) * 60); // seconds

  return `${min}m ${sec}s`;
};
