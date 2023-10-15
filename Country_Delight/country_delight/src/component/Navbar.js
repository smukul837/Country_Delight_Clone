import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import { useDispatchCart, useCart } from "./ContextReducer";
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
const[cartView, setCartView] =useState(false);
let data = useCart();
  let navigate = useNavigate();

  const handlelogout = () => {
    alert(localStorage.removeItem("authToken"));
    navigate('/login')
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Country_Delight</Link>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {(localStorage.getItem("authToken")) ?
        <li className="nav-item">
           <Link className="nav-link" to="/myOrder" >My Orders </Link>
        </li> : ""
      }
      </ul>
      {(!localStorage.getItem("authToken")) ?
          <div className="d-flex">
            <Link className="nav-link" to='/login'>Login </Link>
            <Link className="nav-link" to='/signup'>SignUp </Link>
            <Link className="btn btn-success" to="/download-app">Download App</Link>
          </div>
          : <div>
            <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)} >My Cart {"  "}
            <Badge pill bg="danger">{data.length} </Badge></div>
            {cartView ? <Modal onclose={() => setCartView(false)}><Cart/></Modal>:null}
            <Link className="btn bg-white text-danger mx-2" onClick={handlelogout}>Logout</Link>
            </div>
      }    
      </div>
  </div>
</nav>
  )
}
