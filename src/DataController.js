import React, { Component } from 'react';

class DataController extends Component {
    constructor(){
        super();
        this.addPerson = this.addPerson.bind(this);
        this.editPerson = this.editPerson.bind(this);   
    }
    
    addPerson(e){
        e.preventDefault();
        let nameInput = e.target.parentElement.firstChild,
            ageInput = e.target.parentElement.firstChild.nextSibling;
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
    
    editPerson(e) {
        
    }
    
    render(){
        return (
            <div className="row">
                <form>
                    <input type="text" id="name" placeholder="Insert name (first_last)"/>
                    <input type="text" id="age" placeholder="Insert Age"/>
            {this.props.editMode === 'false' ? (<button onClick={this.addPerson}>Add</button>) : (<button onClick={this.props.submitEditHandler/*this.editPerson*/}>Confirm</button>)}
                </form>
            </div>
        )
    }
}

export default DataController;