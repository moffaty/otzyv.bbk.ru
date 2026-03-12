import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/result.css'
import Container from '../components/Container'
import panda from '../images/panda3.png'

function Result() {
    const { code } = useParams()
    return (
        <div className='result'>
            <p className='result-title'>Ваш индивидуальный номер участника</p>
            <Container className='container-panda' gap='50px'>
                <div className='form-bg center'>
                    <p className='result-text'>{code}</p>
                </div>
                <br />
                <img src={panda} className='panda3' />
            </Container>
        </div>
    )
}

export default Result
