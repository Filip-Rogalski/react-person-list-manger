import React, { Component } from 'react';
import { Button, Col, Row, FormGroup, FormControl } from 'react-bootstrap';


class DataController extends Component {
    constructor(){
        super();
        this.addPerson = this.addPerson.bind(this);
    }
    
    addPerson(e){
        e.preventDefault();
        let nameInput = e.target.parentElement.parentElement.firstChild.firstChild.firstChild,
            ageInput = e.target.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild;
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
                    <Col xs={12} md={5}>
                        <FormGroup>
                            {this.props.editMode === false ?
                            <FormControl
                                type="text"
                                placeholder="Enter name (first last)"
                            /> :
                            <FormControl
                                type="text"
                                placeholder = {this.props.updatedPersonsName}
                            />}
                        </FormGroup>
                    </Col>
                    <Col xs={9} md={5}>
                        <FormGroup disabled={this.props.editMode}>
                            {this.props.editMode === false ?
                            <FormControl
                                type="text"
                                placeholder="Enter age"
                            /> :
                            <FormControl
                                type="text"
                                placeholder = {this.props.updatedPersonsAge}
                            />}
                        </FormGroup>
                    </Col>
                    <Col xs={3} md={2}>
                        {this.props.editMode === false ? (<Button bsStyle="default" bsSize="sm" onClick={this.addPerson} block>Add</Button>) : (<Button bsStyle="default" bsSize="sm" block onClick={this.props.submitEditHandler}>Confirm</Button>)}
                    </Col>
                </form>
            </Row>
        )
    }
}

export default DataController;