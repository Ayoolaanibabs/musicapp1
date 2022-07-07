import { useMediaQuery } from 'react-responsive';

const useWindowDimensions = (): {
isExtraSmall: boolean;
isSmall: boolean;
isMedium: boolean;
isLarge: boolean;
isExtraLarge: boolean;
} => {
  const isExtraSmall = useMediaQuery({ maxWidth: 576, minWidth: 0 });
  const isSmall = useMediaQuery({ maxWidth: 767, minWidth: 577 });
  const isMedium = useMediaQuery({ maxWidth: 970, minWidth: 768 });
  const isLarge = useMediaQuery({ maxWidth: 1200, minWidth: 971 });
  const isExtraLarge = useMediaQuery({ minWidth: 1201 });

  return {
    isExtraSmall,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
  };
};

export default useWindowDimensions;
