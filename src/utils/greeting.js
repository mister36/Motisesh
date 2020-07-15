import date from 'date-and-time';

export default name => {
  const currentTime = date.format(new Date(), 'hh:mm A [GMT]Z');
  console.log(currentTime.split('')[0]);

  if (currentTime.match(/(\s|^)AM(\s|$)/)) {
    return `Good morning, ${name}!`;
  }

  if (
    currentTime.split('')[0] === '1' ||
    parseInt(currentTime.split('')[1], 10) >= 6
  ) {
    return `Good evening, ${name}!`;
  }

  return `Good afternoon, ${name}!`;
};
