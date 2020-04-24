import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FormCreateCompany from './Modules/FormCreateCompany'
import FormCreateOffice from './Modules/FormCreateOffice'
import CompanyCards from './Modules/CompanyCards'
import { checkBlank, checkValidCompany, checkValidOffice } from './Helper/Validation'
import formatter from './Helper/Formatter'
import Modal from '../components/Modal'

//actions
import { phoneCodeFetch } from '../store/phoneCode'
import { createCompany, companyFetch, deleteCompany } from '../store/company'
import { createOffice } from '../store/office'

function Home(props) {

    const [modalCreateOffice, setModalCreateOffice] = useState(false)
    const [modalCreateCompany, setModalCreateCompany] = useState(false)
    const [modalRemoveCompany, setModalRemoveCompany] = useState(false)
    const [willDelete, setWillDelete] = useState(null)

    const initialCompany = {
        name: { value: '', isValid: null, message: '' },
        address: { value: '', isValid: null, message: '' },
        revenue: { value: '', isValid: null, message: '' },
        phoneCode: { value: 0, isValid: null, message: '' },
        phoneNumber: { value: '', isValid: null, message: '' }
    }
    const [company, setCompany] = useState(initialCompany)

    const initialOffice = {
        companyId: { value: 0, isValid: null, message: '' },
        name: { value: '', isValid: null, message: '' },
        lat: { value: '', isValid: null, message: '' },
        log: { value: '', isValid: null, message: '' },
        start: { value: '', isValid: null, message: '' }
    }
    const [office, setOffice] = useState(initialOffice)

    const checkValue = e => {
        let name = e.target.name
        let val = e.target.value
        if (name === 'phoneCode' || name === 'companyId') {
            return parseInt(val)
        } else if (name === 'phoneNumber' || name === 'revenue' && val !== '') {
            return parseInt(val)
        } else {
            return val
        }
    }

    const onInputChangeCompany = e => {
        let value = checkValue(e)
        setCompany({ ...company, [e.target.name]: { value, isValid: null, message: '' } })
    }

    const onInputChangeOffice = e => {
        let value = checkValue(e)
        setOffice({ ...office, [e.target.name]: { value, isValid: null, message: '' } })
    }

    const onDateChange = (value, formattedValue) => {
        setOffice({ ...office, start: { value, isValid: null, message: '' } })
    }

    const createCompanyHandler = e => {
        e.preventDefault()
        let isNotBlank = checkBlank(company)
        if (isNotBlank.pass === false) setCompany(isNotBlank.data)
        let isValidCompany = checkValidCompany(company)
        if (isValidCompany.pass === false) setCompany(isValidCompany.data)

        if (isNotBlank.pass && isValidCompany.pass) {
            props.createCompany({
                name: company.name.value,
                address: company.address.value,
                revenue: company.revenue.value,
                phoneCode: company.phoneCode.value,
                phoneNumber: company.phoneNumber.value
            })
            setCompany(initialCompany)
            setModalCreateCompany(true)
        }
    }

    const createOfficeHandler = e => {
        e.preventDefault()
        let isNotBlank = checkBlank(office)
        if (isNotBlank.pass === false) setOffice(isNotBlank.data)
        let isValidOffice = checkValidOffice(office)
        if (isValidOffice.pass === false) setOffice(isValidOffice.data)

        if (isNotBlank.pass && isValidOffice.pass) {
            props.createOffice({
                name: office.name.value,
                lat: parseFloat(office.lat.value),
                log: parseFloat(office.log.value),
                start: office.start.value,
                companyId: office.companyId.value
            })
            setModalCreateOffice(true)
        }
    }

    const btnModalCreateOfficeHandler = () => {
        const id = office.companyId.value
        setOffice(initialOffice)
        setModalCreateOffice(false)
        props.router.push(`/detail?id=${id}`)
    }

    const deleteConfirmation = (id) => {
        setWillDelete(id)
        setModalRemoveCompany(true)
    }

    const removeCompanyHandler = () => {
        props.deleteCompany(willDelete)
        setModalRemoveCompany(false)
        setWillDelete(null)
    }

    const onCardClick = (id) => {
        props.router.push(`/detail?id=${id}`)
    }

    useEffect(() => {
        props.phoneCodeFetch()
        props.companyFetch()
    }, [])

    console.log(company, office)
    return (
        <div className="container-fluid p-0">
            <div className="container-fluid bg-light">
                <div className="container">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg p-4">
                            <FormCreateCompany
                                data={company}
                                phoneCode={props.phoneCode}
                                onChange={onInputChangeCompany}
                                onSubmit={createCompanyHandler}
                            />
                        </div>
                        <div className="border-right"></div>
                        <div className="col-lg p-4">
                            <FormCreateOffice
                                data={office}
                                companies={props.companies.list}
                                onChange={onInputChangeOffice}
                                onDateChange={onDateChange}
                                onSubmit={createOfficeHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="display-4 text-center font-weight-lighter py-4 m-0 text-light">Companies:</h1>
            <div className="container-fluid">
                <div className="container">
                    <CompanyCards
                        data={props.companies}
                        formatter={formatter}
                        onDelete={deleteConfirmation}
                        onCardClick={onCardClick}
                    />
                </div>
            </div>
            <Modal
                isOpen={modalCreateCompany}
                onBtn1={() => setModalCreateCompany(false)}
                btn1Text='OK'
                title="Success"
            >
                <p>New company has been created!</p>
            </Modal>
            <Modal
                isOpen={modalCreateOffice}
                onBtn1={btnModalCreateOfficeHandler}
                btn1Text='OK'
                title="Success"
            >
                <p>New office has been created!</p>
            </Modal>
            <Modal
                isOpen={modalRemoveCompany}
                onBtn1={() => setModalRemoveCompany(false)}
                btn1Text='Cancel'
                onBtn2={removeCompanyHandler}
                btn2Text='Yes'
                title="Alert"
            >
                <p>Do you want to remove this company?</p>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        phoneCode: state.phoneCode,
        companies: state.companies
    }
}

export default connect(mapStateToProps, { phoneCodeFetch, companyFetch, createCompany, createOffice, deleteCompany })(Home)
