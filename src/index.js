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
                            <Button onClick={this.props.sortPersonsByAge} disabled={this.props.editMode}>Sort Age</Button>
                            <Button onClick={this.props.sortPersonsByName} disabled={this.props.editMode}>Sort Name</Button>
                            <Button onClick={this.props.updateData} disabled={this.props.editMode}>Update</Button>
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
        this.editModeToggler = this.editModeToggler.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.sortPersonsByAge = this.sortPersonsByAge.bind(this);
        this.sortPersonsByName = this.sortPersonsByName.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {persons: [], newPersonsName: '', newPersonsAge: '', editMode: false, editedItemId: '', updatedPersonsName: 'buła', updatedPersonsAge: '', sorting: 'id'};
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
    
    
    /* Function switches the edit mode and choses the item to edit. */
    
    editModeToggler(e) {
        if (this.state.editMode === false) {
            this.setState({editMode: true, editedItemId: parseInt(e.target.parentElement.parentElement.parentElement.dataset.id, 10), updatedPersonsName: e.target.parentElement.parentElement.parentElement.dataset.name, updatedPersonsAge: e.target.parentElement.parentElement.parentElement.dataset.age});
           let items = e.target.parentElement.parentElement.parentElement.parentElement.childNodes;
            items.forEach(function(element){
                element.lastElementChild.firstElementChild.lastElementChild.disabled = true;
            });
            e.target.disabled = false;
        } else {
            this.setState({editMode: false, editedItemId: '', updatedPersonsName: '', updatedPersonsAge: ''});
            let items = e.target.parentElement.parentElement.parentElement.parentElement.childNodes;
            items.forEach(function(element){
                element.lastElementChild.firstElementChild.lastElementChild.disabled = false;
            });
        }
    }

    handleNameChange(e) {
        this.setState({updatedPersonsName: e.target.value});
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
        this.setState({editMode: false, editedItemId: '', updatedPersonsName: '', updatedPersonsAge: ''});
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
                <DataController updatedPersonsName={this.state.updatedPersonsName} updatedPersonsAge={this.state.updatedPersonsAge} submitEditHandler={this.updatePerson} editMode={this.state.editMode}/>
                <DataDisplayer editMode={this.state.editMode} updateData={this.updateData} editModeToggler={this.editModeToggler} personsData={this.state.persons}/>
                <DisplayController editMode={this.state.editMode} sortPersonsByAge={this.sortPersonsByAge} sortPersonsByName={this.sortPersonsByName} updateData={this.updateData}/>
            </Grid>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
