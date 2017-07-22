import React, { Component } from 'react';
import { Button, Col, Row, FormGroup } from 'react-bootstrap';


class DataController extends Component {
    constructor(){
        super();
        this.addPerson = this.addPerson.bind(this);
    }
    
    addPerson(e){
        e.preventDefault();
        let nameInput = e.target.parentElement.parentElement.firstChild.firstChild,
            ageInput = e.target.parentElement.parentElement.firstChild.nextSibling.firstChild;
        let newPerson = {
            name: nameInput.value,
            age: ageInput.value
        }
        fetch('http://localhost:3000/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newPerson )
        })
    }
        
    render(){
        return (
            <Row>
                <form>
                    <Col xs={12} md={5}><input type="text" id="name" placeholder="Insert name (first_last)"/></Col>
                    <Col xs={9} md={5}><input type="text" id="age" placeholder="Insert Age"/></Col>
                    <Col xs={3} md={2}>
                        {this.props.editMode === 'false' ? (<Button bsStyle="default" bsSize="small" onClick={this.addPerson} block>Add</Button>) : (<Button bsStyle="default" bsSize="small" onClick={this.props.submitEditHandler}>Confirm</Button>)}
                    </Col>
                </form>
            </Row>
        )
    }
}

export default DataController;