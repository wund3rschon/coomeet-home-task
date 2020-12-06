const ranges = [
  'N/NE',
  'NE',
  'E/NE',
  'E',
  'E/SE',
  'SE',
  'S/SE',
  'S',
  'S/SW',
  'SW',
  'W/SW',
  'W',
  'W/NW',
  'NW',
  'N/NW',
  'N',
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

  return direction ?? 'N';
};

export default getWindDirection;
