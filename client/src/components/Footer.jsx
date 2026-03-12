import React from 'react'
import { TGIcon, VKIcon, BBKIcon } from './Icons'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/footer.css'
import openNewTab from '../utils/OpenNewTab'
import InvisibleButton from './InvisibleButton'
import Container from './Container'

function Footer() {
    const navigate = useNavigate()

    return (
        <footer>
            <div className='footer-buttons'>
                <RoundButton
                    onClick={() => openNewTab('https://t.me/bbkrecipes')}
                >
                    <TGIcon />
                </RoundButton>
                <RoundButton
                    onClick={() => openNewTab('https://vk.com/bbk_electronics')}
                >
                    <VKIcon />
                </RoundButton>
            </div>
            <div className='footer-container'>
                <div className='footer-text'>
                    <Link to='https://otzyv.bbk.ru/conditions' target='_blank'>
                        Условия конкурса и правила выдачи призов
                    </Link>
                    <Link
                        to='https://otzyv.bbk.ru/politika_v_otnoshenii_obrabotki_personalnyh_dannyh'
                        target='_blank'
                    >
                        Политика конфиденциальности
                    </Link>
                </div>
                <div className='footer-text'>
                    <p className='bold'>Связаться</p>
                    <p>bbk.otzyv@gmail.com</p>
                </div>
            </div>
            <InvisibleButton
                onClick={() => openNewTab('https://otzyv.bbk.ru/')}
            >
                <BBKIcon />
            </InvisibleButton>
        </footer>
    )
}

export default Footer

function RoundButton({ children, onClick }) {
    return (
        <button className='round-button' onClick={onClick}>
            {children}
        </button>
    )
}
