const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    return contacts.find(contact => String(contact.id) === contactId)
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newList = contacts.filter(contact => String(contact.id) !== contactId)
    const contactToRemove = contacts.find(contact => String(contact.id) === contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))

    return contactToRemove
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const newContact = { id: uuidv4(), ...body }
    const contacts = await listContacts()
    const newList = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))

    return newContact
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactToUpdate = contacts.find(contact => String(contact.id) === contactId)
    const updatedContact = { ...contactToUpdate, ...body }
    const updatedList = contacts.map(contact =>
      String(contact.id) === String(updatedContact.id) ? updatedContact : contact
    )
    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2))
    return updatedContact
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
