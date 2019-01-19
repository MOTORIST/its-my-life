import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    htmlFontSize: 18,
  },
  palette: {
    primary: {
      light: '#80DEEA',
      main: '#00B8D4',
      dark: '#00838F',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
  wrapperCenterContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

theme = {
  ...theme,
  overrides: {
    MuiCardHeader: {
      root: {
        backgroundColor: theme.palette.primary.main,
      },
      title: {
        color: theme.palette.primary.contrastText,
      }
    }
  },
};

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;