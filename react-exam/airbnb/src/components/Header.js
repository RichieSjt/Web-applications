import React from 'react'

import logo from '../icons/airbnb-logo.png'
import menuIcon from '../icons/menu.svg'
import worldIcon from '../icons/world.svg'

const Header = () => {
    return (
        <header>
            <a href='#.'>
                <img src={logo} alt='airbnb logo' className='airbnb-logo' />
            </a>
            <nav>
                <h1>Become a Host</h1>
                <img src={worldIcon} alt='world icon' />
                <div className='user'>
                    <img src={menuIcon} alt='menu icon' className='menu' />
                    <img
                        src='https://picsum.photos/200'
                        alt='user icon'
                        className='user-pic'
                    />
                </div>
            </nav>
        </header>
    )
}

export default Header