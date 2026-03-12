import React from 'react'
import '../styles/finale.css'
import panda3 from '../images/panda3.png'
import { VKIcon, TGIcon } from '../components/Icons'
import { COLORS } from '../utils/COLORS'

function Finale() {
    return (
        <div className='finale'>
            <div className='form-bg finale__container'>
                <h1 className='finale-title'>всех благодарим за участие!</h1>
                <div className='finale__sub'>
                    <div className='form-bg finale__container__dialogue'>
                        <p>
                            Следите за новостями в наших социальных сетях, чтобы
                            не пропустить следующие розыгрыши!
                        </p>
                        <div className='finale__icon-holder'>
                            <VKIcon
                                bg_col={COLORS.black}
                                fg_col={COLORS.yellow}
                            />
                            <TGIcon
                                bg_col={COLORS.black}
                                fg_col={COLORS.yellow}
                            />
                        </div>
                    </div>
                    <img className='panda' src={panda3} />
                </div>
            </div>
        </div>
    )
}

export default Finale
