import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button,Form } from "react-bootstrap";
import axios from "axios";
import { Image } from "cloudinary-react";

function AddProduct() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [product, setProduct] = useState({
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [img, setImg] = useState("");
  const form = useRef(null);
  const submit = useRef(null);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  
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

  async function postProduct(e) {
    e.preventDefault(e);
    try {
      let res = await axios.post(`/api/products`, product, {});
      console.log(res);
      submit.current.reset()
      form.current.reset();
      setImg("");
      setTags([])
    } catch (e) {
      console.log(e);
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
    <Container>
      <Row className="justify-content-center text-center">
        <h1> IRVIN'S PRODUCT ADD LIST</h1>
        <Col md={6}> 
        <Form onSubmit={postProduct} ref={submit}>
        
          <div className="form-floating mb-3">
           
            <input
              type="text"
              name="name"
              onChange={settingProduct}
              className="form-control"
              id="floatingInput"
              required={true}
              minLength={1}
              placeholder="salted egg yolk"
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
              min={0.1}
              step={0.01}
              onChange={settingProduct}
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
              className="form-control"
              id="floatingInput"
              style={{ height: "7em" }}
              placeholder="salted egg yolk"
            />
            <label className="text-muted pt-2" for="floatingInput">
              Description
            </label>
          </div>

          <Row className="justify-content-center mx-1">
            <label className="text-muted text-start">Image Upload</label>
            <form ref={form}>
              <input
                type="file"
                name="file"
                id="floatingInput"
                className="form-control"
                onChange={(e) => {
                  uploadImg(e.target.files);
                }}
              />
              <Image
                style={{ width: "30%" }}
                cloudName="kimmyp"
                publicId={img}
              />
            </form>
          </Row>

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
              placeholder="salted egg yolk"
            />
            {/* {tags.length > 0 ? 
             <span>press "," to add new tags, <br/> click "x" to delete tags </span>
            : ""} */}
            <div className="tag-container my-3">
              {tags.map((tag, index) => (
                <div className="tag ">
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
            </div>
            <label className="text-muted pt-2" for="floatingInput">
              Tags
            </label>
          </div>

          <Row className="justify-content-center mt-3">
          
            <Button type="submit" className="w-25 bg-light text-dark">
              Submit
            </Button>
            
          </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
