import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { Link, useNavigate } from 'react-router-dom'
    
export default function Login() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email:"",  password:""})
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login_user",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Invalid Credentials")
        }
        else{
            localStorage.setItem("UserEmail",credentials.email);
            localStorage.setItem("authToken",json.authtoken);
            console.log("Token",localStorage.getItem("authToken"))
            navigate('/')
        }
    }

    const onChange = (e) =>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

      return (
        <>
        <div><Navbar/></div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control"  name="password" value={credentials.password} onChange={onChange} required/>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            <Link to='/signup' className='m-3 btn btn-danger'>Signup</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      )
    }
    