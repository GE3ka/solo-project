import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useUser } from './userContext';

const AddJob = () =>{
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [errors, setErrors] = useState([]); 
    const { user,setUser } = useUser();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [setUser]);
    const SubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/jobs/addJob",{title,description,location,userId: user._id})
            .then(res => {
                console.log("✅✅✅✅✅", res.data)
                navigate("/dashboard")   
                 
            })
        .catch(err => {
            console.log(err.response.data.errors)
            const errorResponse = err.response.data.errors;  
                const errorArr = [];  
                for (const key of Object.keys(errorResponse)) {  
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
        })
    }
    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout')
        .then(response => {
          // Handle successful logout
          console.log('Logged out successfully');
          navigate("/");
        })
        .catch(error => {
          // Handle error
          console.error('Error logging out:', error);
        });
    };
    return ( 
     
        <div className="container-fluid min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">Add A job  </span>                        
                <button className="  nav-link btn btn-link text-ligh t"  onClick={handleLogout}>Logout</button>         
                <button className="  nav-link btn btn-link text-light "  onClick={()=>navigate('/dashboard')}>Back</button>                
            </div>
        </nav>
        <div className="row justify-content-center align-items-center flex-grow-1">
            <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                <h2 className='mb-3 text-primary'>Add A Job</h2>
                <form onSubmit={SubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputText1" className="form-label"><strong>Title</strong></label>
                        <input 
                            type="text"
                            placeholder="Enter The Title"
                            className="form-control" 
                            id="exampleInputText1" 
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDescription1" className="form-label"><strong>Description</strong></label> 
                        <textarea 
                            rows="3"
                            placeholder="Job Description"
                            className="form-control" 
                            id="exampleInputDescription1" 
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLocation1" className="form-label"><strong>Location</strong></label>
                        <input  
                            type="text"
                            placeholder="Job Location"
                            className="form-control" 
                            id="exampleInputLocation1" 
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '25%' }} className="btn btn-secondary">Add</button>
                </form>
                {errors.map((err, index) => (
                    <p style={{ color: 'red' }} key={index}>{err}</p>
                ))}
            </div> 
        </div>
       
    </div>
    
    )
}
export default AddJob