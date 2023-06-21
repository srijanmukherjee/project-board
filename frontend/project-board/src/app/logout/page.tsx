'use client';

import { logout } from '@feature/account/accountSlice';
import { useAppDispatch } from '../store/configureStore';
import { useEffect } from 'react';

function Logout() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(logout());
		window.location.href = '/';
	}, [dispatch]);
	return null;
}

export default Logout;
