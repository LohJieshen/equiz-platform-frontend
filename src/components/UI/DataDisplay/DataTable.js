import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState, useEffect} from 'react';

const DataTable = (props) => {

  const columns = props.columns;
  const [data, setData] = useState(props.rows)
  const rowKey = props.rowKey;

  useEffect(() => {
    setData(props.rows);
  }, [props.rows]);

  const columnsWithRender = columns.map((col) => ({
    ...col,
    renderCell: props.renderCell
}));

  return (
    <div style={{ height: '100%', width: '100%', maxHeight: '100vh', maxWidth: '100vw' }}>
      <DataGrid
        rows={data}
        columns={columnsWithRender}
        getRowId={(row) => row[rowKey]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;

  // TODO - Need to make column dynamic
  /*[
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      { field: 'age', headerName: 'Age', type: 'number', width: 90 },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },
    ];*/
    /*
    // Dummy data
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];*/