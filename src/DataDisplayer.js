import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

class DataDisplayer extends Component {
    constructor(){
        super();
        this.deletePerson = this.deletePerson.bind(this);
    }
    
    deletePerson(e) {
        let removedItemId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id, 10);
        fetch('http://localhost:3000/people/' + removedItemId, {
            method: 'DELETE'
        });
    }
        
    render(){
        return (
            <div className="displayedData">
                {this.props.personsData.map(item => (
                    <Row key={item.id} data-id={item.id} data-age={item.age} data-name={item.name}>
                        <Col xs={8} md={10}>
                            <span>{item.name}, Age: {item.age}</span>
                        </Col>
                        <Col xs={4} md={2}>
                            <ButtonGroup bsStyle="default" bsSize="xsmall">
                                <Button bsStyle="default" onClick={this.deletePerson} disabled={this.props.editMode}>Delete</Button>
                                <Button onClick={this.props.editModeToggler}>Edit</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                ))}
            </div>
        )
    }
}

export default DataDisplayer;