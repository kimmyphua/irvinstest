import React, {useState} from 'react'
import axios from 'axios';
import {Modal,Button} from 'react-bootstrap'
function DeleteProduct({item, getProducts, setShow}) {
    const [showDlt, setShowDlt] = useState(false);

    const handleClose = () => setShowDlt(false);
    const handleShow = () => {
        setShowDlt(true);
        
    }

    async function deleteProduct(e) {
        e.preventDefault(e)
        await axios.delete(`api/delete/${item._id}`);
        getProducts();
        setShow(false);
      }

    return (
        <>
            <button
              className="btn btn-light border border-danger text-danger mx-2 my-1"
              onClick={handleShow}
            >
              Delete Product
            </button>

            <Modal show={showDlt} onHide={handleClose} style={{backgroundColor: "white"}}>
        <Modal.Header >
          <Modal.Title>Deleting... {item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >Are you sure you want to delete {item.name} ? <br/>
        Changes cannot be undone!<br/>
        Click "Confirm" to delete and "Cancel" to return to page.
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteProduct}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default DeleteProduct
