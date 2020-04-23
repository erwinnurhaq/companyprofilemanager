const fs = require('fs')
const dataPath = './server/data.json'

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err
        }
        callback(returnJson ? JSON.parse(data) : data)
    })
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err
        }
        callback()
    })
}

module.exports = {

    getCompanies: (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            res.send(JSON.parse(data).companies)
        })
    },

    getOfficesByCompany: (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            let offices = JSON.parse(data).offices
            res.send(offices.filter(i => i.companyId === parseInt(req.query.companyId)))
        })
    },

    addCompany: (req, res) => {
        readFile(data => {
            let maxId = data.companies.sort((a, b) => a.id - b.id)
            let id = maxId.length > 0 ? maxId[maxId.length - 1].id + 1 : 1

            // // add the new company
            data.companies = [...data.companies, { id, ...req.body }]
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new company created')
            })
        }, true)
    },

    addOffice: (req, res) => {
        readFile(data => {
            let maxId = data.offices.sort((a, b) => a.id - b.id)
            let id = maxId.length > 0 ? maxId[maxId.length - 1].id + 1 : 1

            // // add the new office
            data.offices = [...data.offices, { id, ...req.body }]
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new office created')
            })
        }, true)
    },

    deleteCompany: (req, res) => {
        readFile(data => {
            let id = parseInt(req.params.id)
            let idx = data.companies.findIndex(i => i.id === id)
            if (idx >= 0) {

                // delete company
                data.companies.splice(idx, 1)

                // delete office on the company list
                let exclude = data.offices.filter(i => i.companyId !== id)
                data.offices = [...exclude]
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('company deleted')
                })
            } else {
                res.status(404).send('company not found')
            }
        }, true)
    },

    deleteOffice: (req, res) => {
        readFile(data => {
            let id = parseInt(req.params.id)
            let idx = data.offices.findIndex(i => i.id === id)
            if (idx >= 0) {

                // delete office
                data.offices.splice(idx, 1)
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('office deleted')
                })
            } else {
                res.status(404).send('office not found')
            }
        }, true)
    }

}