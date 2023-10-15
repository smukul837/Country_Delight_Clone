import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"", email:"", location:"", password:""})
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/create_user",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, location:credentials.location, password:credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Invalid Credentials")
        }
        else{
            alert("User Signup Successfully")
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
                        Signup
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label justify">Name</label>
                                <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="text" className="form-label">Location</label>
                                <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} required/>
                            </div>
                            <button type="submit" className="m-3 btn btn-primary">Sign Up</button>
                            <Link to='/login' className='m-3 btn btn-danger'>Already a user ?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
