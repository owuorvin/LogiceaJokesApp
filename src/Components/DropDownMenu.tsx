import { Box, IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    zIndex: theme.zIndex.appBar + 2,
  },

  mainButton: {
    cursor: 'pointer',
  },
  mainButtonText: {
    color: theme.palette.grey[100],
    fontWeight: 900,
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  children: {
    width: '325px',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[6],
    position: 'absolute',
    // top: '35px',
    right: '0',
    zIndex: 1000,
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
  },
}));

function useOutsideClick(ref: any, action: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, action]);
}

type DropDownItems = {
  name: any;
  children: any;
  mainButtonClasses: any;
  // eslint-disable-next-line react/require-default-props
  rest?: any | null;
};

function DropDownMenu({
  name,
  children,
  mainButtonClasses,
  rest,
}: DropDownItems) {
  const wrapperRef = useRef(null);

  const classes = useStyles();
  const [itemsVisible, setItemsVisible] = useState(false);
  useOutsideClick(wrapperRef, () => {
    setItemsVisible(false);
  });

  const handleItemsVisibility = () => {
    setItemsVisible(!itemsVisible);
  };

  return (
    <div className={classes.container} ref={wrapperRef}>
      <IconButton
        className={mainButtonClasses}
        color="secondary"
        {...rest}
        onClick={handleItemsVisibility}
      >
        {typeof name === 'function' ? name() : name}
      </IconButton>
      {itemsVisible ? (
        <Box className={classes.children}>{children}</Box>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropDownMenu;
