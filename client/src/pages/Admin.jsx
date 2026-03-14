import React, { useEffect, useState } from 'react'
import '../styles/admin.css'
import { useNavigate } from 'react-router-dom'
import {
    useApproveFormMutation,
    useDeleteFormMutation,
    useLazyGetFormsQuery,
    useLazyGetConsentLogsQuery,
} from '../redux/mainApi'
const correctPassword = 'VrA7uS6UAbcS37R'
import { Button, Pagination, Popconfirm, Radio, Table, Tag } from 'antd'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import Loading from '../components/Loading'

const radioOptions = [
    { label: 'Новые', value: false },
    { label: 'Проверенные', value: true },
]

const tabOptions = [
    { label: 'Анкеты', value: 'forms' },
    { label: 'Логи согласий', value: 'logs' },
]

const logsColumns = [
    {
        title: 'Дата',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (val) => new Date(val).toLocaleString('ru-RU'),
        width: 160,
    },
    { title: 'IP', dataIndex: 'ipAddress', key: 'ipAddress', width: 140 },
    { title: 'Код анкеты', dataIndex: 'formCode', key: 'formCode', width: 120 },
    { title: 'Версия Политики', dataIndex: 'policyVersion', key: 'policyVersion', width: 160 },
    {
        title: 'ПДн',
        dataIndex: 'consentPersonal',
        key: 'consentPersonal',
        width: 70,
        render: (val) => <Tag color={val ? 'green' : 'red'}>{val ? 'Да' : 'Нет'}</Tag>,
    },
    {
        title: 'Конкурс',
        dataIndex: 'consentContest',
        key: 'consentContest',
        width: 80,
        render: (val) => <Tag color={val ? 'green' : 'red'}>{val ? 'Да' : 'Нет'}</Tag>,
    },
    {
        title: 'Доставка',
        dataIndex: 'consentDelivery',
        key: 'consentDelivery',
        width: 90,
        render: (val) => <Tag color={val ? 'green' : 'red'}>{val ? 'Да' : 'Нет'}</Tag>,
    },
    { title: 'URL формы', dataIndex: 'formUrl', key: 'formUrl' },
]

function Admin() {
    const [authorized, setIsAuthorized] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(6)
    const [logsPage, setLogsPage] = useState(1)
    const [logsPageSize] = useState(20)
    const [activeTab, setActiveTab] = useState('forms')
    const [radioValue, setRadioValue] = useState(radioOptions[0].value)
    const navigate = useNavigate()

    useEffect(() => {
        const userPassword = prompt('Введите пароль:')
        if (userPassword === correctPassword) {
            setIsAuthorized(true)
            loadProfiles(1)
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

    const loadLogs = (page) => {
        fireLogsQuery({
            pwd: correctPassword,
            perPage: logsPageSize,
            page,
        })
    }

    const [
        fireFormsQuery,
        { data: forms, isLoading: isFormsLoading, isFetching: isFormsFetching },
    ] = useLazyGetFormsQuery()

    const [
        fireLogsQuery,
        { data: logsData, isLoading: isLogsLoading, isFetching: isLogsFetching },
    ] = useLazyGetConsentLogsQuery()

    const [triggerDeleteForm, { isLoading: isFormDeleting }] = useDeleteFormMutation()
    const [triggerApproveForm] = useApproveFormMutation()

    const handlePageChange = (page) => {
        setCurrentPage(page)
        loadProfiles(page)
    }

    const handleLogsPageChange = (page) => {
        setLogsPage(page)
        loadLogs(page)
    }

    async function handleApprove(id) {
        await triggerApproveForm({ pwd: correctPassword, formId: id })
        fireFormsQuery({ pwd: correctPassword, perPage: pageSize, page: currentPage, formStatus: radioValue })
    }

    async function handleDeleteForm(id) {
        await triggerDeleteForm({ pwd: correctPassword, formId: id })
        fireFormsQuery({ pwd: correctPassword, perPage: pageSize, page: currentPage, formStatus: radioValue })
    }

    function handleChangeRadio(e) {
        setRadioValue(e.target.value)
    }

    function handleChangeTab(e) {
        const tab = e.target.value
        setActiveTab(tab)
        if (tab === 'logs') loadLogs(1)
        if (tab === 'forms') loadProfiles(currentPage)
    }

    useEffect(() => {
        if (authorized) loadProfiles(currentPage)
    }, [radioValue])

    const isFormsTab = activeTab === 'forms'
    const isLogsTab = activeTab === 'logs'
    const formsLoading = isFormDeleting || isFormsLoading || isFormsFetching
    const logsLoading = isLogsLoading || isLogsFetching

    const formsLoaded = forms !== undefined
    const formsExist = forms?.forms?.length > 0

    return !authorized ? (
        <div></div>
    ) : (
        <div className='admin'>
            <Radio.Group
                options={tabOptions}
                onChange={handleChangeTab}
                value={activeTab}
                optionType='button'
                buttonStyle='solid'
            />

            {isFormsTab && (
                <>
                    <Radio.Group
                        options={radioOptions}
                        onChange={handleChangeRadio}
                        value={radioValue}
                        optionType='button'
                        buttonStyle='solid'
                    />
                    <h1>Список анкет</h1>
                    {formsLoading ? <Loading /> : (!formsLoaded || formsExist) ? null : <div style={{ color: 'var(--col-black)', background: 'var(--col-white)', padding: '20px', borderRadius: '12px' }}>Анкет пока нет</div>}
                    <div className='forms'>
                        {forms?.forms?.map((f) => (
                            <div key={f.id} className='forms__item'>
                                <div className='forms__item__row'>
                                    <PhotoProvider>
                                        <PhotoView src={`data:image/jpeg;base64,${f.photo}`}>
                                            <img
                                                loading='lazy'
                                                className='forms__item__preview'
                                                src={`data:image/jpeg;base64,${f.photo}`}
                                                alt={`фото анкеты ${f.id}`}
                                            />
                                        </PhotoView>
                                    </PhotoProvider>
                                    <div className='forms__item__text-container'>
                                        {f.caption.split('\n').map((item, index) => (
                                            <p className='forms__item__text' key={index}>{item}</p>
                                        ))}
                                        <br />
                                        <p className='forms__code'>{f.code}</p>
                                    </div>
                                </div>
                                <div className='forms__item__row'>
                                    {!radioValue ? (
                                        <>
                                            <Popconfirm title='Удалить анкету?' description='Вы уверены?' onConfirm={() => handleDeleteForm(f.id)}>
                                                <Button danger type='primary'>Удалить</Button>
                                            </Popconfirm>
                                            <Popconfirm title='Одобрить анкету?' description='Вы уверены?' onConfirm={() => handleApprove(f.id)}>
                                                <Button type='primary'>Одобрить</Button>
                                            </Popconfirm>
                                        </>
                                    ) : (
                                        <Popconfirm title='Удалить анкету?' description='Вы уверены?' onConfirm={() => handleDeleteForm(f.id)}>
                                            <Button danger type='primary'>Удалить</Button>
                                        </Popconfirm>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className='forms__pagination'
                        current={currentPage}
                        pageSize={pageSize}
                        total={forms?.totalCount ?? 0}
                        showSizeChanger={false}
                        onChange={handlePageChange}
                    />
                </>
            )}

            {isLogsTab && (
                <>
                    <h1>Логи согласий</h1>
                    {logsLoading ? <Loading /> : null}
                    <div className='logs-table'>
                        <Table
                            dataSource={logsData?.logs ?? []}
                            columns={logsColumns}
                            rowKey='id'
                            pagination={false}
                            scroll={{ x: 900 }}
                            size='small'
                        />
                    </div>
                    <Pagination
                        className='forms__pagination'
                        current={logsPage}
                        pageSize={logsPageSize}
                        total={logsData?.totalCount ?? 0}
                        showSizeChanger={false}
                        onChange={handleLogsPageChange}
                    />
                </>
            )}
        </div>
    )
}

export default Admin
