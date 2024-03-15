// Importing necessary modules and components
import './App.css'; // Importing CSS styles
import Register from './components/Register'; // Importing Register component
import Login from './components/Login'; // Importing Login component
import Dashboard from './components/Dashboard'; // Importing Dashboard component
import { Route, Routes } from 'react-router-dom'; // Importing Route and Routes components from react-router-dom
import AddJob from './components/AddJob'; // Importing AddJob component
import DisplayOne from './components/DisplayOne'; // Importing DisplayOne component
import Edit from './components/EditJob'; // Importing Edit component
import { UserProvider } from './components/userContext'; // Importing UserProvider component from userContext.js

function App() {
  return (
    <UserProvider> {/* Providing user context to the entire application */}
      <div className="App"> {/* Main application container */}
        <Routes> {/* Defining routes */}
          <Route path="/" element={<Register/>} /> {/* Route for Register component */}
          <Route path="/login" element={<Login/>} /> {/* Route for Login component */}
          <Route path="/dashboard" element={<Dashboard/>} /> {/* Route for Dashboard component */}
          <Route path="/dashboard/:id" element={<Dashboard/>} /> {/* Route for Dashboard component with parameter */}
          <Route path="/dashboard/addJob" element={<AddJob/>} /> {/* Route for AddJob component */}
          <Route path="/dashboard/jobs/view/:id" element={<DisplayOne/>} /> {/* Route for DisplayOne component */}
          <Route path="/dashboard/jobs/edit/:id" element={<Edit/>} /> {/* Route for Edit component */}
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App; // Exporting the App component
