import React from 'react'

function Container({
    children,
    direction = 'row',
    align = 'center',
    justify = 'center',
    gap = '20px',
    width = '100%',
    className = '',
}) {
    const style = {
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap: gap,
        width: width,
    }

    return (
        <div className={`container ${className}`} style={style}>
            {children}
        </div>
    )
}

export default Container
