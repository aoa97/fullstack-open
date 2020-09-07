import React from 'react'


const Persons = ({ setPersons, persons, filter, handleDelete }) => {
    const filterdList = persons.filter(({ name }) => name.includes(filter.charAt(0).toUpperCase() + filter.slice(1)))

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