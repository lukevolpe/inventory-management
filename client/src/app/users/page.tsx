'use client';

import { useGetUsersQuery } from '@/state/api';
import { Loader2 } from 'lucide-react';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loader2 className="flex justify-center items-center text-blue-500 animate-spin size-8" />
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className=" font-bold text-center text-red-600 py-4">
        Failed to fetch users
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
