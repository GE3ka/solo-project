import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './userContext';
import { useCookies } from 'react-cookie';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(""); 
    const { setUser } = useUser();
    const [cookies, setCookie] = useCookies(['user']);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:5000/api/login', { email, password })
            .then(result => {
                if (result.data.msg === "success!") {
                    const userData = result.data.user; //extract user information from response
                    const token = result.data.token; // extract token from response
                    setUser(userData);
                    setCookie('token', token)
                    localStorage.setItem('user', JSON.stringify(userData)); 
                    localStorage.setItem('token', token); // store token in local storage 
                    navigate('/dashboard');
                } else {
                    setError("Something went wrong");
                } 
            })
            .catch(err => {
                setError(err.response.data.msg || "Something went wrong");
            });
    }

    return (
        <div>
            <h1 className="text-center mb-4 welcome-heading">Welcome to Chores Tracker</h1>
            <div className="d-flex justify-content-center align-items-center text-center vh-100">
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p>{error}</p>
                    <p className='container my-2'>Don&apos;t have an account?</p>                     
                    <Link to='/' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
 