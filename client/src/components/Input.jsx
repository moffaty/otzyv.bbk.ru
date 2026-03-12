import React from 'react'
import '../styles/input.css'

function Input({
    placeholder,
    label,
    type,
    id,
    onChange,
    isError,
    selectRef,
    className,
}) {
    return (
        <span className={`custom-input ${className}`} ref={selectRef}>
            {label ? (
                <label className={`label ${isError ? 'error-label' : ''}`}>
                    {label}
                </label>
            ) : null}
            <input
                className={isError ? 'error-input' : ''}
                onChange={onChange}
                id={id}
                type={type}
                placeholder={placeholder}
            ></input>
        </span>
    )
}

export default Input
