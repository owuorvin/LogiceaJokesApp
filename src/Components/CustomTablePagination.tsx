import { Box, MenuItem, Paper, Select,Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Pagination } from '@mui/lab';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    select: {},
    pagination: {},
  }),
);

type Props = {
  pageCount: number;
  page: number;
  rowsPerPage: number;
  totalNumberOfRows: number;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (event: unknown, newPage: number) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeRowsPerPage: (event: any) => void;
};
const CustomTablePagination: React.FC<Props> = ({
  page,
  pageCount,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  totalNumberOfRows,
}: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>Number of records:</Box>
      <Box style={{ fontWeight: 800 }} ml={0.5} mr={3}>
        {totalNumberOfRows}
      </Box>
      <Box>Rows per page:</Box>
      <Box ml={2} mr={2}>
        <Select
          color="secondary"
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
          id="rows-per-page-selector"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </Box>

      <Box>
        <Pagination
          color="secondary"
          count={pageCount}
          page={page}
          onChange={onChangePage}
          showFirstButton
          showLastButton
          defaultPage={1}
          boundaryCount={2}
        />
      </Box>
    </Paper>
  );
};

export default CustomTablePagination;
