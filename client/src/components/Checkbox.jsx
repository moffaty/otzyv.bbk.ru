// import React from 'react'

// function Checkbox() {
//     return <input className='checkbox' type='checkbox'></input>
// }

// export default Checkbox

import React, { useState } from 'react'
import { COLORS } from '../utils/COLORS'

function Checkbox({ onClick, isActive }) {
    return (
        <button className='checkbox' onClick={onClick}>
            {isActive ? (
                <svg
                    width='25'
                    height='26'
                    viewBox='0 0 25 26'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M8.05502 22.1983C7.58554 22.1983 7.13378 22.0123 6.80248 21.6792L1.51953 16.3962C0.826825 15.7035 0.826825 14.5839 1.51953 13.8912C2.21223 13.1985 3.33189 13.1985 4.02459 13.8912L8.05502 17.9216L20.9754 5.00122C21.6681 4.30851 22.7878 4.30851 23.4805 5.00122C24.1732 5.69392 24.1732 6.81358 23.4805 7.50628L9.30755 21.6792C8.97449 22.0123 8.5245 22.1983 8.05502 22.1983Z'
                        fill={COLORS.grad_blue}
                    />
                </svg>
            ) : null}
        </button>
    )
}

export default Checkbox
