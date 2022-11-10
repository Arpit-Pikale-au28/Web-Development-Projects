import React from 'react'
import { useSelector } from 'react';
import {Link} from 'react-router-dom'
import '../App.css'

export default function ProductComponent() {
    const products = useSelector((state) => state.allproducts.products)
    const renderList = products.map((product) => {
          const {id, title, image, price, category} = product;
          return (
            <div className="item" key={id}>
                <Link to= {`/product/:${id}`}/>
              <h3>{title}</h3>
              <img src={image} alt={title} />
              <h3>Price ${price}</h3>
              <p>Catagory {category}</p>
              <button>Add to cart</button>
            </div>
          );
        });
        return <>{renderList}</>
      };
    
