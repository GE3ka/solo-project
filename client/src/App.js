
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import {  Route, Routes } from 'react-router-dom';
import AddJob from './components/AddJob';
import DisplayOne from './components/DisplayOne';
import Edit from './components/EditJob';
import { UserProvider } from './components/userContext';

function App() {
  
 
  return (
    <UserProvider>
    <div className="App">
      <Routes >              
        <Route path="/" element={<Register/>} />            
        <Route path = "/login" element={<Login/>} />
        <Route path = "/dashboard" element={<Dashboard/>} />
        <Route path = "/dashboard/:id" element={<Dashboard/>} />
        <Route path = "/dashboard/addJob" element={<AddJob/>}/>
        <Route path = "/dashboard/jobs/view/:id" element={<DisplayOne/>}/>
        <Route path = "/dashboard/jobs/edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
