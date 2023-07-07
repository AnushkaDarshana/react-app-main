import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Reports = () => {
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

    const fetchData = async() => {
        try {
            const response = await axios.get('http://localhost:8080/routes/get');
            setData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      if (startDate && endDate) {
        let endOfDay = new Date(endDate);
        endOfDay.setHours(23,59,59,999);
        return itemDate >= startDate && itemDate <= endOfDay;
      }
      return true;
    });
    const printDocument = () => {
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        }
        return true;
      });
  
      if (filteredData.length === 0) {
          alert('Table is empty!');
      } else {
          const input = document.getElementById('divToPrint');
          html2canvas(input)
              .then((canvas) => {
                  const imgData = canvas.toDataURL('image/png');
                  const pdf = new jsPDF();
                  pdf.addImage(imgData, 'JPEG', 0, 0);
                  pdf.save("download.pdf");
              });
      }
  }

  return (
    <div className="homepage-container">
      <h1 className="page-title">Generate Reports</h1>
      <form onSubmit="" className="form-section">
        <div className="date-picker-container">
          <div className="date-picker-label">Start Date:</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input"
          />
          <div className="date-picker-label">End Date:</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate && new Date(new Date(startDate).setDate(startDate.getDate() + 1))}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input"
          />
        </div>
      </form>
      <div id="divToPrint">
        <table className="table-container">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <a href="./homepage" className="back-button">Go Back</a>
        <button className="back-button" onClick={printDocument}>Print</button>
    </div>

        </div>
    );
};

export default Reports;