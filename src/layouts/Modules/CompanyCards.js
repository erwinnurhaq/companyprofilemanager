import React from 'react'
import Card from '../../components/Card'

export default (props) => {

    const renderCards = () => props.data.list.length > 0 ? props.data.list.map(company => (
        <Card
            key={company.id}
            title={company.name}
            onDelete={() => props.onDelete(company.id)}
            onCardClick={() => props.onCardClick(company.id)}
        >
            <p className="card-title mb-0 font-weight-bold">Address:</p>
            <p className="card-text">{company.address}</p>
            <p className="card-title mb-0 font-weight-bold">Revenue:</p>
            <p className="card-text">{props.formatter.format(company.revenue)}</p>
            <p className="card-title mb-0 font-weight-bold">Phone No:</p>
            <p className="card-text">{`(+${company.phoneCode}) ${company.phoneNumber}`}</p>
        </Card>
    )) : (
            <div className="col p-5">
                <h1 className="font-weight-lighter text-center text-light">There is no companies created yet</h1>
            </div>
        )

    return (
        <div className="row pt-4 pb-5">
            {renderCards()}
        </div>
    )
}
