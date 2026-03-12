import React from 'react'
import '../styles/invisiblebuttons.css'

function InvisibleButton({ children, onClick }) {
    return (
        <button onClick={onClick} className='invisible-button'>
            {children}
        </button>
    )
}

export default InvisibleButton
