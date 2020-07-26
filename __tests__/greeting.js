const greeting = currentTime => {
  if (currentTime.match(/(\s|^)AM(\s|$)/)) {
    return `Good morning, John!`;
  }

  if (
    (currentTime.substring(0, 2) !== '12' &&
      parseInt(currentTime.split('')[0], 10) >= 6) ||
    (currentTime.substring(0, 2) !== '12' &&
      parseInt(currentTime.substring(0, 2), 10) >= 10)
  ) {
    return `Good evening, John!`;
  }

  return `Good afternoon, John!`;
};

test('correctly gives the right greeting', () => {
  expect(greeting('11:00 PM GMT-0500')).toBe('Good evening, John!');
});
