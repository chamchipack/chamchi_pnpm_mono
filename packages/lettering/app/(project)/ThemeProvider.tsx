'use client';

import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeData, DarkThemeData } from '@/config/utils/Theme';
import { PaletteOptions } from '@mui/material/styles/createPalette';

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme(ThemeData);
  // const isDarkMode = useRecoilValue(darkModeState); // Recoil 상태에서 다크 모드 값 가져오기

  // // 다크 모드에 따른 테마 동적 생성
  // const theme = useMemo(() => {
  //   const baseTheme = isDarkMode ? DarkThemeData : LightThemeData;

  //   return createTheme({
  //     ...baseTheme,
  //     palette: {
  //       ...baseTheme.palette,
  //       mode: isDarkMode ? 'dark' : 'light',
  //       background: {
  //         default: isDarkMode ? '#121212' : '#FFFFFF',
  //         paper: isDarkMode ? '#1d1d1d' : '#F7F9FB',
  //       },
  //     },
  //   });
  // }, [isDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
