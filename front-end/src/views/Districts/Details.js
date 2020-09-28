import React from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {
    const params = useParams();
    console.log(params)
    const { id } = params;
    return <div>{id}</div>
}

export default Details;