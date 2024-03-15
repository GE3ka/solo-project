// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importing hooks from react-router-dom for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import { useCookies } from 'react-cookie'; // Importing useCookies hook from react-cookie for managing cookies

const DisplayOne = () => {
    // Retrieving job ID from URL parameters
    const { id } = useParams();
    const navigate = useNavigate(); // Getting navigate function for programmatic navigation
    const [title, setTitle] = useState(""); // State variable to store job title
    const [description, setDescription] = useState(""); // State variable to store job description
    const [location, setLocation] = useState(""); // State variable to store job location
    const [createdAt, setCreatedAt] = useState(""); // State variable to store job creation date
    const [postedBy, setPostedBy] = useState(""); // State variable to store name of the user who posted the job
    const [cookies, setCookie] = useCookies(['token']); // Getting cookies and setCookie function from useCookies hook

    // Fetching job details from the server upon component mount
    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs/view/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}` // Sending authorization token in the request header
            }
        })  
        .then(res => {
            setTitle(res.data.title); // Setting job title
            setDescription(res.data.description); // Setting job description
            setLocation(res.data.location); // Setting job location

            // Formatting createdAt date to look nicer
            const formattedDate = new Date(res.data.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            setCreatedAt(formattedDate); // Setting formatted creation date

            // Fetching user information based on the user ID associated with the job
            axios.get(`http://localhost:5000/api/users/${res.data.userId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}` // Sending authorization token in the request header
                }
            })  
            .then(userRes => {
                setPostedBy(userRes.data.firstName); // Setting name of the user who posted the job
            })
            .catch(err => console.log(err)); // Handling errors
        })
        .catch(err => console.log(err)); // Handling errors
    }, [id, cookies.token]); // Dependency array ensures useEffect runs only when 'id' or 'cookies.token' changes

    // Function to handle user logout
    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout') // Making a POST request to logout endpoint
        .then(response => {
            console.log('Logged out successfully');
            navigate("/"); // Navigating to home page after logout
        })
        .catch(error => {
            console.error('Error logging out:', error); // Handling errors
        });
    };

    // JSX representing the job details display
    return (
        <>
            {/* Navigation bar */}
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid justify-content-end">
                        <ul className="navbar-nav">
                            {/* Button to logout */}
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light me-2" onClick={handleLogout}>Logout</button>
                            </li>
                            {/* Button to navigate back to dashboard */}
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light" onClick={() => navigate('/dashboard')}>Back</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            {/* Displaying job details */}
            <div className="container mt-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5> {/* Displaying job title */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{description}</li> {/* Displaying job description */}
                                <li className="list-group-item">Location: {location}</li> {/* Displaying job location */}
                                <li className="list-group-item">Posted on: {createdAt}</li> {/* Displaying job creation date */}
                                <li className="list-group-item">Posted by: {postedBy}</li> {/* Displaying user who posted the job */}
                            </ul>
                            {/* Button to add job to user's list */}
                            <div className="card-body">
                                <button className="btn btn-secondary" onClick={() => navigate('/dashboard/' + id)}>Add To My Jobs</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayOne; // Exporting the DisplayOne component
