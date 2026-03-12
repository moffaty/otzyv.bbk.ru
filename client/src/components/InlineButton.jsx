import React from 'react'
import '../styles/inlinebutton.css'

function InlineButton({ children, label, onClick, isError, selectRef }) {
    return (
        <span className='inline-button-parent' ref={selectRef}>
            {label ? <label className='label'>{label}</label> : null}
            <button
                onClick={onClick}
                className={`inline-button ${isError ? 'inline-error' : ''}`}
            >
                {children}
            </button>
        </span>
    )
}

export default InlineButton
