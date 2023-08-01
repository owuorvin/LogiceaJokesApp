import { Grid, List, Typography, Theme} from "@mui/material";
import { createStyles, makeStyles  } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import useCheckPermissions from '../services/auth/auth-logic/useCheckPermissions';
import ROTES, { RouteType } from "../nav/routeInfo";
import { useAppSelector } from "../utils/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      borderRight: "1px solid #ccc",
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(1, 0),
      minHeight: "93vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
    },

    feedbackLink: {
      position: "absolute",
      width: "100%",
      bottom: 0,
    },
  })
);

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const[permission,setPermission]=useState<any[]>(
    [sessionStorage.getItem('role')]
  )
  console.log("permission",permission);
  return (
    <div>
    <List className={classes.root}>
      {ROTES.filter((r) => r.showOnNav)
        // .filter((r) => useCheckPermissions(r.permission).isAuthorised)
        .map((route: RouteType) => (
          <SidebarItem key={route.path} {...route} />
        ))}

      <div className={classes.feedbackLink}>
        <SidebarItem key="feedback-link" {...ROTES[ROTES.length - 1]} />
      </div>
    </List>
    </div>
  );
};

const useSidebarItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarItem: {
      width: "100%",
      height: "45px",
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      textDecoration: "none",
      color: theme.palette.text.primary,
      borderLeftWidth: "5px",
      borderLeftStyle: "solid",
      borderColor: theme.palette.common.white,
      cursor: "pointer",
    },
    active: {
      backgroundColor: "#0000000F",
      borderColor: theme.palette.primary.main,
      color: theme.palette.common.black,
    },

    activeIcon: {
      color: theme.palette.primary.main,
    },

    name: {
      textTransform: "capitalize",
      fontWeight: 500,
      flex: 1,
      marginLeft: "15px",
    },
  })
);

const SidebarItem: React.FC<RouteType> = ({
  path,
  name,
  icon: Icon,
}: RouteType) => {
  const classes = useSidebarItemStyles();
  const location = useLocation();
  const history = useNavigate();
  const { sidebarCollapsed } = useAppSelector((state) => state.settings);

  const isActive = (routePath: string) =>
    location.pathname.startsWith(routePath);

  return (
    <Grid
      title={name}
      item
      key={path}
      onClick={() => history(path)}
      classes={{ root: classes.sidebarItem }}
      className={isActive(path) ? classes.active : ""}
      style={{
        justifyContent: sidebarCollapsed ? "center" : "space-between",
      }}
    >
      <Icon classes={{ root: isActive(path) ? classes.activeIcon : "" }} />

      <Typography
        style={{ display: sidebarCollapsed ? "none" : "inline" }}
        className={classes.name}
      >
        {name}
      </Typography>
    </Grid>
  );
};

export default Sidebar;
