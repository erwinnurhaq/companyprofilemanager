import React from 'react'
import ButtonFluid from './ButtonFluid'

const FormContainer = React.forwardRef(({ children, formTitle, buttonText, buttonClick }, ref) => {
    return (
        <div>
            <h2 className="font-weight-lighter pb-2">{formTitle}</h2>
            <form ref={ref} className="needs-validation" onSubmit={buttonClick} noValidate>
                {children}
                <ButtonFluid >{buttonText}</ButtonFluid>
            </form>
        </div>
    )
})

export default FormContainer