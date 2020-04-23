import React from 'react'
import Card from '../../components/Card'

export default (props) => {

    const renderCards = () => props.data.list.length > 0 ? props.data.list.map(office => (
        <Card
            key={office.id}
            title={office.name}
            onDelete={() => props.onDelete(office.id)}
            onCardClick={() => console.log(office.id)}
        >
            <p className="card-title mb-0 font-weight-bold">Location:</p>
            <p className="card-text mb-0">Latitude - {office.lat}</p>
            <p className="card-text">Longitude - {office.log}</p>
            <p className="card-title mb-0 font-weight-bold">Office Start Date:</p>
            <p className="card-text">{office.start}</p>
        </Card>
    )) : (
            <div className="col p-5">
                <h1 className="font-weight-lighter text-center text-light">There is no office created yet</h1>
            </div>
        )

    return (
        <div className="row pt-4 pb-5">
            {renderCards()}
        </div>
    )
}
