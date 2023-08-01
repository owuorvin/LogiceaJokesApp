/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Grid,
    IconButton,
     Theme
  } from "@mui/material";
  import { createStyles, makeStyles } from "@mui/styles";
  import { Menu } from "@mui/icons-material";
  import React from "react";
  // eslint-disable-next-line
  import { useNavigate } from "react-router-dom";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height: "8vh",
        padding: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: theme.shadows[3],
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.common.white,
      },
  
      menuButton: {
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      },
  
      icon: {
        padding: theme.spacing(1),
      },
      center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
  
      start: {
        justifyContent: "flex-start",
      },
  
      end: {
        justifyContent: "flex-end",
      },
  
      name: {
        fontSize: "1.2em",
        fontWeight: 700,
        color: theme.palette.common.black,
        textTransform: "capitalize",
      },
      button: {
        marginTop: theme.spacing(1),
       // width: "20%",
      },

    })
  );
  
  const Header: React.FC = () => {
    const classes = useStyles();

     const isAuthenticated = sessionStorage.getItem('auth');

    const history = useNavigate();
  
    const onClickMenu = () => {
      history("/dashboard");
    };
  
    const handleLogout = () => {
      sessionStorage.clear();
      history("/");
    };
  
    return (
      <div className={classes.root}>
        {/* {isAuthenticated ? ( */}
          <>
            <Grid
              item
              className={classes.start}
              classes={{ root: classes.center }}
            >
              <IconButton
                className={classes.menuButton}
                onClick={onClickMenu}
                color="inherit"
                size="medium"
                role="menu"
              >
               <ArrowBackIcon /> HOME
              </IconButton>
            </Grid>
  
            <Grid item className={classes.end} classes={{ root: classes.center }}>
              
            <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
            </Grid>
          </>
        {/* // ) : (
        //   <></>
        // )} */}
      </div>
    );
  };
  
  export default Header;
  