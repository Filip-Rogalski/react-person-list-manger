import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import DataController from './DataController';
import DataDisplayer from './DataDisplayer';

import './index.css';

class Header extends Component {
    render(){
        return(
            <Row>
                <Col xs={12}>
                    <h1>Manage person list</h1>
                </Col>
            </Row>
        )
    }
}

class DisplayController extends Component {
    render(){
        return(
            <div className="displayController">
                <Row>
                    <Col xs={12}>
                        <ButtonGroup bsSize="small">
                            <Button onClick={this.props.sortPersonsByAge}>Sort Age</Button>
                            <Button onClick={this.props.sortPersonsByName}>Sort Name</Button>
                            <Button onClick={this.props.updateData}>Update</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

class App extends Component {
    constructor() {
        super();
        this.editModeOn = this.editModeOn.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.sortPersonsByAge = this.sortPersonsByAge.bind(this);
        this.sortPersonsByName = this.sortPersonsByName.bind(this);
        this.state = {persons: [], newPersonsName: '', newPersonsAge: '', editMode: 'false', editedItemId: '', sorting: 'id'};
    }

    /* Fetch data from dbase */
    
    componentDidMount(){
        fetch('http://localhost:3000/people').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                persons: data
            });
        });
    }
   
    updateData(){
         fetch('http://localhost:3000/people?_sort=' + this.state.sorting + '&ord=asc').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                persons: data
            });
        });
    }

    clearInputs(firstInput, secondInput){
        firstInput.value = '';
        secondInput.value = '';
    }
    
    editModeOn(e) {
        this.setState({editMode: 'true', editedItemId: parseInt(e.target.parentElement.parentElement.parentElement.dataset.id, 10)});
    }

    editModeOff(e) {
        this.setState({editMode: 'false', editedItemId: ''})
    }
    
    updatePerson(e) {
        e.preventDefault();
        let id = this.state.editedItemId, 
            nameInput = e.target.parentElement.parentElement.firstChild.firstChild.firstChild,
            ageInput = e.target.parentElement.parentElement.firstChild.nextSibling.firstChild.firstChild;
        let newData = {
            name: nameInput.value,
            age: ageInput.value
        };
        fetch('http://localhost:3000/people/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newData )
        }).then(
            this.clearInputs(nameInput, ageInput)
        );
        this.setState({editMode: 'false'});
    }
    
    sortPersonsByAge(e) {
        fetch('http://localhost:3000/people?_sort=age&_order=asc').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                persons: data
            });
        });
        this.setState({sorting: 'age'});
    }

    sortPersonsByName(e) {
        fetch('http://localhost:3000/people?_sort=name&_order=asc').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                persons: data
            });
        });
        this.setState({sorting: 'name'});
    }

    render(){
        return (
            <Grid>
                <Header />
                <DataController editModeOff={this.editModeOff} submitEditHandler={this.updatePerson} editMode={this.state.editMode}/>
                <DataDisplayer editMode={this.state.editMode} updateData={this.updateData} editModeOn={this.editModeOn} personsData={this.state.persons}/>
                <DisplayController sortPersonsByAge={this.sortPersonsByAge} sortPersonsByName={this.sortPersonsByName} updateData={this.updateData}/>
            </Grid>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
