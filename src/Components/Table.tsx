import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { createStyles, makeStyles } from "@mui/styles";
import {Theme} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { uniqueId } from "lodash";
import React from "react";
// import useCheckPermissions from 'services/auth/auth-logic/useCheckPermissions';
import { DataTableAction, DataTableColumn, DataTableRow } from "../utils/types";
import CustomTablePagination from "./CustomTablePagination";
import EmptyList from "./EmptyList";
import TableActionMenu from "./TableActionMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "99%",
      border: `1px solid ${theme.palette.grey[300]}`,
      boxShadow: "none",
    },
    container: {
      maxHeight: 550,
    },
    cell: {
      fontSize: "0.8rem",
      //color: theme.palette.text.secondary,
      color: "pink"
    },
    headerCell: {
      fontSize: "0.9rem",
      fontWeight: 900,
      color: "pink"
    },
    tableCell: {
      "$hover:hover &": {
        color: "pink"
      }
    },
    overrides: {
      "& .MuiTableCell-body": {
        color: "black",
    },
    "& .MuiLink-root":{
     color: 'black',
    },
     }
  })
);

type DataTableProps = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  actions: DataTableAction[];
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
  // eslint-disable-next-line no-unused-vars
  setRowsPerPage: (rows: number) => void;
  rowsPerPage: number;
  page: number;
  pageCount?: number;
  isSelectable?: boolean;
  handleSelectAllClick?: any;
  handleClick?: any;
  numSelected?: number;
  // eslint-disable-next-line no-unused-vars
  isItemSelected?: (id: string) => boolean;
  uniqueItem?: string;
  rowColor?: string;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  actions,
  setPage,
  page,
  setRowsPerPage,
  rowsPerPage,
  pageCount,
  isSelectable,
  handleSelectAllClick,
  handleClick,
  isItemSelected,
  uniqueItem,
  numSelected,
  rowColor,
}: DataTableProps) => {
  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

 // const allowedActions = actions;

  const visibleRows = !pageCount
    ? rows.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    : rows;

  return (
    <Paper className={classes.root}>
      <>
        <TableContainer className={classes.container}>
          <Table
            //size={allowedActions.length ? "small" : "medium"}
            stickyHeader
            aria-label="sticky table"
            className={classes.overrides}
          >
            <TableHead>
              <TableRow>
                {isSelectable ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        !!numSelected &&
                        numSelected > 0 &&
                        numSelected < rows.length
                      }
                      checked={rows.length > 0 && numSelected === rows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                ) : (
                  <></>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={uniqueId()}
                    classes={{ root: classes.headerCell }}
                    className={classes.cell}
                    align={column.align || "left"}
                    style={{
                      minWidth: column.minWidth,   
                    }}
                  >
                    <div style={{ display: column.icon ? "flex" : "" }}>
                      {column.label}
                      {column.icon ? column.icon() : <></>}
                    </div>

                    {column.filter && column.filter}
                  </TableCell>
                ))}
                {/* {allowedActions.length > 0 ? ( */}
                  <TableCell
                    classes={{ root: classes.headerCell }}
                    className={classes.cell}
                    style={{ minWidth: 100 }}
                    key="actions"
                    align="center"
                  >
                    Actions
                  </TableCell>
                {/* // ) : (
                //   <></>
                // )} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isSelected =
                  !!(isItemSelected && uniqueItem) &&
                  !!isItemSelected(row[uniqueItem]);
                 let color;
                 row.typeOfService==="MEDICATION" ? (
                   color="#99C68E"
                 ): 
                 (
                   color=""
                 )
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={uniqueId()}
                    style={{
                      backgroundColor: `${color}`,
                      color:'white'
                    }}
                    //className={classes.overrides}
                    // onClick={(event) =>
                    //   handleClick &&
                    //   uniqueItem &&
                    //   handleClick(event, row[uniqueItem])
                    // }                  
                  >
                    {isSelectable ? (
                      <TableCell padding="checkbox" >
                        <Checkbox
                          checked={isSelected}
                          inputProps={{ "aria-labelledby": uniqueItem }}
                          onChange={(event: any) =>
                            handleClick &&
                            uniqueItem &&
                            handleClick(event, row[uniqueItem])
                          }
                        />
                      </TableCell>
                    ) : (
                      <> </>
                    )}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          className={classes.cell}
                          key={uniqueId()}
                          align={column.align || "left"}
                        
                        >
                          {column.format
                            ? column.format(value, row)
                            : value || "-"}
                        </TableCell>
                      );
                    })}
                    {/* {allowedActions.length > 0 ? ( */}
                      <TableCell
                        key={uniqueId()}
                        className={classes.cell}
                        style={{ minWidth: 100 }}
                        align="center"
                      >
                        <TableActionMenu
                          actions={actions.map((a) => ({ ...a, data: row }))}
                        />
                      </TableCell>
                    {/* ) : (
                      <></>
                    )} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length ? (
          <>
            <CustomTablePagination
              totalNumberOfRows={rows.length}
              page={page}
              pageCount={pageCount || Math.ceil(rows.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <></>
        )}
        {!rows.length ? (
          <EmptyList message="You may want to refine your filters" />
        ) : (
          <></>
        )}
      </>
    </Paper>
  );
};

DataTable.defaultProps = {
  pageCount: undefined,
  isSelectable: false,
  handleSelectAllClick: undefined,
  handleClick: undefined,
  isItemSelected: undefined,
  uniqueItem: "",
  numSelected: 0,
};

export default DataTable;
