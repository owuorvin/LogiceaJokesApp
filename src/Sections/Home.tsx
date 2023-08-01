/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles } from "@mui/styles";
import { CreateOutlined } from "@mui/icons-material";
import LoadingSpinner from "../Components/LoadingSpinner";
import PageContent from "../Components/pageContent";
import Table from "../Components/Table";
import TableLink from "../Components/TableLink";
import React, { useEffect, useState } from "react";
import {
  DataTableAction,
  DataTableColumn,
  DataTableRow,
} from "../utils/types";
import useFetch from "../utils/useFetch";
import { User } from "./home-logic/homeSlice";
import moment from "moment";
import { Box, Button, Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateEditJokesForm from "./CreateEditJokesForm";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    name: {
      textTransform: "capitalize",
    },
    formField: {
      marginLeft: '4px',
      marginTop: '30px',
      [theme.breakpoints.down('md')]: {
        width: '20%',
        alignContent: 'center ',
      },
  },
  searchBox: {
    padding: theme.spacing(2, 0),
    width: "99%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

}));

type Props = {
  roleName?: string;
  roleId?: string;
  userTypeCode?: string;
};
const UsersList: React.FC<Props> = ({
  userTypeCode
}: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User>();
  const [editing, setEditing] = useState(false);
  const history = useNavigate();
  const [value, setValue] = React.useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
     // useFetch(`/${subset}`, `fetchBreeds-${subset}`);
      const {
        data,
        isLoading,
        isError,
        error,
        isRefreshing,
        isSuccess
      } = useFetch(`/jokes`, ["jokes", ]);

    const list= data?.map((item: { typeOfService: any; }) =>item.typeOfService)
    let service = new Set(list);

    const[updatedData, setUpdatedData] = useState([]);
    let optionsData;
    (value?.length <=0 || value ==null)? 
    optionsData=data?.data || data || [] :
    optionsData=data.filter((data:any) => data.typeOfService?.includes(value));


  const handleEditRow = (row: any) => {
    setUser(row);
    setEditing(true);
  };

  const actions: DataTableAction[] = [];

  const columns: DataTableColumn[] = [
    {
      id: "title",
      label: "Title",
      minWidth: 150,
      format: (value: any, row: any) => (
        <TableLink path={`/jokesform/${row.id}`} >
          {value}
        </TableLink>
      ),
    },
    {
      id: "author",
      label: "Author",
      format: (value: any) =>value?.toLowerCase() || "-"
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 50,
      format: (value: any)=> moment(value)?.format("DD-MM-YYYY"),
    },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 50,
    },
    {
      id: "views",
      label: "Views",
      minWidth: 150,
      format: (value: any)=>{
        return <span style={{color: value >0 && value <=25 ? "tomato" 
        : value >=26 && value <=50 ? "orange" 
        : value >=51 && value <=75 ? "yellow"
        : value >=76 && value <=100 ? "green" : ""  }}>{value}</span>;
      },
      },  
  ];

const rows: DataTableRow[] = isSuccess
? userTypeCode
  ?updatedData
  : updatedData
: [];


const [searched, setSearched] = useState<string>("");

useEffect(()=>{
  (value?.length <=0 || value ==null)? 
    setUpdatedData(data?.data || data || [])
    : setUpdatedData(data.filter((data:any) => data.typeOfService.includes(value)))

},[value || query || []])

const handleClickNewBtn = () => {
  setOpenNew(true);
  setIsEdit(false);
  history("/jokesform");
};

  return (
    <PageContent>
      <div className={classes.root}>

        {isLoading ? <LoadingSpinner /> : <></>}

      {isSuccess ? (
        <>
      {openNew ? (<>
        <CreateEditJokesForm setEdit={setIsEdit} isEdit={isEdit} />
      </>):(<></>)}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleClickNewBtn}
            style={{ margin: 10, backgroundColor: 'green', color: 'white' }}
          >
            ADD NEW JOKE
          </Button>
        </Box>
      </div>
          <Table
            columns={columns}
            rows={rows?.map((r, index) => ({ ...r, number: index + 1 }))}
            actions={actions}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            pageCount={data?.totalPage}
            rowColor={''}
          />
        {/* </>)} */}
        </>
      ) : ('<></>')}
      </div>
    </PageContent>
  );
};

UsersList.defaultProps = {
  roleName: undefined,
  roleId: undefined,
  userTypeCode: undefined,
};

export default UsersList;
