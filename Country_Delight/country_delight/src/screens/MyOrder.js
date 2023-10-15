import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

export default function MyOrder() {
    const [OrderData, setOrderData] = useState("");
    const fetchMyOrder = async() =>{
        await fetch("http://localhost:5000/api/myOrderdata",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem("userEmail")
            })
        }).then (async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

  return (
    <>
    <div>
        <Navbar/>
    </div>
    <div className='container'>
    <div className="card mt-3 m-4 rounded" style={{ maxWidth: "12rem"}}>
        <img
          className="card-img-top text-center"
          src="images/cow_milk.png"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title"> Cow Milk</h5>
          <div className="d-inline fs-5">
          </div>
            <div className="">
              <p>Price : Rs 99/-</p>
              <p>Total Price : Rs 99/-</p>
              </div>
        </div>
      </div>
        <div className='row'>
            {OrderData != {} ? Array(OrderData).map(data => {
                return (
                    data.orderData ? 
                    data.orderData.order_data.slice(0).reverse().map((item) => {
                        return (
                            item.map((arrayData) => {
                                return (
                                    <div>
                                        {arrayData.Order_date ? <div className='m-auto mt-5'>
                                            {data = arrayData.Order_date}
                                            <hr/>
                                        </div> : 
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <div className='card mt-3' style={{ width: "18rem", maxHeight:"360px"}}>
                                                    <img src={arrayData.img} className='card-img-top' alt="image" />
                                                    <div className='card-body'>
                                                        <h5 className='card-title'>{arrayData.name || "Card Title"}</h5>
                                                        <div className='container w-100 p-0' style={{height: "38px"}}>
                                                            <span className='m-1'>{arrayData.qty || "1"}</span>
                                                            <span className='m-1'>{data || "Data"}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                Rs {arrayData.price || "99"}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                    </div>
                                )
                            })
                        )
                    }) : ""
                )
            }):""}
        </div>
    </div>
    <div>
        <Footer/>
    </div>
    </>
  )
}
