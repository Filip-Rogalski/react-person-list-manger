import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataController from './DataController';
import DataDisplayer from './DataDisplayer';

import './index.css';

class Header extends Component {
    render(){
        return(
            <div className="row">
                    <h1>Manage person list</h1>
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
    
    /* Refresh data after update */
    /*
    componentDidUpdate(){
        fetch('http://localhost:3000/people').then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                persons: data
            });
        }).then();
    }
    */
    
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
        this.setState({editMode: 'true', editedItemId: parseInt(e.target.parentElement.dataset.id, 10)});
    }

    editModeOff(e) {
        this.setState({editMode: 'false', editedItemId: ''})
    }
    
    updatePerson(e) {
        e.preventDefault();
        let id = this.state.editedItemId, 
            nameInput = e.target.parentElement.firstChild,
            ageInput = e.target.parentElement.firstChild.nextSibling;
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
            <div>
                <Header />
                <DataController editModeOff={this.editModeOff} submitEditHandler={this.updatePerson} editMode={this.state.editMode}/>
                <DataDisplayer updateData={this.updateData} editModeOn={this.editModeOn} personsData={this.state.persons}/>
                <div className="row">
                    <button className="sortBtn" onClick={this.sortPersonsByAge}>Sort Age</button>
                    <button className="sortBtn" onClick={this.sortPersonsByName}>Sort Name</button>
                    <button className="sortBtn" onClick={this.updateData}>Update</button>    
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
