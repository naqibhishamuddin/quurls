"use client";

import {
  CssBaseline,
  createTheme,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "1rem",
          },
        },
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily,
    },
    palette: {
      primary: {
        main: grey[900],
      },
      background: {
        default: "#FAF9F9",
      },
      success: {
        main: "#53a653",
      },
    },
  })
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </>
  );
};
