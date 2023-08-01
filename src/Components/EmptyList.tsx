import { Typography, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { NotListedLocationOutlined } from '@mui/icons-material';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(5, 3),
      zIndex: theme.zIndex.appBar - 2,
    },
    title: {
      fontWeight: 800,
      color: theme.palette.common.black,
      fontSize: '2rem',
    },
    subtitle: {
      color: theme.palette.grey[500],
      fontSize: '1.2rem',
    },
    icon: {
      fontSize: '10rem',
      color: theme.palette.primary.dark,
    },
    message: {
      fontWeight: 800,
      padding: theme.spacing(2),
    },
  }),
);

type Props = {
  message?: string;
};
const EmptyList: React.FC<Props> = ({ message }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NotListedLocationOutlined className={classes.icon} />
      <Typography className={classes.subtitle}>Nothing to see here.</Typography>
      {message ? (
        <Typography className={classes.message}>{message}</Typography>
      ) : (
        <></>
      )}
    </div>
  );
};

EmptyList.defaultProps = {
  message: '',
};
export default EmptyList;
