import React from 'react'
import { FormGroup, Label, FormText } from 'reactstrap'
import DatePicker from "reactstrap-date-picker"
import Input from '../../components/Input'
import FormContainer from '../../components/FormContainer'

const FormCreateOffice = ({ data, companies, onChange, onDateChange, onSubmit }) => {

    const renderCompaniesList = () => companies ? companies.map((company, idx) => (
        <option key={idx} value={company.id}>
            {company.name}
        </option>
    )) : null

    return (
        <FormContainer
            formTitle='Create Office'
            buttonText='Create'
            buttonClick={onSubmit}
        >
            <div className="form-group">
                <label htmlFor='officeNameInput'>Name:</label>
                <Input
                    type='text'
                    name='name'
                    id='officeNameInput'
                    value={data.name.value}
                    onChange={onChange}
                    isValid={data.name.isValid}
                    invalidMessage={data.name.message}
                />
            </div>
            <div className="form-group">
                <label>Location:</label>
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type='number'
                            name='lat'
                            id='officeLatitude'
                            placeholder="latitude"
                            value={data.lat.value}
                            onChange={onChange}
                            isValid={data.lat.isValid}
                            invalidMessage={data.lat.message}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type='number'
                            name='log'
                            id='officeLongitude'
                            placeholder="longitude"
                            value={data.log.value}
                            onChange={onChange}
                            isValid={data.log.isValid}
                            invalidMessage={data.log.message}
                        />
                    </div>
                </div>
            </div>
            <FormGroup>
                <Label>Office Start Date:</Label>
                <DatePicker
                    id="officeStartDate"
                    className={`form-control ${data.start.isValid === false ? 'is-invalid' : ''}`}
                    value={data.start.value}
                    onChange={(v, f) => onDateChange(v, f)}
                />
                <div className="invalid-feedback">
                    {data.start.message}
                </div>
            </FormGroup>
            <div className="form-group">
                <label htmlFor='officeCompanyId'>Company:</label>
                <select
                    className={`form-control ${data.companyId.isValid === false ? 'is-invalid' : ''}`}
                    name="companyId"
                    id='officeCompanyId'
                    value={data.companyId.value}
                    onChange={onChange}
                >
                    <option value={0}>Please Select Company:</option>
                    {renderCompaniesList()}
                </select>
                <div className="invalid-feedback">
                    {data.companyId.message}
                </div>
            </div>
        </FormContainer>
    )
}

export default FormCreateOffice
