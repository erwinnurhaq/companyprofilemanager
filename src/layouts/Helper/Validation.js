module.exports = {
    checkBlank: (i) => {
        let pass = true;
        let data = { ...i }
        for (const key in data) {
            let val = data[key].value
            if (val === '' || val === '0' || val === 0 || val === null) {
                pass = false
                data[key].isValid = false
                data[key].message = 'Please fill the blank'
            }
        }
        return { pass, data }
    },

    checkValidCompany: (company) => {
        let pass = true;
        let data = { ...company }
        if (data.name.value.length < 4) {
            pass = false
            data.name.isValid = false;
            data.name.message = 'Minimal 4 character length'
        }
        if (data.address.value.length < 8) {
            pass = false
            data.address.isValid = false
            data.address.message = 'Minimal 8 character length'
        }
        if (isNaN(data.revenue.value) || data.revenue.value.toString().length < 4) {
            pass = false
            data.revenue.isValid = false
            data.revenue.message = 'Number only and minimal 4 digit'
        }
        if (isNaN(data.phoneNumber.value) || data.phoneNumber.value.toString().length < 8) {
            pass = false
            data.phoneNumber.isValid = false
            data.phoneNumber.message = 'Number only and minimal 8 digit'
        }
        return { pass, data }
    },

    checkValidOffice: (office) => {
        let pass = true;
        let data = { ...office }
        if (data.name.value.length < 4) {
            pass = false
            data.name.isValid = false;
            data.name.message = 'Minimal 4 character length'
        }
        if (isNaN(data.companyId.value)) {
            pass = false
            data.companyId.isValid = false
            data.companyId.message = 'Number only'
        }
        if (isNaN(data.lat.value) || data.lat.value.toString().length < 3) {
            pass = false
            data.lat.isValid = false
            data.lat.message = 'Incorrect format'
        }
        if (isNaN(data.log.value) || data.log.value.toString().length < 3) {
            pass = false
            data.log.isValid = false
            data.log.message = 'Incorrect format'
        }
        return { pass, data }
    }
}