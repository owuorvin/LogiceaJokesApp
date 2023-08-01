import { createStyles, makeStyles } from "@mui/styles";
import {Theme} from "@mui/material";

const useAuthFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      padding: theme.spacing(3),
      width: "325px",
      borderRadius: "5px",
      alignSelf: "center",
      margin: "auto",
      boxShadow: theme.shadows[3],
      backgroundColor: "#fff",
      fontFamily: "Roboto",
      borderBottom: "8px solid #D84465",
    },
    heading: {
      FontSize: "24px",
      textAlign: "left",
    },
    inputStyle: {
      margin: theme.spacing(2, 0),
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "0.3em",
    },
    button: {
      width: "100%",
      backgroundColor: "#1A1D3F",
      color: "#fff",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#1A1D3F",
      },
      margin: theme.spacing(1, 0),
    },
    footerLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "15px",
      width: "fit-content",
      color: theme.palette.grey[800],
      textDecoration: "underline",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    helperText: {
      fontSize: "0.85rem",
      color: theme.palette.grey[600],
    },
  })
);

export default useAuthFormStyles;
