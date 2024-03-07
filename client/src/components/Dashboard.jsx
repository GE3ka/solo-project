import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from './userContext';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const addJobToMyJobs = (jobObject) => {
        const jobExists = myJobs.some((job) => job._id === jobObject._id);
        if (!jobExists) {
            const updatedMyJobs = [...myJobs, jobObject];
            setMyJobs(updatedMyJobs);
            localStorage.setItem('myJobs', JSON.stringify(updatedMyJobs));
        } else {
            console.log('Job already exists in my Jobs list');
            
        }
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [setUser]);

    useEffect(() => {
        const storedMyJobs = JSON.parse(localStorage.getItem('myJobs')) || [];
        setMyJobs(storedMyJobs);
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/jobs/view/")
            .then(res => {               
                setJobs(res.data);
            })
            .catch(err => console.log(err));            
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/jobs/view/" + id)
            .then(res => {
                setTitle(res.data.title);
                setLocation(res.data.location);
               
                const newJob = { _id: id, title, location };
                if (newJob.title && newJob.location) {
                    addJobToMyJobs(newJob);
                }
            })
            .catch(err => console.log(err));
    }, [id, title, location, addJobToMyJobs]);

    const deleteMe = (idToDelete) => {
        axios.delete("http://localhost:5000/api/jobs/" + idToDelete)
            .then(res => {
                console.log(res.data);
                setJobs(jobs.filter(job => job._id !== idToDelete));
                setMyJobs(myJobs.filter(job => job._id !== idToDelete));
                navigate("/dashboard");
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout')
            .then(response => {
                console.log('Logged out successfully');  
                localStorage.removeItem('user');
                localStorage.removeItem('myJobs'); 
                setUser(null);
                navigate("/");
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };
      
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Dashboard</span>
                    <div className="navbar-collapse justify-content-between">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link">Welcome  {user ? (user.firstName) : ''}</span>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link"  onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/addJob">Add a Job</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2 style={{ textAlign: 'center', color: '#ffe4c4' , fontSize: '2rem', marginTop: '20px' }}>All Jobs available</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((jobObject) => (
                                    <tr key={jobObject._id}>
                                        <td>{jobObject.title}</td>
                                        <td>{jobObject.location}</td>
                                        <td>
                                            <button className="btn  btn-secondary" style={{ width: '90px', margin: '3px' }} onClick={() => navigate("/dashboard/jobs/view/" + jobObject._id)}>View</button>
                                            <button className="btn btn-secondary" style={{ width: '90px', margin: '3px' }} onClick={() => addJobToMyJobs(jobObject)}>Add</button>
                                            {user && user._id === jobObject.userId && (
                                                <>
                                                    <button className="btn btn-secondary" style={{ width: '90px', margin: '3px' }} onClick={() => navigate("/dashboard/jobs/edit/" + jobObject._id)}>Edit</button>
                                                    <button className="btn  btn-danger" style={{ width: '90px', margin: '3px' }} onClick={() => deleteMe(jobObject._id)}>Cancel</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {myJobs.length > 0 && (
                        <div className="col-md-6">
                            <h2  style={{ textAlign: 'center', color: '#ffe4c4' , fontSize: '2rem', marginTop: '20px' }}>My Jobs</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myJobs.map((myJobObject) => (
                                        <tr key={myJobObject._id}>
                                            <td>{myJobObject.title}</td>
                                            <td>
                                                {myJobObject._id && (
                                                    <button className="btn  btn-secondary" style={{ width: '90px', margin: '3px' }} onClick={() => navigate("/dashboard/jobs/view/" + myJobObject._id)}>View</button>
                                                )}
                                                <button className="btn   btn-danger" style={{ width: '90px', margin: '3px' }} onClick={() => deleteMe(myJobObject._id)}>Done</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
