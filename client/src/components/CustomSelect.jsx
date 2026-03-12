import React, { memo, useEffect, useState } from 'react'
import Select from 'react-select'
import '../styles/input.css'
import { COLORS } from '../utils/COLORS'

const defaultoptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

function CustomSelect({
    options,
    placeholder = 'Выберите из списка',
    label,
    onChange,
    maxHeight = 'none',
}) {
    const sOptions = options ? options : defaultoptions

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const customStyles = {
        menu: (provided, state) => {
            // console.log(state)
            return {
                ...provided,

                // minHeight: '100%',
                maxHeight: maxHeight,
            }
        },
        menuList: (provided, state) => ({
            ...provided,
            // minHeight: '100%',
            maxHeight: maxHeight,
        }),
        option: (provided, state) => {
            return {
                ...provided,
                color: state.isDisabled == true ? COLORS.white : COLORS.black,
                backgroundColor:
                    state.isDisabled == true ? COLORS.black : COLORS.white,

                '&:hover': {
                    backgroundColor: state.isDisabled
                        ? COLORS.black
                        : COLORS.grad_blue,
                },
            }
        },
        control: (provided, state) => {
            return {
                ...provided,
                height: windowWidth > 1300 ? '65px' : '50px',
                minWidth: state.isSelected ? '200px' : '200px', // Dynamic width based on state
                width: state.isSelected ? '100%' : '100%', // Dynamic width based on state
                flex: '1',
                borderRadius: windowWidth > 1300 ? '15px' : '12px',
                border: '2px solid black',
                boxSizing: 'border-box',
                '&:hover': {
                    border: '2px solid black',
                },
            }
        },
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []) // Empty dependency array ensures that this effect runs only once

    return (
        <span className='custom-select'>
            {label ? <label className='label'>{label}</label> : null}
            <Select
                isOptionDisabled={(option) => option.disabled == true}
                className='select'
                styles={customStyles}
                options={sOptions}
                placeholder={placeholder}
                onChange={onChange}
                // menuPosition='fixed'
            />
        </span>
    )
}

export default CustomSelect
