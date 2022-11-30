import React, { forwardRef } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Link as RouterLink } from "react-router-dom"

import { AppBar, Container, CssBaseline, Link, responsiveFontSizes, Toolbar, Typography } from "@mui/material"

import { createTheme, ThemeProvider } from "@mui/material/styles"

import commonStyles from "./styles/common"

import { ContentRoutes } from "./routes"
import { Box } from "@mui/system"
import { GitHub, Radio } from "@mui/icons-material"

const MuiToRouterLinkTranslator = forwardRef((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

/* https://material.io/resources/color/ */
let baseTheme = createTheme({
  palette: {
    primary: {
      main: "#546e7a",
    },
  },

  // Ensure MUI Links use React-Router links as their underlying component
  components: {
    MuiLink: {
      defaultProps: {
        component: MuiToRouterLinkTranslator,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: MuiToRouterLinkTranslator,
      },
    },
  },
})
baseTheme = responsiveFontSizes(baseTheme)

const styles = {
  root: {
    ...commonStyles,

    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& header": {
      zIndex: 1,
      "& .MuiToolbar-root div": {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "baseline",
      },
      "& h1": {
        fontWeight: "500 !important",
      },
      "& h1 i": {
        fontStyle: "normal",
        fontWeight: "300 !important",
      },
    },
    "& footer": {
      zIndex: 1,
      boxShadow: "0px 0px 10px 5px rgb(0 0 0 / 12%)",
    },
  },
  toolbar: {
    justifyContent: "space-around",
    pl: { xs: 0.5, sm: 1, lg: 3 },
    pr: { xs: 0.5, sm: 1, lg: 3 },
  },

  footer: {
    pt: { xs: 0.5, sm: 1 },
    pb: { xs: 0.5, sm: 1 },
    pl: { xs: 1, sm: 2 },
    pr: { xs: 1, sm: 2 },

    textAlign: "center",
  },
  contentWrapper: {
    flex: 1,
    overflow: "auto",
  },
  content: {
    pt: 2,
    pb: 2,
    pl: 4,
    "& h1": {
      fontWeight: "500 !important",
    },
    "& h1 i": {
      fontStyle: "normal",
      fontWeight: "300 !important",
    },
  },
}

export function App() {
  return (
    <Box sx={styles.root}>
      <AppBar position="static" role="banner">
        <Toolbar sx={styles.toolbar}>
          <div>
            <Typography component="h1" variant="h4" color="inherit" noWrap sx={styles.titleMain}>
              <Link href="/" underline="hover" color="inherit" noWrap>
                <i>Ham2K</i> Contest Analyzer
              </Link>
            </Typography>
            <Typography component="div" color="inherit" noWrap sx={styles.version}>
              v0.1
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={styles.contentWrapper}>
        <Container sx={styles.content}>
          <ContentRoutes />
        </Container>
      </Box>
      <Box component="footer" sx={styles.footer}>
        <Radio fontSize="small" sx={{ verticalAlign: "baseline", position: "relative", top: "2px" }} />{" "}
        <span title={`${window.currentEnv} ${window.currentCommit.substr(0, 7)}`}>
          Ham2k <b>Marathon Tools</b>
        </span>
        &nbsp;&nbsp;•&nbsp;&nbsp; Developed by <a href="https://www.qrz.com/db/KI2D">KI2D</a> - Sebastian Delmont{" "}
        <a href="https://twitter.com/sd">@sd</a>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        <GitHub fontSize="small" sx={{ verticalAlign: "baseline", position: "relative", top: "4px" }} />
        &nbsp;
        <a href="https://github.com/ham2k/ham2k">github.com/ham2k</a>
      </Box>
    </Box>
  )
}

export function ThemedApp() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={baseTheme}>
        <App />
      </ThemeProvider>
    </>
  )
}

export default ThemedApp
