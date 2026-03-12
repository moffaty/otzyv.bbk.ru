import React, { useEffect, useState } from 'react'
import '../styles/admin.css'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom'
import {
    useApproveFormMutation,
    useDeleteFormMutation,
    useLazyGetFormsQuery,
} from '../redux/mainApi'
const correctPassword = 'VrA7uS6UAbcS37R'
import { Button, Pagination, Popconfirm } from 'antd'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import Loading from '../components/Loading'
import { Radio } from 'antd'

const radioOptions = [
    {
        label: 'Новые',
        value: false,
    },
    {
        label: 'Проверенные',
        value: true,
    },
]

function Admin() {
    const [authorized, setIsAuthorized] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(6)
    const navigate = useNavigate()
    const [radioValue, setRadioValue] = useState(radioOptions[0].value)

    function handleChangeRadio(e) {
        console.log(e.target.value)
        setRadioValue(e.target.value)
    }

    useEffect(() => {
        const userPassword = prompt('Введите пароль:')

        if (userPassword === correctPassword) {
            setIsAuthorized(true)
            loadProfiles(currentPage)
        } else {
            alert('Неверный пароль')
            navigate('/')
        }
    }, [])

    const loadProfiles = (page) => {
        fireFormsQuery({
            pwd: correctPassword,
            perPage: pageSize,
            formStatus: radioValue,
            page,
        })
    }
    const [
        fireFormsQuery,
        {
            data: forms,
            isLoading: isFormsLoading,
            error: formsError,
            isError: isFormsError,
            isSuccess: isFormsSuccess,
            isFetching: isFormsFetching,
        },
    ] = useLazyGetFormsQuery()

    const [
        triggerDeleteForm,
        {
            data: deletedForm,
            isLoading: isFormDeleting,
            isError: isFormError,
            isSuccess: isFormSuccess,
            error: formError,
        },
    ] = useDeleteFormMutation()

    const [
        triggerApproveForm,
        {
            data: approvedForm,
            isLoading: isApprovingForm,
            isError: isApprovingError,
            isSuccess: isApprovingSuccess,
            error: approvingError,
        },
    ] = useApproveFormMutation()

    const handlePageChange = (page) => {
        setCurrentPage(page)
        loadProfiles(page)
    }

    async function handleApprove(id) {
        await triggerApproveForm({
            pwd: correctPassword,
            formId: id,
        })
        fireFormsQuery({
            pwd: correctPassword,
            perPage: pageSize,
            page: currentPage,
            formStatus: radioValue,
        })
    }

    async function handleDeleteForm(id) {
        await triggerDeleteForm({
            pwd: correctPassword,
            formId: id,
        })
        fireFormsQuery({
            pwd: correctPassword,
            perPage: pageSize,
            page: currentPage,
            formStatus: radioValue,
        })
    }

    useEffect(() => {
        loadProfiles(currentPage)
    }, [radioValue])

    if (isFormDeleting || isFormsLoading || isFormsFetching) return <Loading />
    const formsExist = forms?.forms.length > 0

    return !authorized ? (
        <div></div>
    ) : (
        <div className='admin'>
            <Radio.Group
                options={radioOptions}
                onChange={handleChangeRadio}
                value={radioValue}
                defaultValue={radioValue}
                optionType='button'
                buttonStyle='solid'
            />
            <h1>Список анкет</h1>
            {!formsExist ? (
                <div className='admin'>Еще нет ни одной формы</div>
            ) : null}
            <div className='forms'>
                {forms?.forms.map((f) => {
                    return (
                        <div key={f.id} className='forms__item'>
                            <div className='forms__item__row'>
                                <PhotoProvider>
                                    <PhotoView
                                        src={`data:image/jpeg;base64,${f.photo}`}
                                    >
                                        <img
                                            loading='lazy'
                                            className='forms__item__preview'
                                            src={`data:image/jpeg;base64,${f.photo}`}
                                            alt={`фото анкеты ${f.id}`}
                                        ></img>
                                    </PhotoView>
                                </PhotoProvider>
                                <div className='forms__item__text-container'>
                                    {f.caption
                                        .split('\n')
                                        .map((item, index) => {
                                            return (
                                                <p
                                                    className='forms__item__text'
                                                    key={index}
                                                >
                                                    {item}
                                                </p>
                                            )
                                        })}
                                    <br />
                                    <p className='forms__code'>{f.code}</p>
                                </div>
                            </div>
                            <div className='forms__item__row'>
                                {!radioValue ? (
                                    <>
                                        <Popconfirm
                                            title='Удалить анкету?'
                                            description='Вы уверены?'
                                            onConfirm={() =>
                                                handleDeleteForm(f.id)
                                            }
                                        >
                                            <Button danger type='primary'>
                                                Удалить
                                            </Button>
                                        </Popconfirm>
                                        <Popconfirm
                                            title='Одобрить анкету?'
                                            description='Вы уверены?'
                                            onConfirm={() =>
                                                handleApprove(f.id)
                                            }
                                        >
                                            <Button type='primary'>
                                                Одобрить
                                            </Button>
                                        </Popconfirm>
                                    </>
                                ) : (
                                    <Popconfirm
                                        title='Удалить анкету?'
                                        description='Вы уверены?'
                                        onConfirm={() => handleDeleteForm(f.id)}
                                    >
                                        <Button danger type='primary'>
                                            Удалить
                                        </Button>
                                    </Popconfirm>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Pagination
                className='forms__pagination'
                current={currentPage}
                pageSize={pageSize}
                total={forms?.totalCount ? forms.totalCount / 6 : 0}
                showSizeChanger={false}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Admin

// сделать функционал удаления анкеты
// сделать функционал розыгрыша (рандомный выброр анкеты)
