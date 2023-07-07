import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the date picker


const Reports = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
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
      const response = await axios.get('http://localhost:8080/routes/get');
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/routes/create', { title, description });
      console.log('Success:', response.data);
      fetchData();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setEditId(id);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/routes/update/${editId}`, { title, description });
      console.log('Success:', response.data);
      fetchData();
      setTitle('');
      setDescription('');
      setEditId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/routes/delete/${id}`);
      console.log('Success:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="homepage-container">
      <h1 className="page-title">Generate Reports</h1>
      <form onSubmit={editId ? handleUpdate : handleCreate} className="form-section">
        <div className="date-picker-container">
          <div className="date-picker-label">Start Date:</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input"
          />
        </div>
        <div className="date-picker-container">
          <div className="date-picker-label">End Date:</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Filter Records
        </button>
      </form>

      <table className="table-container">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleEdit(item.id)} className="action-button-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="action-button-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Reports;