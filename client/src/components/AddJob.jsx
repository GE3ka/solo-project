// Importing necessary modules and hooks from React
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom for programmatic navigation
import { useState ,useEffect} from 'react'; // Importing useState and useEffect hooks from React
import axios from 'axios'; // Importing axios for making HTTP requests
import { useUser } from './userContext'; // Importing useUser hook from userContext.js for managing user state

// AddJob functional component definition
const AddJob = () =>{
    const navigate = useNavigate(); // Getting navigate function for programmatic navigation
    const [title, setTitle] = useState(); // State variable and function to update the title
    const [description, setDescription] = useState(); // State variable and function to update the description
    const [location, setLocation] = useState(); // State variable and function to update the location
    const [errors, setErrors] = useState([]); // State variable to store validation errors
    const { user,setUser } = useUser(); // Getting user data and setUser function from useUser hook

    // Effect hook to retrieve user data from local storage when the component mounts
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [setUser]);

    // Function to handle form submission
    const SubmitHandler = (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        
        // Making a POST request to add a job
        axios.post("http://localhost:5000/api/jobs/addJob",{title,description,location,userId: user._id})
            .then(res => {
                console.log("✅✅✅✅✅", res.data);
                navigate("/dashboard"); // Navigating to the dashboard after successfully adding a job
            })
            .catch(err => {
                console.log(err.response.data.errors);
                const errorResponse = err.response.data.errors;  
                const errorArr = [];  
                for (const key of Object.keys(errorResponse)) {  
                    errorArr.push(errorResponse[key].message);
                }
                // Set Errors
                setErrors(errorArr); // Setting validation errors
            });
    };

    // Function to handle logout
    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout') // Making a POST request to logout
        .then(response => {
          // Handle successful logout
          console.log('Logged out successfully');
          navigate("/"); // Navigating to the homepage after logout
        })
        .catch(error => {
          // Handle error
          console.error('Error logging out:', error);
        });
    };

    // JSX representing the Add Job form
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
                        {/* Form fields for job title, description, and location */}
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
                        {/* Submit button */}
                        <button type="submit" style={{ width: '25%' }} className="btn btn-secondary">Add</button>
                    </form>
                    {/* Displaying validation errors, if any */}
                    {errors.map((err, index) => (
                        <p style={{ color: 'red' }} key={index}>{err}</p>
                    ))}
                </div> 
            </div>
        </div>
    );
}

export default AddJob; // Exporting the AddJob component
