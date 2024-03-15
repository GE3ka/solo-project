// Importing necessary modules and components
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { useState } from 'react'; // Importing useState hook from React
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom for programmatic navigation

const Register = () => {
    // Defining state variables and functions to update them
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate(); // Getting navigate function for programmatic navigation

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Making a POST request to register a new user
        axios.post('http://localhost:5000/api/register', { firstName, lastName, email, password, confirmPassword })
            .then(result => {
                console.log(result); // Logging the result
                if (result.data.msg === "Already registered") {
                    navigate('/login'); // Navigate to login page if user is already registered
                } else {
                    navigate('/login'); // Navigate to login page after successful registration
                }
            })
            .catch(err => console.log('Error:', err)); // Handling errors
    }

    // JSX representing the registration form
    return (
        <div>
            <h1 className="text-center mb-4 welcome-heading">Welcome to Chores Tracker</h1>
            <div className="d-flex justify-content-center align-items-center text-center vh-100">
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields for user input */}
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputName" className="form-label">
                                <strong>First Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control"
                                id="exampleInputName"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        {/* Similar form fields for last name, email, password, and confirm password */}
                        {/* Each field updates the corresponding state variable on change */}
                        {/* Submit button to register */}
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    {/* Link to the login page */}
                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register // Exporting the Register component
