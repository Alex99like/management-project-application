import { useEffect, useState } from 'react';

export const useSwitcher = (switcher: 'login' | 'register') => {
  const [switcherUp, setSwitcherUp] = useState(false);
  const [switcherDown, setSwitcherDown] = useState(false);

  useEffect(() => {
    setSwitcherUp(true);
    setTimeout(() => {
      setSwitcherUp(false);
      setSwitcherDown(true);
      setTimeout(() => {
        setSwitcherDown(false);
      }, 150);
    }, 150);
  }, [switcher]);

  return { switcherUp, switcherDown };
};
