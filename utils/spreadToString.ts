function spreadToString(spread: number | null) {
  if (!spread) return '?';

  let spreadString = spread.toString();

  if (spreadString[0] === '0') {
    spreadString = 'PK';
  } else if (spreadString[0] !== '-') {
    spreadString = '+' + spreadString;
  }
  return spreadString;
}

export { spreadToString };
