import React, { useState, useEffect } from "react";
import { Col, Row, Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import SingleProduct from "./SingleProduct";

function ViewProducts() {
  const [productList, setProductList] = useState([]);
  const [keyword, setKeyword] = useState("");
    const [sortWord, setSortWord] = useState("createdAt")
    const [order, setOrder] =useState(false)


//   function sortDate(){
//       setProductList(productList.sort((a, b) => a.price.toString().localeCompare(b.price)))
     
//     console.log(productList)
//   }
  async function getProducts() {
    try {
      let { data } = await axios.get(`/api`);
      if(sortWord === "updatedAt"){
          order ?
        setProductList(data.item.sort((a, b) => a.updatedAt.toString().localeCompare(b.updatedAt))) :
        setProductList(data.item.sort((b, a) => a.updatedAt.toString().localeCompare(b.updatedAt)))
      }else if(sortWord === "price"){
          order ?
        setProductList(data.item.sort((a, b) => a.price.toString().localeCompare(b.price))) :
        setProductList(data.item.sort((b, a) => a.price.toString().localeCompare(b.price)))
      }else if(sortWord === "name"){
          order ?
        setProductList(data.item.sort((a, b) => a.name.toString().localeCompare(b.name))) :
        setProductList(data.item.sort((b, a) => a.name.toString().localeCompare(b.name)))
      }else{
          order ?
        setProductList(data.item.sort((a, b) => a.createdAt.toString().localeCompare(b.createdAt))):
        setProductList(data.item.sort((b, a) => a.createdAt.toString().localeCompare(b.createdAt)))
      }
      
      console.log(data.item);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [keyword,sortWord,order]);
  

  return (
    <Container>
        
        <h2 className="text-center"> IRVIN'S PRODUCT LIST 
        <input 
        placeholder="search product..."
        onChange={(e)=>setKeyword(e.target.value)}
        className="my-2 mx-4 font-monospace text-center"
        type="text"/>
        </h2>
      
        <button className="sort-button" onClick={()=>{setSortWord("name"); setOrder(!order)}}>sort by name</button>
        <button className="sort-button" onClick={()=>{setSortWord("price"); setOrder(!order)}}>sort by price</button>
        <button className="sort-button" onClick={()=>{setSortWord("updatedAt"); setOrder(!order)}}>sort by date modified</button>
        <button className="sort-button" onClick={()=>{setSortWord("createdAt"); setOrder(!order)}}>sort by date created</button>
      <Table 
      className="table-styles"
      striped bordered>
        <thead className="bg-white">
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
      
          {productList.filter(item => {
                            if (keyword === "") {
                                return item
                            } else if (item.name.toLowerCase().includes(keyword.toLowerCase()) 
                            || item.description.toLowerCase().includes(keyword.toLowerCase())
                            || item.tags.join("").toLowerCase().includes(keyword.toLowerCase())
                            ) {
                                return item
                            }}).map((item, i) => (
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
