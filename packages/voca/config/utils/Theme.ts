import { Components } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Noto_Sans_KR } from 'next/font/google';
import { spoca2, pretendardFont, spoca1 } from 'package/styles/fonts/module';

declare module '@mui/material/styles' {
  interface Palette {
    lavender: Palette['etc'];
    pink: Palette['etc'];
    brown: Palette['etc'];
    purple: Palette['etc'];
    green: Palette['etc'];
  }
  interface PaletteOptions {
    lavender: PaletteOptions['etc'];
    pink: PaletteOptions['etc'];
    brown: PaletteOptions['etc'];
    purple: PaletteOptions['etc'];
    green: PaletteOptions['etc'];
  }
}

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--noto_sans_kr',
  weight: '600',
});

const typographyProperties: TypographyOptions = {
  fontSize: 14,
  h1: {
    fontWeight: 600,
    fontSize: 36,
    lineHeight: '39.6px',
    letterSpacing: '-0.015em',
  },
  h2: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: '32.2px',
    letterSpacing: '-0.005em',
  },
  h3: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '28.08px',
  },
  h4: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '0.0025em',
  },
  h5: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '17.92px',
    letterSpacing: '0.005em',
  },
  h6: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.015em',
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.0015em',
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '18.67px',
    letterSpacing: '0.001em',
  },
  body1: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '22.4px',
    letterSpacing: '0.005em',
  },
  body2: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19.6px',
    letterSpacing: '0.0025em',
  },
  caption: {
    fontWeight: 300,
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.004em',
  },
  overline: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: '14px',
    letterSpacing: '0.015em',
  },
};

const buttonProperties: Components['MuiButton'] = {
  defaultProps: { size: 'small' },
  styleOverrides: {
    sizeSmall: {
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '0.025em',
      padding: '2px 10px',
    },
    sizeMedium: {
      fontWeight: 600,
      fontSize: 13,
      lineHeight: '18px',
      letterSpacing: '0.025em',
      padding: '3px 15px',
    },
    sizeLarge: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.035em',
      padding: '4px 20px',
    },
    containedSecondary: ({ theme }: { theme: any }) => ({
      backgroundColor: theme.palette.grey.A200,
      color: theme.palette.getContrastText(theme.palette.grey.A200),
      ':hover': {
        backgroundColor: theme.palette.grey.A100,
        color: theme.palette.getContrastText(theme.palette.grey.A100),
      },
    }),
    textSecondary: ({ theme }: { theme: any }) => ({
      color: theme.palette.text.secondary,
      ':hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    }),
  },
};
export const LightThemeData = {
  components: {
    MuiButton: buttonProperties,
  },
  typography: {
    fontFamily: pretendardFont.fontFamily,
    ...typographyProperties,
  },
  palette: {
    mode: 'light',
    common: {
      black: '#2b2b2b',
      gray: '#626D81',
      white: '#F8F8F8',
    },
    primary: {
      light: '#D6EEEE80',
      main: '#83CBCB',
      dark: '#30A7A7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#EDF1FBB2',
      main: '#B5C9EF',
      dark: '#6B92DE',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      light: '#E0BBE4',
      main: '#9B5DE5',
      dark: '#6A00F4',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#F9C0C780',
      main: '#F16979',
      dark: '#C91A2E',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#F9E3AD80',
      main: '#F2C85B',
      dark: '#E08600',
      contrastText: '#FFFFFF',
    },
    info: {
      light: '#99C2E880',
      main: '#3385D1',
      dark: '#005CB1',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#A7D7BE4D',
      main: '#4DAE7E',
      dark: '#186F46',
      contrastText: '#FFFFFF',
    },
    divider: '#626D8133',
    background: {
      default: '#FFFFFF',
      paper: '#F7F9FB',
    },
    text: {
      primary: '#434C58',
      secondary: '#626D81',
      disabled: '#D0D4DA',
    },
    grey: {
      900: '#323D4D',
      800: '#495261',
      700: '#606875',
      600: '#767D88',
      500: '#8D939C',
      400: '#A4A9B0',
      300: '#BBBFC4',
      200: '#D1D4D7',
      100: '#E9EAEC',
      50: '#F3F4F5',
      A700: '#60687533',
      A400: '#A4A9B026',
      A200: '#D1D4D74D',
      A100: '#E9EAEC80',
    },
    pink: {
      light: '#efcfe3',
      main: '#ea9ab2',
      dark: '#e27396',
    },
    brown: {
      light: '#f5ebe0',
      main: '#e3d5ca',
      dark: '#d5bdaf',
    },
    purple: {
      light: '#ffcfd2',
      main: '#f1c0e8',
      dark: '#cfbaf0',
    },
    lavender: {
      light: '#bbd0ff',
      main: '#b8c0ff',
      dark: '#c8b6ff',
    },
    green: {
      light: '#bfd8bd',
      main: '#98c9a3',
      dark: '#77bfa3',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1520,
    },
  },
};

export const DarkThemeData = {
  components: {
    MuiButton: buttonProperties,
  },
  typography: {
    fontFamily: pretendardFont.fontFamily,
    ...typographyProperties,
  },
  palette: {
    mode: 'dark',
    common: {
      black: '#FFFFFF',
      gray: '#B0B0B0',
      white: '#F8F8F8',
    },
    primary: {
      light: '#D6EEEE80',
      main: '#83CBCB',
      dark: '#30A7A7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#EDF1FBB2',
      main: '#B5C9EF',
      dark: '#6B92DE',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      light: '#7E57C2',
      main: '#4A00E0',
      dark: '#320080',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#F9C0C780',
      main: '#F16979',
      dark: '#C91A2E',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#F9E3AD80',
      main: '#F2C85B',
      dark: '#E08600',
      contrastText: '#FFFFFF',
    },
    info: {
      light: '#99C2E880',
      main: '#3385D1',
      dark: '#005CB1',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#A7D7BE4D',
      main: '#4DAE7E',
      dark: '#186F46',
      contrastText: '#FFFFFF',
    },
    divider: '#626D8133',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#6B6B6B',
    },
    grey: {
      900: '#323D4D',
      800: '#495261',
      700: '#606875',
      600: '#767D88',
      500: '#8D939C',
      400: '#A4A9B0',
      300: '#BBBFC4',
      200: '#D1D4D7',
      100: '#E9EAEC',
      50: '#F3F4F5',
      A700: '#60687533',
      A400: '#A4A9B026',
      A200: '#D1D4D74D',
      A100: '#E9EAEC80',
    },
    pink: {
      light: '#ccacb7',
      main: '#b97488',
      dark: '#a55270',
    },
    brown: {
      light: '#cdc1b8',
      main: '#a89a8c',
      dark: '#8a7f72',
    },
    purple: {
      light: '#b39fc1',
      main: '#9d87b0',
      dark: '#815e99',
    },
    lavender: {
      light: '#9da2cf',
      main: '#7f85b8',
      dark: '#676da0',
    },
    green: {
      light: '#91a68f',
      main: '#738e76',
      dark: '#596f5f',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1520,
    },
  },
};
