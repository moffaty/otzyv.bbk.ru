import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainForm from './pages/MainForm'
import Result from './pages/Result'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import Raffle from './pages/Raffle'
import Finale from './pages/Finale'

function App() {
    return (
        <BrowserRouter>
            <main>
                <div className='gradient'></div>
                <div className='pattern'></div>
                <div className='common'>
                    <Routes>
                        <Route path='/' element={<MainForm />} />
                        <Route path='/result/:code' element={<Result />} />
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/raffle' element={<Raffle />} />
                        <Route path='/finale' element={<Finale />} />
                    </Routes>
                    <Footer />
                </div>
            </main>
        </BrowserRouter>
    )
}

export default App
