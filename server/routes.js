const express = require('express')
const router = express.Router()
const controller = require('./controllers')

router.get('/companies', controller.getCompanies)
router.get('/offices', controller.getOfficesByCompany)
router.post('/companies', controller.addCompany)
router.post('/offices', controller.addOffice)
router.delete('/companies/:id', controller.deleteCompany)
router.delete('/offices/:id', controller.deleteOffice)

module.exports = router