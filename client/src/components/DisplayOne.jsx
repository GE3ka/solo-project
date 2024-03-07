import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
 
 
import { useCookies } from 'react-cookie';
const DisplayOne = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [postedBy, setPostedBy] = useState("");   
    const [cookies, setCookie] = useCookies(['token']);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs/view/${id}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
            
        })  
            .then(res => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setLocation(res.data.location);

                // Format createdAt date to look nicer
                const formattedDate = new Date(res.data.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                setCreatedAt(formattedDate);

                // Fetch user information based on the user ID associated with the job
                axios.get(`http://localhost:5000/api/users/${res.data.userId}`, {
                    headers: {
                        Authorization: `${cookies.token}`
                    }
                })  

                    .then(userRes => {
                        setPostedBy(userRes.data.firstName); // Assuming you have a 'firstName' field in your user model
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [id, cookies.token]);

    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout') // Use the custom Axios instance
            .then(response => {
                console.log('Logged out successfully');
                navigate("/");
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <>

            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light me-2" onClick={handleLogout}>Logout</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-light" onClick={() => navigate('/dashboard')}>Back</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{description}</li>
                                <li className="list-group-item">Location: {location}</li>
                                <li className="list-group-item">Posted on: {createdAt}</li>
                                <li className="list-group-item">Posted by: {postedBy}</li>
                            </ul>
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

export default DisplayOne;
