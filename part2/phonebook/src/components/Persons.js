import React from 'react'
import { deleteContact } from '../services/persons'


const Persons = ({ setPersons, persons, filter }) => {
    const filterdList = persons.filter(({ name }) => name.includes(filter.charAt(0).toUpperCase() + filter.slice(1)))
    const handleDelete = (id, name) => {
        const confirm = window.confirm(`Delete ${name} ?`)
        if (confirm) {
            deleteContact(id).then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                setPersons(newPersons)
            })
        }
    }

    return (
        <div>
            <h2>Numbers</h2>
            {filterdList.map(({ id, name, number }) => (
                <div key={id}>
                    {name} {number} <button onClick={() => handleDelete(id, name)}>delete</button>
                </div>
            ))}
        </div>
    );
}

export default Persons;