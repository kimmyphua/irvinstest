import React, { useState, useEffect } from "react";
import { Col, Row, Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import SingleProduct from "./SingleProduct";

function ViewProducts() {
  const [productList, setProductList] = useState([]);

  async function getProducts() {
    try {
      let { data } = await axios.get(`/api`);
      setProductList(data.item);
      console.log(data.item);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
        <h1 className="text-center"> IRVIN'S PRODUCT LIST </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th >Tags</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date Created</th>
            <th>Date Modified</th>
            
          </tr>
        </thead>
      
          {productList.map((item, i) => (
            <>
              
              <SingleProduct
                key={i}
                i={i}
                item={item}
                setProductList={setProductList}
                
              /> 
              </>
          ))}
       
      </Table>
    </Container>
  );
}

export default ViewProducts;
