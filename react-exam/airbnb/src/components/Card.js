import React from 'react'

import starIcon from '../icons/star.svg'
import heartIcon from '../icons/heart.svg'


const Card = ({ cardDetails, id }) => {
    const { title, description, price, stats, coverImg, location } = cardDetails

    return (
        <div className='card'>
            <img src={`https://picsum.photos/240/340?r=${coverImg}`} className='card-image' alt='place'/>
            <img src={heartIcon} className='like' alt='heart icon'/>
            <img src={starIcon} className='star' alt='star icon'/>
            <span className='rating'>{stats.rating}</span>
            <span className='reviews'>({stats.reviewCount})</span>
            <span className='country'>· {location}</span>
            <p className='place'>{title}</p>
            <p className='price'>
                From ${price} MXN / <span>person</span>
            </p>
        </div>
    )
}

export default Card