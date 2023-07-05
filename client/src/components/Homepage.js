import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
        navigate('/login');
        console.error('User not logged in');
        return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tutorials');
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/tutorials', { title, description });
      console.log('Success:', response.data);
      fetchData();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/tutorials/${id}`);
      console.log('Success:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <form onSubmit={handleCreate}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Homepage;
