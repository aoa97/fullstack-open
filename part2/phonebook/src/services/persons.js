import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(({ data }) => data)

const addContact = newPerson => axios.post(baseUrl, newPerson).then(({ data }) => data)

const updateNumber = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(({ data }) => data)

const deleteContact = id => axios.delete(`${baseUrl}/${id}`)

export { getAll, addContact, deleteContact, updateNumber }