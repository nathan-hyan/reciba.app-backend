import React, { createContext, useState } from 'react'
import Axios from 'axios'

export const UserContext = createContext();

const UserContextProvider = (props) => {


    const storedToken = localStorage.getItem('bill-token')
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        level: null,
        token: null,
        name: null,
    })

    if (storedToken && !userData.isLoggedIn) {
        Axios.post('/api/user/loggedInUser', { storedToken }).then(
            response => {
                localStorage.setItem('bill-token', response.data.data.token)
                setUserData({ isLoggedIn: true, level: 9, token: response.data.data.token, name: response.data.data.name })
            }
        )
    }


    return (
        <UserContext.Provider value={{ ...userData, setUserData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider