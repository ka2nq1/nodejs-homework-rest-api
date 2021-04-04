const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controller/index')

router.get('/', ctrlContact.getContacts)
router.get('/:contactId', ctrlContact.getById)
router.post('/', ctrlContact.addNewContact)
router.delete('/contactId', ctrlContact.deleteContact)
router.patch('/:contactId', ctrlContact.update)

module.exports = router
