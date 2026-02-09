import { createTheme } from "@mui/material/styles";

const blueTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    background: {
      default: "#f5f9ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0d47a1",
      secondary: "#1976d2",
      disabled: "#90caf9",
    },
    divider: "#bbdefb",
  },
  shape: {
    borderRadius: 12,
  },
});

export default blueTheme;
