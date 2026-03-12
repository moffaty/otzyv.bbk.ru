import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import '../styles/mainform.css'
import panda1 from '../images/panda1.png'
import panda2 from '../images/panda2.png'
import panda3 from '../images/panda3.png'
import Input from '../components/Input'
import InlineButton from '../components/InlineButton'
import CustomSelect from '../components/CustomSelect'
import Checkbox from '../components/Checkbox'
import YellowButton from '../components/YellowButton'
import { Link, useNavigate } from 'react-router-dom'
import openNewTab from '../utils/OpenNewTab'
import { checkCyrillicName, checkPhone, isEmail, isUrl } from '../utils/regexp'
import { sendPhotoWithDescription } from '../utils/tg'
import { CrossIcon } from '../components/Icons'
import { useRegisterFormMutation } from '../redux/mainApi'

const shops = [
    // {
    //     label: 'Маркетплейсы',
    //     value: 'Маркетплейсы',
    //     disabled: true,
    // },
    { label: 'OZON', value: 'OZON' },
    { label: 'Wildberries', value: 'Wildberries' },
    { label: 'Яндекс Маркет', value: 'Яндекс Маркет' },
    { label: 'МегаМаркет', value: 'МегаМаркет' },
    { label: 'Отзовик', value: 'Отзовик' },
    { label: 'iRecommend.ru', value: 'iRecommend.ru' },
    { label: 'Свой вариант', value: 'Свой вариант' },
    // {
    //     label: 'Магазины:',
    //     value: 'Магазины:',
    //     disabled: true,
    // },
    // { label: 'Энка техника', value: 'Энка техника' },
    // { label: 'Реванш', value: 'Реванш' },
    // { label: 'Техноряд', value: 'Техноряд' },
    // { label: 'Моя Родня', value: 'Моя Родня' },
    // { label: 'Ценалом', value: 'Ценалом' },
    // { label: 'Народная Компания', value: 'Народная Компания' },
    // { label: 'Ашан', value: 'Ашан' },
    // { label: 'Компьютерные системы', value: 'Компьютерные системы' },
    // { label: 'Дешевле.ру', value: 'Дешевле.ру' },
    // { label: 'КомпьютерМаркет', value: 'КомпьютерМаркет' },
    // { label: 'ОНЛАЙН ТРЕЙД.РУ', value: 'ОНЛАЙН ТРЕЙД.РУ' },
    // { label: 'Холодильник.Ру', value: 'Холодильник.Ру' },
    // { label: 'DNS', value: 'DNS' },
    // { label: 'Ситилинк', value: 'Ситилинк' },
]

const products = [
    { label: 'ТВ, аудио, видео:', value: 'ТВ, аудио, видео:', disabled: true },
    { label: 'Bluetooth гарнитура', value: 'Bluetooth гарнитура' },
    { label: 'CD-магнитола', value: 'CD-магнитола' },
    { label: 'USB-магнитола', value: 'USB-магнитола' },
    { label: 'Антенна', value: 'Антенна' },
    { label: 'Караоке DVD-плеер', value: 'Караоке DVD-плеер' },
    { label: 'Карта памяти', value: 'Карта памяти' },
    { label: 'Микрофон', value: 'Микрофон' },
    { label: 'Мини колонка', value: 'Мини колонка' },
    { label: 'Музыкальная система', value: 'Музыкальная система' },
    { label: 'Наушники', value: 'Наушники' },
    { label: 'Ресивер', value: 'Ресивер' },
    { label: 'Телевизор', value: 'Телевизор' },
    { label: 'Телефон', value: 'Телефон' },
    { label: 'Флеш-накопитель', value: 'Флеш-накопитель' },
    {
        label: 'Техника для кухни:',
        value: 'Техника для кухни:',
        disabled: true,
    },
    { label: 'Аэрогриль', value: 'Аэрогриль' },
    { label: 'Блендер', value: 'Блендер' },
    { label: 'Миксер', value: 'Миксер' },
    { label: 'Вакууматор ', value: 'Вакууматор ' },
    { label: 'Гриль', value: 'Гриль' },
    { label: 'Капучинатор', value: 'Капучинатор' },
    { label: 'Кофеварка', value: 'Кофеварка' },
    { label: 'Кухонные весы', value: 'Кухонные весы' },
    { label: 'Микроволновая печь', value: 'Микроволновая печь' },
    { label: 'Мини-печь', value: 'Мини-печь' },
    { label: 'Мультиварка', value: 'Мультиварка' },
    { label: 'Мясорубка', value: 'Мясорубка' },
    { label: 'Соковыжималка', value: 'Соковыжималка' },
    {
        label: 'Сушилка для фруктов и овощей',
        value: 'Сушилка для фруктов и овощей',
    },
    { label: 'Сэндвичница', value: 'Сэндвичница' },
    { label: 'Тостер', value: 'Тостер' },
    { label: 'Чайник', value: 'Чайник' },
    { label: 'Шашлычница', value: 'Шашлычница' },
    { label: 'Электрическая плита', value: 'Электрическая плита' },
    { label: 'Техника для дома:', value: 'Техника для дома:', disabled: true },
    { label: 'Пылесос', value: 'Пылесос' },
    { label: 'Утюг ', value: 'Утюг ' },
    { label: 'Отпариватель', value: 'Отпариватель' },
    {
        label: 'Крупная бытовая техника:',
        value: 'Крупная бытовая техника:',
        disabled: true,
    },
    { label: 'Винный холодильник', value: 'Винный холодильник' },
    { label: 'Морозильная камера', value: 'Морозильная камера' },
    { label: 'Посудомоечная машина', value: 'Посудомоечная машина' },
    { label: 'Холодильник', value: 'Холодильник' },
    {
        label: 'Красота и здоровье:',
        value: 'Красота и здоровье:',
        disabled: true,
    },
    { label: 'Машинка для стрижки волос', value: 'Машинка для стрижки волос' },
    { label: 'Напольные весы', value: 'Напольные весы' },
    { label: 'Плойка для волос', value: 'Плойка для волос' },
    { label: 'Выпрямитель для волос', value: 'Выпрямитель для волос' },
    { label: 'Фен-щетка', value: 'Фен-щетка' },
    { label: 'Фен', value: 'Фен' },
]

const initialFormState = {
    surname: '',
    name: '',
    fathername: '-',
    phone: '',
    email: '',
    vk: '-',
    tg: '-',
    product: '',
    shop: '',
    consentPersonal: false,
    consentContest: false,
    consentDelivery: false,
    model: '',
}

function MainForm() {
    useEffect(() => {
        const codeExist = localStorage.getItem('code')
        if (codeExist) {
            navigate(`/result/${codeExist}`)
        }
    }, [])
    const nameRef = useRef()
    const surnameRef = useRef()
    const phoneRef = useRef()
    const emailRef = useRef()
    const tgRef = useRef()
    const vkRef = useRef()
    const photoRef = useRef()
    const modelRef = useRef()

    const [photo, setPhoto] = useState(null)
    const [photoData, setPhotoData] = useState({
        name: '',
        size: '',
    })

    const [
        postForm,
        {
            data: postedForm,
            isLoading: isFormLoading,
            isError: isFormError,
            error: formError,
            isSuccess: isFormSuccess,
        },
    ] = useRegisterFormMutation()

    useEffect(() => {
        if (isFormSuccess) {
            console.log(postedForm)
            localStorage.setItem('code', postedForm.code)
            navigate(`/result/${postedForm.code}`)
        }
        if (isFormError) {
            alert('Ошибка на стороне сервера! Обратитесь в поддержку')
            setIsLoading(false)
        }
    }, [isFormSuccess, isFormError])

    const navigate = useNavigate()
    const handlePhotoChange = (event) => {
        if (error.length > 0) {
            setError([])
        }
        const fileSizeInBytes = event.target.files[0].size
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024)

        if (fileSizeInMB > 10) {
            setError((prev) => [...prev, 'photo'])
            return alert('Размер фото не должен превышать 10 мегабайт')
        }
        setPhoto(event.target.files[0])
        setPhotoData({
            name: event.target.files[0].name,
            size: `${fileSizeInMB.toFixed(2)} mb`,
        })
    }

    const [form, setForm] = useState(initialFormState)

    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    function handleChangeForm(e) {
        if (error.length > 0) {
            setError([])
        }
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    async function handleSubmit(e) {
        setIsLoading(true)
        const name = form.name.trim()
        const surname = form.surname.trim()
        const fathername = form.fathername.trim()
        if (!form.consentPersonal || !form.consentContest || !form.consentDelivery) {
            setIsLoading(false)
            alert('Необходимо принять все условия и согласия')
            return
        }
        if (Object.values(form).some((v) => !v)) {
            setIsLoading(false)
            alert('Сперва заполните форму!')
            nameRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        if (!photo) {
            setError((prev) => [prev, 'photo'])
            setIsLoading(false)
            alert('Прикрепите скриншот отзыва!')
            photoRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }
        if (!checkCyrillicName(name)) {
            setIsLoading(false)
            setError((prev) => [...prev, 'name'])
            alert(
                'Введите имя используя русский алфавит. Имя может состоять из 2-20 букв без пробелов, допускается тире.'
            )
            nameRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }
        if (!checkCyrillicName(surname)) {
            setIsLoading(false)
            setError((prev) => [...prev, 'surname'])
            alert(
                'Введите фамилию используя русский алфавит. Фамилия может состоять из 2-20 букв без пробелов, допускается тире.'
            )
            surnameRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        if (!checkPhone(form.phone)) {
            setIsLoading(false)
            setError((prev) => [...prev, 'phone'])
            alert(
                'Введите номер телефона без дополнительных символов. Пример: 79161234567'
            )
            phoneRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        if (!form.model) {
            setIsLoading(false)
            setError((prev) => [...prev, 'model'])
            alert('Введите модель!')
            modelRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        if (form.model.length > 20 || form.model.length < 1) {
            setIsLoading(false)
            setError((prev) => [...prev, 'model'])
            alert('Название модели может быть от 1 до 20 символов!')
            modelRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }
        // if (!form.vk) {
        //     setError((prev) => [...prev, 'vk'])
        //     alert('Введите ссылку на вашу страницу Вконтакте')
        //     vkRef.current.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'start',
        //     })
        //     return
        // }
        // if (!form.tg) {
        //     setError((prev) => [...prev, 'tg'])
        //     alert('Введите ссылку на вашу страницу в Телеграм / ваш юзернейм')
        //     tgRef.current.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'start',
        //     })
        //     return
        // }

        if (!form.email) {
            setIsLoading(false)
            setError((prev) => [...prev, 'email'])
            alert('Введите ваш email')
            emailRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        if (!isEmail(form.email)) {
            setIsLoading(false)
            setError((prev) => [...prev, 'email'])
            alert('Введите ваш email в формате username@hosting.com')
            emailRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            return
        }

        const message = `<b>${surname} ${name} ${fathername}</b>\n\n${form.tg}\n${form.vk}\n${form.email}\n${form.phone}\n\n${form.shop}\n${form.product}\n${form.model}`
        const sendingResult = await sendPhotoWithDescription(photo, message)

        if (sendingResult.success) {
            await postForm({
                caption: sendingResult.data.result.caption,
                photo: sendingResult.data.result.photo,
                consentPersonal: form.consentPersonal,
                consentContest: form.consentContest,
                consentDelivery: form.consentDelivery,
                formUrl: window.location.href,
            })
        } else {
            alert('Ошибка на стороне сервера! Обратитесь в поддержку')
            setIsLoading(false)
        }
    }

    function handleChangeProduct(e) {
        setForm((prev) => ({ ...prev, ['product']: e.value }))
    }

    const [customShop, setCustomShop] = useState(false)

    function handleChangeShopCustom(e) {
        setForm((prev) => ({ ...prev, ['shop']: e.target.value }))
    }

    function handleChangeModel(e) {
        setForm((prev) => ({ ...prev, ['model']: e.target.value }))
    }

    function handleToggleCheckbox(field) {
        setForm((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    function handleToggleCustomShop(e) {
        setCustomShop(false)
        setForm((prev) => ({ ...prev, ['shop']: '' }))
    }

    function handleChangeShop(e) {
        if (e.value == 'Свой вариант') {
            setCustomShop(true)
            setForm((prev) => ({ ...prev, ['shop']: '' }))
            return
        }
        setForm((prev) => ({ ...prev, ['shop']: e.value }))
    }

    const loadingState = isLoading || isFormLoading

    return (
        <div className='main-form'>
            <h1 className='title'>АНКЕТА ДЛЯ УЧАСТИЯ В РОЗЫГРЫШЕ</h1>
            <Container direction='row'>
                <div className='form-bg'>
                    <div className='wrap order-box'>
                        <Input
                            selectRef={surnameRef}
                            onChange={handleChangeForm}
                            id='surname'
                            type='name'
                            label='Фамилия *'
                            isError={error.includes('surname')}
                            placeholder='Иванов'
                        />
                        <Input
                            selectRef={nameRef}
                            onChange={handleChangeForm}
                            id='name'
                            type='name'
                            label='Имя *'
                            isError={error.includes('name')}
                            placeholder='Иван'
                        />
                        <Input
                            onChange={handleChangeForm}
                            id='fathername'
                            type='name'
                            label='Отчество'
                            placeholder='Ивановович'
                        />
                        <Input
                            selectRef={phoneRef}
                            onChange={handleChangeForm}
                            id='phone'
                            type='tel'
                            label='Телефон *'
                            isError={error.includes('phone')}
                            placeholder='79161234567'
                        />
                        <Input
                            selectRef={emailRef}
                            onChange={handleChangeForm}
                            id='email'
                            type='email'
                            label='Email *'
                            isError={error.includes('email')}
                            placeholder='username@bbk.ru'
                        />
                    </div>
                </div>
                <img className='panda' src={panda1} />
            </Container>
            <input
                id='fileInput'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
            />
            <Container>
                <img className='panda2' src={panda2} />
                <div className='form-bg-reverse'>
                    <div className='wrap order-box'>
                        <CustomSelect
                            onChange={handleChangeProduct}
                            options={products}
                            label='Товар *'
                            maxHeight='500px'
                        />
                        {customShop ? (
                            <div className='row'>
                                <Input
                                    className='full'
                                    id='shop'
                                    type='text'
                                    label='Где размещен отзыв *'
                                    onChange={handleChangeShopCustom}
                                />
                                <button
                                    className='cross'
                                    onClick={handleToggleCustomShop}
                                >
                                    <CrossIcon />
                                </button>
                            </div>
                        ) : (
                            <CustomSelect
                                onChange={handleChangeShop}
                                options={shops}
                                label='Где размещен отзыв *'
                            />
                        )}
                        <Input
                            className='full'
                            id='model'
                            selectRef={modelRef}
                            placeholder='BHP-122'
                            type='text'
                            isError={error.includes('model')}
                            label='Модель *'
                            onChange={handleChangeModel}
                        />
                        <div>
                            <InlineButton
                                onClick={() =>
                                    document.getElementById('fileInput').click()
                                }
                                label='Скриншот отзыва *'
                                selectRef={photoRef}
                                isError={error.includes('photo')}
                            >
                                {!photoData?.name
                                    ? 'Загрузить фото'
                                    : 'Заменить фото'}
                            </InlineButton>
                            {photoData?.name ? (
                                <>
                                    <br />
                                    <Container
                                        direction='column'
                                        justify='center'
                                        align='center'
                                        className='photo-container'
                                    >
                                        <p>{photoData.name}</p>
                                        <p className='normal'>
                                            {photoData.size}
                                        </p>
                                    </Container>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <Container direction='column'>
                <Container>
                    <div className='form-bg'>
                        <div className='wrap'>
                            <InlineButton
                                onClick={() =>
                                    openNewTab('https://vk.com/bbk_electronics')
                                }
                                label='Подписаться на Вконтакте'
                            >
                                Перейти
                            </InlineButton>
                            <InlineButton
                                onClick={() =>
                                    openNewTab('https://t.me/bbkrecipes')
                                }
                                label='Подписаться на Телеграм'
                            >
                                Перейти
                            </InlineButton>
                            <Input
                                onChange={handleChangeForm}
                                id='vk'
                                type='url'
                                label='Ваша ссылка на Вконтакте'
                                selectRef={vkRef}
                                isError={error.includes('vk')}
                                placeholder='vk.com/username'
                            />
                            <Input
                                onChange={handleChangeForm}
                                id='tg'
                                type='url'
                                label='Ваша ссылка на Телеграм'
                                selectRef={tgRef}
                                isError={error.includes('tg')}
                                placeholder='@username / tg.me/username'
                            />
                        </div>
                    </div>
                    <img className='panda' src={panda3} />
                </Container>
                <Container direction='column' className='dialogue-bg'>
                    <Container>
                        <Checkbox
                            onClick={() => handleToggleCheckbox('consentPersonal')}
                            isActive={form.consentPersonal}
                        />
                        <p className='normal'>
                            Я даю согласие на обработку персональных данных в соответствии с{' '}
                            <Link
                                to='/privacy-policy'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Политикой конфиденциальности
                            </Link>
                        </p>
                    </Container>

                    <Container>
                        <Checkbox
                            onClick={() => handleToggleCheckbox('consentContest')}
                            isActive={form.consentContest}
                        />
                        <p className='normal'>
                            Я принимаю{' '}
                            <Link
                                to='/contest-rules'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                условия участия в конкурсе
                            </Link>
                        </p>
                    </Container>

                    <Container>
                        <Checkbox
                            onClick={() => handleToggleCheckbox('consentDelivery')}
                            isActive={form.consentDelivery}
                        />
                        <p className='normal'>
                            Я согласен на передачу моих данных курьерской службе для доставки приза{' '}
                            (<Link
                                to='/consent-delivery'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                подробнее
                            </Link>)
                        </p>
                    </Container>
                    <br />
                    <YellowButton
                        onClick={handleSubmit}
                        isLoading={loadingState}
                    >
                        {loadingState
                            ? 'ЗАГРУЖАЕМ...'
                            : 'ПОЛУЧИТЬ ИНДИВИДУАЛЬНЫЙ НОМЕР'}
                    </YellowButton>
                </Container>
            </Container>
        </div>
    )
}

export default MainForm
