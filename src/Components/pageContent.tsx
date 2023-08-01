import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { ReactChild } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      height: '92vh',
    },
    header: {
      margin: 0,
      fontFamily: 'Roboto Bold',
    },
    copyright: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

type PageContentProps = {
  children: ReactChild | ReactChild[];
};

const PageContent = ({ children }: PageContentProps) => {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
};

export default PageContent;
