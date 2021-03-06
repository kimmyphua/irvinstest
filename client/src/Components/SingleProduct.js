import { Form, Modal } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import { Image } from "cloudinary-react";
import DeleteProduct from "./DeleteProduct";
import DeleteTag from "./DeleteTag";

function SingleProduct({ item, i, setProductList }) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(item.tags);
  const [product, setProduct] = useState({
    updatedAt: Date.now(),
  });
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);
  const form = useRef(null);
  const submit = useRef(null);
  const tableStyle = ({ hover }) => ({
    backgroundColor: hover ? "#f7e8b7" : "#ffffff",
    cursor: "pointer",
  });



  const [hover, setHover] = useState(false);

  function handleShow() {
    setShow(true);
    setTags(item.tags)
  }

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  console.log(tags);
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setProduct((prevState) => ({ ...prevState, tags: tags }));
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);

      setInput(poppedTag);
      console.log(product);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  async function settingProduct(e) {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(product);
  }

  useEffect(() => {
    setProduct((prevState) => ({ ...prevState, tags: tags }));
    console.log(product);
  }, [tags]);

  async function updateProduct(e) {
    e.preventDefault(e);
    try {
      let res = await axios.put(`api/products/${item._id}`, product, {});
      console.log(res.data);
      getProducts();
      setShow(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function getProducts() {
    try {
      let { data } = await axios.get(`/api`);
      setProductList(data.item);
      console.log(data.item);
    } catch (error) {
      console.log(error);
    }
  }

  const uploadImg = (files) => {
    // console.log(files[0]);

    if (!files[0] || files[0] === "") {
      alert("please upload a file");
    } else if (
      files[0].type.includes("image/jpg") ||
      files[0].type.includes("image/jpeg") ||
      files[0].type.includes("image/gif") ||
      files[0].type.includes("image/png")
    ) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "qfsfkzqi");
      axios
        .post("https://api.cloudinary.com/v1_1/kimmyp/image/upload", formData)
        .then((res) => {
          console.log(res.data.secure_url);
          setProduct((prevState) => ({
            ...prevState,
            image: res.data.secure_url,
          }));
          setImg(res.data.secure_url);
        });
    } else {
      alert("file type not supported!");
      form.current.reset();
      setImg("");
    }
  };


  return (
    <>
    
      <tbody>
        <tr
          style={tableStyle({ hover })}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={handleShow}
          key={i}
  
        >
          <td>{i + 1}</td>
          <td> {item.name}</td>
          <td>${item.price}</td>
          <td style={{maxWidth: "10em"}}>
              {item.tags.map((tag,i)=>(
                  <span className="tag">
                  {tag}
                  </span>
              ))}
              
              
              </td>
          <td > <span style={{textOverflow: 'scroll', overflow: 'scroll', display: "-webkit-box",  webkitboxOrient:"vertical", maxHeight: "12em"}}>{item.description}</span></td>
          <td>
            <img style={{ width: "5em" }} src={item.image} />
          </td>
          <td>
            {new Date(parseInt(item.createdAt, 10)).toLocaleDateString()},<br/>
            {new Date(parseInt(item.createdAt, 10)).toLocaleTimeString()}
          </td>
          <td>
            {new Date(parseInt(item.updatedAt, 10)).toLocaleDateString()},<br/>
            {new Date(parseInt(item.updatedAt, 10)).toLocaleTimeString()}
          </td>
        </tr>
      </tbody>

      <Modal
        size="lg"
        style={{ height: "100vh", width: "100%", overflow: "scroll" }}
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {item.name}
            <DeleteProduct
            item={item}
            setShow={setShow}
            getProducts={getProducts}/>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <Form onSubmit={updateProduct} ref={submit}>
                
            <Row className="justify-content-center mb-3">
                <Button type="submit" className="w-25 bg-light text-dark">
                  Update
                </Button>
              </Row>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="createdAt"
                  disabled={true}
                  className="form-control"
                  id="floatingInput"
                  defaultValue={new Date(parseInt(item.createdAt, 10)).toLocaleDateString()}
                />
                <label className="text-muted pt-2" for="floatingInput">
                  Created At
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="updatedAt"
                  disabled={true}
                  className="form-control"
                  id="floatingInput"
                  defaultValue={new Date(parseInt(item.updatedAt, 10)).toLocaleDateString()}
                />
                <label className="text-muted pt-2" for="floatingInput">
                  Updated At
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  required={true}
                  minLength={1}
                  onChange={settingProduct}
                  className="form-control"
                  id="floatingInput"
                  defaultValue={item.name}
                />
                <label className="text-muted pt-2" for="floatingInput">
                  Name
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  name="price"
                  required={true}
                  min={1}
                  step={0.01}
                  onChange={settingProduct}
                  defaultValue={item.price}
                  className="form-control"
                  id="floatingInput"
                  placeholder="9.99"
                />
                <label className="text-muted pt-2" for="floatingInput">
                  Price
                </label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  type="text"
                  name="description"
                  onChange={settingProduct}
                  defaultValue={item.description}
                  className="form-control"
                  id="floatingInput"
                  style={{ height: "4em" }}
                  placeholder="salted egg yolk"
                />
                <label className="text-muted pt-2" for="floatingInput">
                  Description
                </label>
              </div>

              <Row className="justify-content-center mx-1">
                <form ref={form}>
                  <label className="text-muted text-start">Image Upload</label>
                  <input
                    type="file"
                    id="floatingInput"
                    className="form-control"
                    onChange={(e) => {
                      uploadImg(e.target.files);
                    }}
                  />
                    <Row className="justify-content-center py-1">
                  Current Image: 
                  <Image
                    style={{ maxWidth: "8em" }}
                    cloudName="kimmyp"
                    publicId={item.image}
                  /> 
                  New image: 
                   <Image
                    style={{ maxWidth: "8em" }}
                    cloudName="kimmyp"
                    publicId={img}
                  />
                  </Row>
                </form>
              </Row>
              </Form>
              
              <div className="tag-container my-3">
                  {tags.map((tag, index) => (
                    <div className="tag ">
                      
                      <DeleteTag
                      index={index}
                      setTags={setTags}
                      tag={tag}/>
                      
                    </div>
                  ))}
                </div>
                <div className="form-floating mb-3">
                <input
                  type="text"
                  name="tags"
                  value={input}
                  placeholder="Enter a tag"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                  className="form-control"
                  id="floatingInput"
                />

               
                <label className="text-muted pt-2" for="floatingInput">
                  Add Tags
                </label>
              </div>

              {/* <Row className="justify-content-center mt-3">
                <Button type="submit" className="w-25 bg-light text-dark">
                  Update
                </Button>
              </Row> */}
           
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SingleProduct;
