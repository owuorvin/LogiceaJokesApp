import { createStyles, makeStyles } from "@mui/styles";
import {Theme} from "@mui/material"
import React, { ReactChild } from "react";
// import useCheckPermissions from 'services/auth/auth-logic/useCheckPermissions';
// import { useSilentRefresh } from '../../services/auth/auth-logic/useSilentRefresh';
import { useAppSelector } from "../utils/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      margin: 0,
      width: "100%",
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
  })
);
type LayoutProps = {
  children: ReactChild;
};
const DefaultLayout = ({ children }: LayoutProps) => {
  // REFRESH TOKEN
 // useSilentRefresh();

  // const { isAuthenticated } = useCheckPermissions('');
  const classes = useStyles();

  // eslint-disable-next-line no-nested-ternary
  const sidebarWidth =  0;
  return (
    <div>
      <Header />
      <div className={classes.root}>
        {/* {isAuthenticated ? (
          <></>
        ) : ( */}
        {/* )} */}
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
    </div>
  );
};

export default DefaultLayout;
