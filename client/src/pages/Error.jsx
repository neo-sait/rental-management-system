import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../components/auth'

const Error = () => {

    return (
        <div className="App">

            <div id="page" className="dark:bg-main-bg bg-main-bg min-h-screen w-full">
                <h1>ERROR, PAGE NOT FOUND</h1>
            </div>
        </div>
    )
}

export default Error