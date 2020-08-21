import React, { createContext, useState } from 'react';
import Axios from 'axios';

type ContextProps = {
	isLoggedIn: boolean;
	level: number;
	token: string;
	name: string;
	setUserData: any;
};

export const UserContext = createContext<Partial<ContextProps>>({});

const UserContextProvider = (props: { children: React.ReactNode }) => {
	const storedToken = localStorage.getItem('bill-token');
	const [ userData, setUserData ] = useState({
		isLoggedIn: false,
		level: 9,
		token: '',
		name: '',
	});

	if (storedToken && !userData.isLoggedIn) {
		Axios.post('/api/user/loggedInUser', { storedToken }).then((response) => {
			localStorage.setItem('bill-token', response.data.data.token);
			setUserData({ isLoggedIn: true, level: 9, token: response.data.data.token, name: response.data.data.name });
		});
	}

	return <UserContext.Provider value={{ ...userData, setUserData }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
