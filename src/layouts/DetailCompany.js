import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import formatter from './Helper/Formatter'
import OfficeCards from './Modules/OfficeCards'
import Modal from '../components/Modal'
import { companyFetch } from '../store/company'
import { officeFetch, deleteOffice } from '../store/office'

function DetailCompany(props) {

    const { id } = props.location.query
    const [modalRemoveOffice, setModalRemoveOffice] = useState(false)
    const [willDelete, setWillDelete] = useState(null)
    const [company, setCompany] = useState(null)

    const removeOfficeHandler = () => {
        props.deleteOffice(willDelete, parseInt(id))
        setModalRemoveOffice(false)
        setWillDelete(null)
    }

    const deleteConfirmation = (id) => {
        setWillDelete(id)
        setModalRemoveOffice(true)
    }

    useEffect(() => {
        if (props.companies.list.length === 0) props.companyFetch()
        props.officeFetch(id)
    }, [])

    useEffect(() => {
        setCompany(props.companies.list.filter(i => i.id === parseInt(id))[0])
    }, [props.companies.list])

    if (id && company) {
        return (
            <div className="container-fluid p-0">
                <div className="container-fluid bg-light">
                    <div className="container">
                        <div className="row justify-content-center py-5">
                            <div className="col-lg py-4">
                                <h1 className="display-4">{company.name}</h1>
                                <hr />
                                <div className="pb-2">
                                    <h5 className="font-weight-bold">Address:</h5>
                                    <p>{company.address}</p>
                                </div>
                                <div className="pb-2">
                                    <h5 className="font-weight-bold">Revenue:</h5>
                                    <p>{formatter.format(company.revenue)}</p>
                                </div>
                                <div className="pb-2">
                                    <h5 className="font-weight-bold">Phone No:</h5>
                                    <p>{`(+${company.phoneCode}) ${company.phoneNumber}`}</p>
                                </div>
                                <div className="text-right">
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => props.router.push('/')}
                                    >
                                        Back to Overview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="display-4 text-center font-weight-lighter py-4 m-0 text-light">Offices:</h1>
                <div className="container-fluid">
                    <div className="container">
                        <OfficeCards
                            data={props.offices}
                            onDelete={deleteConfirmation}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={modalRemoveOffice}
                    onBtn1={() => setModalRemoveOffice(false)}
                    btn1Text='Cancel'
                    onBtn2={removeOfficeHandler}
                    btn2Text='Yes'
                    title="Alert"
                >
                    <p>Do you want to remove this office?</p>
                </Modal>
            </div>
        )
    } else {
        return (
            <h1>Company is not found</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        companies: state.companies,
        offices: state.offices
    }
}

export default connect(mapStateToProps, { companyFetch, officeFetch, deleteOffice })(DetailCompany)
