import quotesObj from './quotes.json';

// export default () => {
//   const {quotes} = quotesObj;
//   const randomQuote = quotes[Math.floor(Math.random() * 41)];
//   return randomQuote;
// };

// export const generateImg = author => {
//   if (author) {
//     const authLower = author.toLowerCase().replace(/\s+/g, ''); //turns Andy Warhol => andywarhol
//     return images[authLower];
//   }

//   return '';
// };

export default () => {
  const {quotes} = quotesObj;

  const randomNum = Math.floor(Math.random() * 40);
  console.log('random number', randomNum);
  const randomQuote = quotes[randomNum];
  const author = randomQuote.author;

  const authLower = author.toLowerCase().replace(/\s+/g, ''); //turns Andy Warhol => andywarhol
  return [randomQuote, images[authLower]];
};

const images = {
  abrahamlincoln: require('../assets/images/abrahamlincoln.jpg'),
  alberteinstein: require('../assets/images/alberteinstein.jpg'),
  andywarhol: require('../assets/images/andywarhol.jpg'),
  aristotle: require('../assets/images/aristotle.jpg'),
  audreyhepburn: require('../assets/images/audreyhepburn.jpg'),
  ameliaearhart: require('../assets/images/ameliaearhart.jpg'),
  baberuth: require('../assets/images/baberuth.jpg'),
  buddha: require('../assets/images/buddha.jpg'),
  eleanorroosevelt: require('../assets/images/eleanorroosevelt.jpg'),
  florencenightingale: require('../assets/images/florencenightingale.jpg'),
  franksinatra: require('../assets/images/franksinatra.jpg'),
  georgeeliot: require('../assets/images/georgeeliot.jpg'),
  jesseowens: require('../assets/images/jesseowens.jpg'),
  maejemison: require('../assets/images/maejemison.jpg'),
  mariecurie: require('../assets/images/mariecurie.jpg'),
  martinlutherkingjr: require('../assets/images/martinlutherkingjr.jpg'),
  mayaangelou: require('../assets/images/mayaangelou.jpg'),
  michaeljordan: require('../assets/images/michaeljordan.jpg'),
  napoleonhill: require('../assets/images/napoleonhill.jpg'),
  oprahwinfrey: require('../assets/images/oprahwinfrey.jpg'),
  robertfrost: require('../assets/images/robertfrost.jpg'),
  rosaparks: require('../assets/images/rosaparks.jpg'),
  sherylsandberg: require('../assets/images/sherylsandberg.jpg'),
  theodoreroosevelt: require('../assets/images/theodoreroosevelt.jpg'),
  vincelombardi: require('../assets/images/vincelombardi.jpg'),
  vincentvangogh: require('../assets/images/vincentvangogh.jpg'),
  waynegretzky: require('../assets/images/waynegretzky.jpg'),
  woodyallen: require('../assets/images/woodyallen.jpg'),
  zigziglar: require('../assets/images/zigziglar.jpg'),
  stevejobs: require('../assets/images/stevejobs.jpg'),
  bobdylan: require('../assets/images/bobdylan.jpg'),
  johnlennon: require('../assets/images/johnlennon.jpg'),
};

// 40 quotes
