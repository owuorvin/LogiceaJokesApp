import React,{useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link  from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles,createStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import {useNavigate, Link as Links} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Flip } from "react-toastify";
import { useState } from 'react';
import useAuthFormStyles from "./authStyles";
import { setSelectedUser } from "./auth-logic/login-logic";
import { useAppDispatch } from '../../utils/hooks';
import { v4 as uuidv4 } from "uuid";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
       GARE VINCENT 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {

  const generateToken = () => {
    // Use uuidv4() to generate a random UUID (Universally Unique Identifier)
    const token: string = uuidv4();
    return token;
  };

const navigate = useNavigate();
const classes = useStyles();
const classes2 = useAuthFormStyles();
const [email, setEmail]=useState<string>("gare@gmail.com");
const [password, setPassword]=useState<string>("Gare@123")
const [ message, setMessage]= useState<string>("");
const dispatch = useAppDispatch();
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  if (email === "gare@gmail.com" && password === "Gare@123") {
    toast.success("Successfully logged in", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: 0,
      toastId: "my_toast",
    });

    setMessage("");

    const randomToken = generateToken();
    const responseData = {
      jwtToken: randomToken,
    };
    dispatch(setSelectedUser(responseData));
    sessionStorage.setItem("auth", randomToken);
      navigate("/dashboard");

  } else {
    setMessage("Provide correct email and password");
  }
};
const handleEmail=(event:any)=>{
setEmail(event.target.value);
setMessage("");
}
const handlePassword=(event:any)=>{
    setPassword(event.target.value);
    setMessage("");
}

  return (
    <div className={classes2.root}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(event:any)=>handleEmail(event)}
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
               style={{ flexGrow: 1 }}
               variant="outlined"
               color="secondary"
            margin="normal"
            required
            onChange={(event:any)=>handlePassword(event)}
            value={password}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"   
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            onClick={(event:any)=>handleSubmit(event)}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Box mt={8} style={{marginTop:10}} >
    <Typography color="text.primary" align="center" sx={{ color: 'error.main' }}>
      {message}
    </Typography>       
          </Box>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}
