// Importing necessary modules and components
import axios from 'axios'; // Importing axios for making HTTP requests
import React, { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import { useNavigate, useParams } from 'react-router-dom'; // Importing useNavigate and useParams hooks from react-router-dom
import { useUser } from './userContext'; // Importing useUser hook from userContext.js

// Edit component responsible for editing job postings
const Edit = () => {
    const navigate = useNavigate(); // Getting navigate function for programmatic navigation
    const { id } = useParams(); // Getting id parameter from the URL
    const [errors, setErrors] = useState([]); // State variable to store errors
    const [title, setTitle] = useState(""); // State variable to store job title
    const [description, setDescription] = useState(""); // State variable to store job description
    const [location, setLocation] = useState(""); // State variable to store job location
    const { user, setUser } = useUser(); // Getting user context using useUser hook

    // Effect hook to fetch job details when the component mounts
    useEffect(() => {
        axios.get("http://localhost:5000/api/jobs/view/" + id) // Fetching job details by ID
            .then(res => {
                setTitle(res.data.title); // Setting title state variable with fetched title
                setDescription(res.data.description); // Setting description state variable with fetched description
                setLocation(res.data.location); // Setting location state variable with fetched location
            })
            .catch(err => console.log(err)); // Handling errors
    }, [id]); // Dependency array to re-run effect when id changes

    // Function to handle form submission for updating job
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Making a PATCH request to update the job
        axios.patch(`http://localhost:5000/api/jobs/edit/${id}`, { title, description, location })
            .then(res => {
                navigate("/dashboard/jobs/view/" + id); // Navigate to the view page of the edited job
            })
            .catch(err => {
                console.log(err); // Logging errors
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr); // Set errors state variable
            });
    };

    // Function to handle logout
    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout') // Making a POST request to logout
            .then(response => {
                console.log('Logged out successfully'); // Logging successful logout
                localStorage.removeItem('user'); // Removing user data from localStorage
                localStorage.removeItem('myJobs'); // Removing myJobs data from localStorage
                setUser(null); // Setting user context to null
                navigate("/"); // Navigate to the home page
            })
            .catch(error => {
                console.error('Error logging out:', error); // Logging error while logging out
            });
    };

    // JSX representing the edit job form
    return (
        <>
            <div className="container-fluid min-vh-100 d-flex flex-column">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <span className="navbar-brand">Edit your job posting</span>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light me-2" onClick={handleLogout}>Logout</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light" onClick={() => navigate('/dashboard')}>Back</button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container d-flex justify-content-center align-items-center mt-5">
                    <div style={{ width: '400px' }}>
                        <form onSubmit={submitHandler}>
                            <div className="mb-3 row">
                                <label htmlFor="title" className="col-sm-3 col-form-label text-white">Title:</label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Similar form fields for description and location */}
                            {errors.map((err, index) => (
                                <p style={{ color: 'red' }} key={index}>{err}</p>
                            ))}
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-secondary" style={{ width: '150px' }}>Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit; // Export
