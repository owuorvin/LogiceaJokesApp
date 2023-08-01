import { createStyles, makeStyles } from '@mui/styles';
import {Theme} from '@mui/material'
import React, { ReactChild } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '0.9rem',
      color:'black',
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.palette.grey[800]}`,
      '&:hover': {
        color: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      },
    },
  }),
);

type Props = {
  path: string;
  children: ReactChild | ReactChild[];
};

const TableLink: React.FC<Props> = ({ path, children }: Props) => {
  const classes = useStyles();
  return (
    <NavLink className={classes.root}  to={path}>
      {children}
    </NavLink>
  );
};

export default TableLink;
