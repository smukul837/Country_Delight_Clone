import React from 'react'
import { useDispatchCart, useCart } from "../component/ContextReducer";
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.length == 0){
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>Items Not Found</div>
            </div>
        )
    }

    const handleCheckOut = async() => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/order_data",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("Respose Cart",response)
        if(response.status === 200){
            dispatch({type:"DROP"})
        }
    }

    let totalPrice = data.reduce((total, food) => parseInt(total)+parseInt(food.price),0)
  return (
    <div> 
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover text-center' style={{ overflowY: "auto", overflowX: "auto"}}>
                <thead className='fs-4'>
                    <tr>
                        <th scope='col'>&nbsp;</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.price}</td>
                            <td><button type="button" className='btn p-0' onClick={() => {
                                dispatch({ type: "REMOVE", index: index })
                            }}>Delete</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h1 className='fs-2'>Total Price : Rs {totalPrice}/-</h1>
            </div>
            <div>
                <button className='btn bg-primary text white mt-5' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    </div>
  )
}
