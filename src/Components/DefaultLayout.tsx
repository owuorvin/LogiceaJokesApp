import { createStyles, makeStyles } from "@mui/styles";
import {Theme} from "@mui/material"
import React, { ReactChild } from "react";
import Header from "./Header";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; //

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      margin: 0,
      width: "100%",
      // Add background color for dark mode
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      transition: "background-color 0.3s ease, color 0.3s ease",
    },

    sidebar: {
      position: "fixed",
      left: 0,
      zIndex: theme.zIndex.appBar + 10,
    },

    main: {
      backgroundColor: theme.palette.common.white,
      minHeight: "92vh",
      height: "auto",
    },
    // Dark mode styles
    darkMode: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
    },
    
    // Toggle icon styles
    toggleIcon: {
      position: "fixed",
      bottom: theme.spacing(14), // Adjust the bottom margin here
      right: theme.spacing(2), // Adjust the right margin here
      zIndex: theme.zIndex.appBar + 10,
      float: "right", // Float the icon to the right
    },
  })
);
type LayoutProps = {
  children: ReactChild;
};
const DefaultLayout = ({ children }: LayoutProps) => {

  const classes = useStyles();
 // Define a state for dark mode
 const [darkMode, setDarkMode] = React.useState(false);

 // Function to toggle dark mode state
 const handleDarkModeToggle = () => {
   setDarkMode((prevMode) => !prevMode);
 };
  // eslint-disable-next-line no-nested-ternary
  const sidebarWidth =  0;
  return (
    <div className={`${classes.root} ${darkMode ? classes.darkMode : ""}`}>
    <Header />
    <div className={classes.root}>
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
        className={classes.main}
      >
        {children}
      </div>
    </div>
    {/* Dark mode toggle button */}
    <IconButton className={classes.toggleIcon} onClick={handleDarkModeToggle}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  </div>
  );
};

export default DefaultLayout;
