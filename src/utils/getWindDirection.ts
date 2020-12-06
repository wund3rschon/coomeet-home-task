const ranges = [
  'north-northeast',
  'northeast',
  'east-northeast',
  'east',
  'east-southeast',
  'southeast',
  'south-southeast',
  'south',
  'south-southwest',
  'southwest',
  'west-southwest',
  'west',
  'west-northwest',
  'northwest',
  'north-northwest',
  'north',
];

const getWindDirection = (degree: number) => {
  const deg = degree % 360;
  const direction = ranges.reduce<Maybe<string>>(
    (acc, range, index) => {
      if (acc == null) {
        const start = 11.25 + index * 22.5;
        const finish = 11.25 + (index + 1) * 22.5;
        if (deg >= start && deg < finish) {
          return range;
        }
      }

      return acc;
    },
    null,
  );

  return direction ?? 'north';
};

export default getWindDirection;
