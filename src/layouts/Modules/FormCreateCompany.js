import React from 'react'
import Input from '../../components/Input'
import FormContainer from '../../components/FormContainer'

const FormCreateCompany = ({ data, phoneCode, onChange, onSubmit }) => {

    const renderPhoneCode = () => phoneCode ? phoneCode.map((code, idx) => (
        <option key={idx} value={code.callingCodes}>
            {`${code.name} (+${code.callingCodes})`}
        </option>
    )) : null

    return (
        <FormContainer
            formTitle='Create Company'
            buttonText='Create'
            buttonClick={onSubmit}
        >
            <div className="form-group">
                <label htmlFor='companyNameInput'>Name:</label>
                <Input
                    type='text'
                    name='name'
                    id='companyNameInput'
                    value={data.name.value}
                    onChange={onChange}
                    isValid={data.name.isValid}
                    invalidMessage={data.name.message}
                />
            </div>
            <div className="form-group">
                <label htmlFor='companyAddressInput'>Address:</label>
                <Input
                    type='text'
                    name='address'
                    id='companyAddressInput'
                    value={data.address.value}
                    onChange={onChange}
                    isValid={data.address.isValid}
                    invalidMessage={data.address.message}
                />
            </div>
            <div className="form-group">
                <label htmlFor='companyRevenueInput'>Revenue:</label>
                <Input
                    type='number'
                    name='revenue'
                    id='companyRevenueInput'
                    value={data.revenue.value}
                    onChange={onChange}
                    isValid={data.revenue.isValid}
                    invalidMessage={data.revenue.message}
                    addOnStart="$"
                    addOnEnd=".00"
                />
            </div>
            <div className="form-group">
                <label htmlFor='companyPhoneInput'>Phone:</label>
                <div className="row">
                    <div className="col-md-5">
                        <select
                            className={`form-control ${data.phoneCode.isValid === false ? 'is-invalid' : ''}`}
                            name="phoneCode"
                            id='companyPhoneCodeInput'
                            value={data.phoneCode.value}
                            onChange={onChange}
                        >
                            <option value={0}>Please Select Code:</option>
                            {renderPhoneCode()}
                        </select>
                        <div className="invalid-feedback">
                            {data.phoneCode.message}
                        </div>
                    </div>
                    <div className="col-md-7">
                        <Input
                            type='number'
                            name='phoneNumber'
                            id='companyPhoneInput'
                            placeholder="number"
                            value={data.phoneNumber.value}
                            onChange={onChange}
                            isValid={data.phoneNumber.isValid}
                            invalidMessage={data.phoneNumber.message}
                        />
                    </div>
                </div>
            </div>
        </FormContainer>
    )
}

export default FormCreateCompany
