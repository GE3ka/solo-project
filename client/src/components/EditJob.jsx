import axios from 'axios';
import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from './userContext';
const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location,setLocation]=useState("");
    const { user, setUser } = useUser();
    useEffect(() => {
            axios.get("http://localhost:5000/api/jobs/view/" + id)
                .then(res => {
                console.log(res.data);
                console.log(id)
                setTitle(res.data.title);
                setDescription(res.data.description);
                setLocation(res.data.location);
            })
                .catch(err => console.log(err));
        }, [id]);
        
       // UPDATE form submission
        const submitHandler = (e) => {
            e.preventDefault();
            console.log(title)
            axios.patch(`http://localhost:5000/api/jobs/edit/${id}`, {title,description,location})
                .then(res => {
                    //console.log(res.data)
                    navigate("/dashboard/jobs/view/"+id)
                })
                .catch(err => {
                    console.log(err);
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                            errorArr.push(errorResponse[key].message);
                        }
                   // Set Errors
                    setErrors(errorArr);
                });
        };
        const handleLogout = () => {
            axios.post('http://localhost:5000/api/logout')
            .then(response => {
                // Handle successful logout
                console.log('Logged out successfully');
                localStorage.removeItem('user');
                localStorage.removeItem('myJobs'); 
                setUser(null);
                navigate("/");
            })
            .catch(error => {
              // Handle error
              console.error('Error logging out:', error);
            });
        };
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
                            <div className="mb-3 row">
                                <label htmlFor="description" className="col-sm-3 col-form-label text-white">Description:</label>
                                <div className="col-sm-9">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="location" className="col-sm-3 col-form-label text-white">Location:</label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
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
   
   export default Edit