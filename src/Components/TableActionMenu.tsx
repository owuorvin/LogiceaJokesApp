import { Popover, Theme,IconButton,Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import React from "react";
// import useCheckPermissions from 'services/auth/auth-logic/useCheckPermissions';
import { DataTableAction } from "../utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuItem: {
      minWidth: 200,
      margin: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[100],
      borderRadius: "3px",
      "&:hover": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.grey[700],
      },
    },
    menuItemNoIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    menuItemWithIcon: {
      display: "grid",
      gridTemplateColumns: "50px 1fr",
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontWeight: 800,
      fontSize: "0.95rem",
    },
    unstyledButton: {
      textTransform: "none",
      background: "none",
      "&:hover": {
        background: "none",
      },
    },
  })
);
type Props = {
  actions: DataTableAction[];
  // eslint-disable-next-line no-undef
  entryBtn?: undefined | (() => JSX.Element);
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (value: any) => void;
  data?: any;
};

const TableActionMenu: React.FC<Props> = ({
  actions,
  entryBtn,
  disabled,
  data,
  handleClick,
}: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const getAllowedActions = () => actions;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    handleClick && handleClick(data);
  };

  const handleClickAction = (action: DataTableAction) => {
    action.onClick(action.data);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderEntryButton = () => {
    if (!entryBtn) {
      return (
        <IconButton disabled={disabled} size="small" onClick={handleOpen}>
          <MoreVert />
        </IconButton>
      );
    }

    return (
      <Button
        onClick={handleOpen}
        disabled={disabled}
        className={classes.unstyledButton}
      >
        {entryBtn()}
      </Button>
    );
  };

  return (
    <>
      {renderEntryButton()}

      <Menu
        className={classes.root}
        id="fade-menu"
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {getAllowedActions().map((b) => (
          <MenuItem
            classes={{ root: classes.menuItem }}
            className={
              b.icon ? classes.menuItemWithIcon : classes.menuItemNoIcon
            }
            key={b.label}
            onClick={() => {
              handleClickAction(b);
            }}
            disabled={b.disabled}
          >
            {b.icon ? <span className={classes.icon}>{b.icon()}</span> : <></>}
            <span className={classes.label}>{b.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

TableActionMenu.defaultProps = {
  entryBtn: undefined,
  disabled: false,
  data: {},
  handleClick: undefined,
};
export default TableActionMenu;
