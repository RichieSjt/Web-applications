import React from 'react'
import Card from './Card'
import data from '../data/data'

const MainContent = () => {
    const content = data.map((item, i) => <Card cardDetails={item} id={item.id} key={i}/>)

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
