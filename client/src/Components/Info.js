import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Info() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
            <h1 className="m-3">Instructions</h1>
            
            <h3>1. Search </h3>
            <h4> Use the search bar to filter the products. <br/>
                Keywords will match items' name, tags and description.</h4>
            <img style={{width: "40em"}} src="https://i.imgur.com/eidMmjR.gif"/> 
            
            
            <h3 className="m-3">2. Add </h3>
            <h4>Click the "Add" tab to go to the add product page. <br/>
                Enter the product details. <br/>
                Required fields include name and price.<br/>
                New tags will be added after clicking the "Enter"/"Return" key. <br/>
                Supported image files include "png", "jpg", "gif" and "jpeg".<br/>
            </h4>
            <img style={{width: "40em"}} src="https://i.imgur.com/IHGs592.gif"/>

            <h3 className="m-3">3. Update </h3>
            <h4> Click on the product in the main page and key in the fields that requires updating. <br/>
            Fields left unchanged will remain unchanged. <br/>
            Page will update automatically.
            </h4>
            <img style={{width: "40em"}} src="https://i.imgur.com/aQElC15.gif"/>
            


            <h3 className="m-3">4. Delete </h3>
            <h4>To delete, click on the delete button and click "confirm".</h4>
            <img style={{width: "40em"}} src="https://i.imgur.com/MH4Eauy.gif"/>
            </Col>
            </Row>
        </Container>
    )
}

export default Info
