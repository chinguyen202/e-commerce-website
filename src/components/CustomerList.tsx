import { ChangeEvent, useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableBody,
  Typography,
} from '@mui/material';
import useAppSelector from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchAllUsers } from '../store/store';

const CustomerList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const users = useAppSelector((state) => state.user.users);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [users, dispatch]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const customers = users.filter((customer) => customer.role === 'customer');
  const displayedUsers = customers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', mt: '2rem', mb: '2rem' }}
      >
        List of customers
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.2rem' }}>ID</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>Email</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontSize: '1.2rem' }}>{user.id}</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>{user.name}</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: '1.2rem' }}>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomerList;
