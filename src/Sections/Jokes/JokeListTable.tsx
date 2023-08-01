import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';

interface Joke {
    title: string;
    author: string;
    createdDate: string; // Consider using a Date object if you need to perform date comparisons
    views: number;
  }

interface JokeListProps {
  jokes: Joke[];
}

const JokeList: React.FC<JokeListProps> = ({ jokes }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState<'views' | 'createdDate'>('views');

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number; // Explicitly cast the value to a number
    setRowsPerPage(value);
    setCurrentPage(0); // Reset to the first page when changing rows per page
  };
  
  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const sortedJokes = [...jokes].sort((a, b) => {
    if (sortOption === 'views') {
      return b.views - a.views;
    } else {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    }
  });

  const paginatedJokes = sortedJokes.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Views</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJokes.map((joke) => (
              <TableRow key={joke.title}>
                <TableCell>{joke.title}</TableCell>
                <TableCell>{joke.author}</TableCell>
                <TableCell>{joke.createdDate}</TableCell>
                <TableCell>{joke.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <MenuItem value={5}>5 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
        </Select>
        <Button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={(currentPage + 1) * rowsPerPage >= sortedJokes.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JokeList;
