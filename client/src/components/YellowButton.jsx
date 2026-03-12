import React from 'react'
import '../styles/yellowbutton.css'

function YellowButton({ onClick, children, isLoading = false, className }) {
    const clsName = `yellow-button ${className ? className : null}`
    return (
        <button className={clsName} onClick={onClick} disabled={isLoading}>
            {children}
        </button>
    )
}

export default YellowButton
