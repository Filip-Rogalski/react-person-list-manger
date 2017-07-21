import React, { Component } from 'react';

class DataDisplayer extends Component {
    constructor(){
        super();
        this.deletePerson = this.deletePerson.bind(this);
    }
    
    deletePerson(e) {
        let removedItemId = parseInt(e.target.parentElement.dataset.id, 10);
        fetch('http://localhost:3000/people/' + removedItemId, {
            method: 'DELETE'
        });
    }
    
    render(){
        return (
            <div>
                <div className="row">
                    <ul>
                        {this.props.personsData.map(item => (
                            <li key={item.id} data-id={item.id} data-age={item.age} data-name={item.name}>
                                <span>{item.name},</span>
                                <span> Age: {item.age}</span>
                            <button onClick={this.deletePerson} className="itemBtn deleteBtn">Delete</button>
                            <button onClick={this.props.editModeOn} className="itemBtn editBtn">Edit</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        )
    }
}

export default DataDisplayer;