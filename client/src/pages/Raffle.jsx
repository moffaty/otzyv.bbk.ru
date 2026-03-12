import React, { useEffect, useState } from 'react'
import '../styles/raffle.css'
import YellowButton from '../components/YellowButton'
import { useGetRandomFormQuery } from '../redux/mainApi'
const pwd = 'VrA7uS6UAbcS37R'
import prize_1 from '../images/p1.png'
import prize_2 from '../images/p2.png'
import prize_3 from '../images/p3.png'
import prize_4 from '../images/p4.png'
import prize_5 from '../images/p5.png'
import { useNavigate } from 'react-router-dom'

const initPrizes = [
    { prize_img: prize_1, code: null },
    { prize_img: prize_2, code: null },
    { prize_img: prize_3, code: null },
    { prize_img: prize_4, code: null },
    { prize_img: prize_5, code: null },
]

function Raffle() {
    const [prizes, setPrizes] = useState(initPrizes)
    const [preventFetch, setPreventFetch] = useState(true)
    const [raffleOver, setRaffleOver] = useState(false)
    const navigate = useNavigate()

    const {
        isLoading: isGettingRandomForm,
        isError: isFormError,
        isSuccess: isFormSuccess,
        data: randomForm,
        error: formError,
        isFetching: isFetchingRandomForm,
        refetch: refetchRandomForm,
    } = useGetRandomFormQuery(pwd, {
        skip: preventFetch,
    })

    const [blueCode, setBlueCode] = useState(0)

    useEffect(() => {
        if (isFormError) {
            if (formError.status == 409) {
                setRaffleOver(true)
            }
        }
    }, [isFormError])

    async function handleRaffle(e) {
        setPreventFetch(false)
        if (!preventFetch) {
            await refetchRandomForm()
        }
    }

    const [count, setCount] = useState(0)

    useEffect(() => {
        if (randomForm) {
            setBlueCode(randomForm.code)
            setCount((prev) => prev + 1)
            setPrizes((prev) => {
                const unselected = prev.filter((p) => p.code == null)
                if (unselected.length) {
                    unselected[0].code = randomForm.code
                    return prev
                }
                return prev
            })
        }
    }, [randomForm])

    useEffect(() => {
        if (count === 5) {
            setRaffleOver(true)
        }
    }, [count])

    function handleFinishRaffle(e) {
        navigate('/finale')
    }

    return (
        <div className='raffle'>
            <div className='form-bg raffle__container'>
                <h1 className='raffle-title'>Случайный номер</h1>
                <h1 className='result-text raffle-result-text'>{blueCode}</h1>
                <YellowButton onClick={handleRaffle}>
                    Сгенерировать
                </YellowButton>
                <div className='raffle__winners'>
                    {prizes.map((item, index) => {
                        return (
                            <div
                                className='raffle__winners__winner'
                                key={index}
                            >
                                <img src={item.prize_img} />

                                <p className='code'>
                                    {item.code ? item.code : null}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <br />
                {!raffleOver ? null : (
                    <YellowButton
                        onClick={handleFinishRaffle}
                        className='end-raffle-btn'
                    >
                        Завершить розыгрыш!
                    </YellowButton>
                )}
            </div>
        </div>
    )
}

export default Raffle
