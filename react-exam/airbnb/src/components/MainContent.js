import React from 'react'
import Card from './Card'

const cardDetails = {
    rating: 4.98,
    reviews: 130,
    country: 'United States',
    place: 'New York',
    price: 102,
}

const MainContent = () => {
    const numberOfCards = 13
    const cards = [...Array(numberOfCards)]

    const content = cards.map((item, i) => <Card cardDetails={cardDetails} index={i} key={i}/>)

    return (
        <section className='cards'>
            <h1>Plan a trip with help from local Hosts around the world</h1>
            <div className='cards-container'>
                {content}
            </div>
        </section>
    )
}

export default MainContent
