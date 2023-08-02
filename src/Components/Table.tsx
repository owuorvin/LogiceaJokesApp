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
import {  DataTableColumn, DataTableRow } from "../utils/types";
import CustomTablePagination from "./CustomTablePagination";
import EmptyList from "./EmptyList";

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
  onSort: (field: string) => void;
  filterValue: string;
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
  sortField: string;
  sortDirection: "asc" | "desc";
  setSortDirection: Function;
  setSortField: Function;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
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
  filterValue,
  onSort,
  sortField,
  sortDirection,
  setSortDirection,
  setSortField
}: DataTableProps) => {
  const classes = useStyles();

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };


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

 const getSortIndicator = (field: string) => {
  if (field === sortField) {
    return sortDirection === "asc" ? "↑" : "↓";
  }
  return null;
};

  const visibleRows = React.useMemo(() => {
    const filteredRows = !filterValue
      ? rows
      : rows.filter((row) =>
          row.typeOfService?.includes(filterValue)
        );

    if (sortField && filteredRows.length > 0) {
      filteredRows.sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    const startIndex = (page - 1) * rowsPerPage;
    return filteredRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filterValue, sortField, sortDirection, rows, page, rowsPerPage]);

  return (
    <Paper className={classes.root}>
      <>
      <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" className={classes.overrides}>
            <TableHead>
              <TableRow>
                {isSelectable ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        !!numSelected && numSelected > 0 && numSelected < rows.length
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
                      cursor: column.sort ? "pointer" : "default", // Show pointer cursor on sortable columns
                    }}
                    onClick={() => column.sort && handleSort(column.id)}
                  >
                    <div style={{ display: column.icon ? "flex" : "" }}>
                      {column.label} {column.sort && getSortIndicator(column.id)}
                      {column.icon ? column.icon() : <></>}
                    </div>

                    {column.filter && column.filter}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isSelected =
                  !!(isItemSelected && uniqueItem) &&
                  !!isItemSelected(row[uniqueItem]);
                let color;
                row.typeOfService === "MEDICATION" ? (color = "#99C68E") : (color = "");

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={uniqueId()}
                    style={{
                      backgroundColor: `${color}`,
                      color: "white",
                    }}
                  >
                    {isSelectable ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          inputProps={{ "aria-labelledby": uniqueItem }}
                          onChange={(event: any) =>
                            handleClick && uniqueItem && handleClick(event, row[uniqueItem])
                          }
                        />
                      </TableCell>
                    ) : (
                      <> </>
                    )}
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className={classes.cell} key={uniqueId()} align={column.align || "left"}>
                          {column.format ? column.format(value, row) : value || "-"}
                        </TableCell>
                      );
                    })}
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
