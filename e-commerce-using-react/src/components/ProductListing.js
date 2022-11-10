import "../App.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../Redux/actions/product_actions";
import ProductComponent from "./ProductComponent";

export default function ProductListing() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchData = async () => {
      const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
     dispatch(setProducts(response.data));
     console.log(products);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log("products :", products);
  return (
    <div className="component">
      <ProductComponent/>
    </div>
  );
}
