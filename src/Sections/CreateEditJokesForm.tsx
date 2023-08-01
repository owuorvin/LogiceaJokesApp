import {
    Grid,
    TextField,
    Theme,
    Button,
    Stack,
    Card,
  } from "@mui/material";
  import { createStyles, makeStyles } from "@mui/styles";
  import { Alert } from "@mui/lab";

  import React, { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { useQueryClient } from "react-query";
  import { ErrorType } from "../utils/types";
  import usePostRequest from "../utils/usePostRequest";
  import { useNavigate } from "react-router";
  import { useParams } from "react-router-dom";
  import useFetch from "../utils/useFetch";
  import api from "../api";
  interface ResponseData {
    // Define the properties of the response data
    // Add properties according to the actual response data structure
  }
  
  interface ErrorResponse {
    // Define the properties of the error response
    // Add properties according to the actual error response structure
  }
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
      },
      inputStyle: {
        width: 400,
        marginBottom: theme.spacing(2),
      },
      autoComplete: {
        marginBottom: theme.spacing(1),
      },
      main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        zIndex: theme.zIndex.appBar - 1,
        outline: "none",
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "1fr",
      },
      paper: {
        padding: theme.spacing(2),
        width: "60%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: "black !important",
        fontFamily: "ChronicaPro, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
      },
      formCustomTitle: {
        fontWeight: 700,
        color: "#449afe",
        fontSize: "1.3rem",
        fontFamily: "ChronicaPro, sans-serif",
        width: 400,
      },
      CustomTitle: {
        fontWeight: 700,
        color: "#022c5b",
        fontSize: "1.0rem!important",
        fontFamily: "ChronicaPro, sans-serif",
        width: 400,
      },
      inputLabel: {
        "&.focused": {
          color: "#449afe",
        },
        color: "#449afe",
      },
      errorText: {
        color: "red",
        fontSize: "small",
      },
    })
  );

  type CreateUserProps = {
  setEdit: (value: boolean) => void;
  isEdit: boolean;
  };
  
  function CreateEditJokesForm({
    setEdit,
    isEdit
  }: CreateUserProps) {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const { id }: any = useParams();
    
    const {
      data,
      isLoading,
      isError,
      error,
      isRefreshing,
      isSuccess
    } = useFetch(`jokes/${id}`, ["joke", ]);
  
    const [openSnack, setOpenSnack] = useState(true);
  
    const [author, setAuthor] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [views, setViews] = useState<string>("");
     const [createdAt,setCreatedAt] =useState<string>("");
    const [body, setBody] = useState<string>("");
    const { handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [postError, setPostError] = useState<false | ErrorType>(false);
    
    useEffect(()=>{
       setViews(isEdit ? data?.views : "");
       setBody(isEdit ?  data?.body : "");
       setAuthor(isEdit ?  data?.author : "");
       setTitle(isEdit ?  data?.title : "");
       setCreatedAt(isEdit ? data?.createdAt : "");
    },[data,isEdit])

    const onSuccess = ({ data }: any) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("Tickets"),
        
      });
      navigate("/dashboard");
    };
  
    const onFailure = (err: ErrorType) => {
      setPostError(err);
    };

    const handleChange = (event:any) => {
      const { name, value } = event.target;
      switch (name) {
        case 'author':
          setAuthor(value);
          break;
        case 'title':
          setTitle(value);
          break;
        case 'views':
          setViews(value);
          break;
        case 'body':
          setBody(value);
          break;
        default:
          break;
      }
    };
    const currentDate = new Date();

    // Get the current year, month, and day
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const currentDay = currentDate.getDate();
    
    // Format the current date in YYYY-MM-DD format
    const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;

    
    const mutation = usePostRequest(
      "jokes",
      {
        author,
        title,
        views,
        body,
        createdAt: formattedDate
      },
      onSuccess,
      onFailure
    );
  
    const onSubmit = () => {
      mutation.reset();
      mutation.mutate();
    };
  

    const handleDelete = async (): Promise<void> => {
      const url = `jokes/${id}`;
      try {
       
  const payload = { id: id };
        const responses: ResponseData = await api.post(url, payload);
    
        const onSuccess = (data: ResponseData): void => {
          // Handle the success response
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes("Jokes"),
          });
          navigate("/dashboard");
        };
        onSuccess(responses);
      } catch (error: any) {
        const onFailure = (error: ErrorResponse): void => {
          // Handle the error response
        };
    
        onFailure(error);
      }
    };
  
    return (
      <div> 
        <div className={classes.grid}>
          {postError ? (
            <Alert severity="error" className="error-container">
              {postError?.message}
            </Alert>
          ) : (
            <></>
          )}
  <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Card sx={{ p: 3, mt:5,ml:5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
            <TextField
              name="author"
              label="Author"
              value={author}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
                style: { position: 'absolute', backgroundColor: '#FFF', padding: '0 4px' },
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="title"
              label="Title"
              value={title}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
                style: { position: 'absolute', backgroundColor: '#FFF', padding: '0 4px' },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="views"
              label="Views"
              type="number"
              value={views}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
                style: { position: 'absolute', backgroundColor: '#FFF', padding: '0 4px' },
              }}
              fullWidth
              required
            />
          </Grid>
         
          
              </Grid>
            </Card>
            </Stack>
          </Grid>
  
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Card sx={{ p: 3, mt:5,mr:5 }}>
              <Grid container spacing={3}>

          <Grid item xs={12} sm={12}>
            <TextField
              name="body"
              label="Message Body"
              value={body}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: { position: 'absolute', backgroundColor: '#FFF', padding: '0 4px' },
              }}
            />
          </Grid>
           </Grid> 
          </Card>   

             <Grid item xs={12} sm={10}> 
              <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                color="secondary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            {isEdit ? ( 
              <Button
                variant="contained"
                onClick={handleDelete}
                color="primary"
                type="submit"
                fullWidth
              >
                Delete
              </Button>
             ):(<></>)}
            </Stack>
            </Grid>
            </Stack>

          </Grid>
        </Grid>
  
        </div>
      </div>
    );
  }
  
  CreateEditJokesForm.defaultProps = {
    setEditError: false,
    setEditLoading: false,
  };
  
  export default CreateEditJokesForm;
  