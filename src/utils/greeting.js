import date from 'date-and-time';

export default name => {
  const currentTime = date.format(new Date(), 'hh:mm A [GMT]Z');

  if (currentTime.match(/(\s|^)AM(\s|$)/)) {
    return `Good morning, ${name}!`;
  }

  // Either must be greater than/equal to 6, or greater than/equal to 10, but can't be 12
  if (
    (currentTime.substring(0, 2) !== '12' &&
      parseInt(currentTime.split('')[1], 10) >= 6) ||
    (currentTime.substring(0, 2) !== '12' &&
      parseInt(currentTime.substring(0, 2), 10) >= 10)
  ) {
    return `Good evening, ${name}!`;
  }

  return `Good afternoon, ${name}!`;
};
