import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const handleAddtoCart = async () => {
    let food = []
    for (const item of data){
      if(item.id == props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food != []){
      if(food.qty == qty){
        await dispatch({ type: "UPDATE", id:props.foodItem._id, price:totalPrice, qty:qty})
        return
      }
      else if(food.qty != qty){
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.Name, price: props.foodItem.price, qty: qty});
        return
      }
      await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.Name, price: props.foodItem.price, qty: qty});
    }
  }

  let totalPrice = qty * parseInt(props.foodItem.price);
  return (
    <div className="container">
      <div className="card mt-3 m-4 rounded" style={{ Width: "18rem" }}>
        <img
          className="card-img-top text-center"
          src="images/cow_milk.png"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.Name|| "Card Title"}</h5>
          <div className="d-inline fs-5">
            <select className="m-2 h-100 rounded"  onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}> {i + 1} </option>
                );
              })}
            </select>
          </div>
            <div className="">
              <p>Price : Rs {props.foodItem.price}/-</p>
              <p>Total Price : Rs {totalPrice}/-</p>
              </div>
            <Link to="/" className="btn btn-primary mt-2" onClick={handleAddtoCart}>Add to Cart</Link>
        </div>
      </div>
    </div>
  );
}
