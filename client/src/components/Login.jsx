// Importing necessary modules and components
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { useState } from 'react'; // Importing useState hook from React
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom for programmatic navigation
import { useUser } from './userContext'; // Importing useUser hook from userContext.js for managing user state
import { useCookies } from 'react-cookie'; // Importing useCookies hook from react-cookie for managing cookies

const Login = () => {
    // Defining state variables and functions to update them
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Getting navigate function for programmatic navigation
    const [error, setError] = useState(""); // State variable to store error messages
    const { setUser } = useUser(); // Getting setUser function from useUser hook
    const [cookies, setCookie] = useCookies(['user']); // Getting cookies and setCookie function from useCookies hook

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Making a POST request to login
        axios.post('http://localhost:5000/api/login', { email, password })
            .then(result => {
                if (result.data.msg === "success!") {
                    const userData = result.data.user; // Extracting user information from response
                    const token = result.data.token; // Extracting token from response
                    setUser(userData); // Setting user data in context
                    setCookie('token', token); // Setting token in cookie
                    localStorage.setItem('user', JSON.stringify(userData)); // Storing user data in local storage
                    localStorage.setItem('token', token); // Storing token in local storage
                    navigate('/dashboard'); // Navigating to dashboard after successful login
                } else {
                    setError("Something went wrong"); // Setting error message if login is unsuccessful
                }
            })
            .catch(err => {
                setError(err.response.data.msg || "Something went wrong"); // Setting error message if login fails
            });
    }

    // JSX representing the login form
    return (
        <div>
            <h1 className="text-center mb-4 welcome-heading">Welcome to Chores Tracker</h1>
            <div className="d-flex justify-content-center align-items-center text-center vh-100">
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields for user input */}
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {/* Similar form field for password */}
                        {/* Submit button to login */}
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {/* Display error message if login fails */}
                    <p>{error}</p>
                    <p className='container my-2'>Don't have an account?</p>
                    {/* Link to the registration page */}
                    <Link to='/' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login; // Exporting the Login component
