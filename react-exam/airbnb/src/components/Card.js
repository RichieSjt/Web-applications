import React from 'react'

import starIcon from '../icons/star.svg'
import heartIcon from '../icons/heart.svg'


const Card = ({ cardDetails, index }) => {
    const { rating, reviews, country, place, price } = cardDetails

    return (
        <div className='card'>
            <img src={`https://picsum.photos/240/340?r=${index}`} className='card-image' alt='place'/>
            <img src={heartIcon} className='like' alt='heart icon'/>
            <img src={starIcon} className='star' alt='star icon'/>
            <span className='rating'>{rating}</span>
            <span className='reviews'>({reviews})</span>
            <span className='country'>· {country}</span>
            <p className='place'>Plan The Perfect {place} Vacation</p>
            <p className='price'>
                From ${price} MXN / <span>person</span>
            </p>
        </div>
    )
}

export default Card