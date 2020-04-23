import React from 'react'

export default ({ id, type, name, placeholder, value, onChange, isValid, invalidMessage, addOnStart, addOnEnd }) => {
    return (
        <div className="input-group">
            {addOnStart ? (
                <div className="input-group-prepend">
                    <span className="input-group-text">{addOnStart}</span>
                </div>
            ) : null}
            <input
                type={type}
                className={`form-control ${isValid === false ? 'is-invalid' : ''}`}
                id={id}
                name={name}
                placeholder={placeholder || name}
                value={value}
                onChange={onChange}
            />
            {addOnEnd ? (
                <div className="input-group-append">
                    <span className="input-group-text">{addOnEnd}</span>
                </div>
            ) : null}
            <div className="invalid-feedback">
                {invalidMessage}
            </div>
        </div>
    )
}
