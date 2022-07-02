const spaceWidth = (isLarge: boolean, isMedium: boolean, isExtraLarge: boolean, isSmall: boolean, isExtraSmall: boolean ) => {
  if (isMedium) {
    return 90;
  } if (isLarge) {
    return 150;
  } if (isExtraLarge) {
    return 250;
  } if (isExtraSmall || isSmall) {
    return 'middle'
  }
  return 250;
};

export default spaceWidth;