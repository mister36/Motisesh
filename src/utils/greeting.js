import date from 'date-and-time';

export default name => {
  const currentTime = date.format(new Date(), 'hh:mm A [GMT]Z');

  if (currentTime.match(/(\s|^)AM(\s|$)/)) {
    return `Good morning, ${name}!`;
  }

  if (currentTime.split('')[0] === 1 || currentTime.split('')[1] >= 6) {
    return `Good evening, ${name}!`;
  }

  return `Good afternoon, ${name}!`;
};
