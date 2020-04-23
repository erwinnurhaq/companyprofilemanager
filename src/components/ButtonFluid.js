import React from 'react'

export default ({ color, children }) => {
    return (
        <button
            type="submit"
            className={`btn ${color ? color : 'btn-dark'} w-100 my-2 p-2`}
        >
            {children}
        </button>
    )
}
