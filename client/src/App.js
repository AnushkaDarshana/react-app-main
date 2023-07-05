import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/Registration';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <Register /> 
        <Login />
      </header>
    </div>
  );
}

export default App;
