import React from 'react'
import deleteLogo from './SVG/x.svg';

export default ({ title, onDelete, onCardClick, children }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card bg-light mb-3" >
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="m-0">{title}</h4>
                    <button
                        type="button"
                        className="btn p-1 btn-info rounded-circle"
                        onClick={onDelete}
                    >
                        <img src={deleteLogo} alt="Delete Logo" />
                    </button>
                </div>
                <div
                    type="button"
                    onClick={onCardClick}
                    className="btn btn-light text-left card-body py-4"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

