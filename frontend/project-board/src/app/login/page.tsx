'use client';

import { FormEvent, useEffect, useState } from 'react';
import './login.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { login } from '@feature/account/accountSlice';

function LoginPage() {
	const dispatch = useAppDispatch();
	const { jwt, state, error } = useAppSelector((state) => state.account);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	// TODO: if logged in, redirect to home page
	useEffect(() => {
		if (jwt) {
			window.location.href = '/';
		}
	}, [jwt, state]);

	const onLogin = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (username.trim() === '' || password === '') {
			console.debug('Please enter both username ans password');
			return;
		}

		dispatch(login({ username, password }));
	};

	return (
		<div className='container'>
			<div className='login-form-container'>
				<h2>Login</h2>
				{error && <div className='error'>{error}</div>}
				<form onSubmit={onLogin}>
					<div>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' required placeholder='Login as?' onChange={(event) => setUsername(event.target.value)} disabled={state === 'loading'} />
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							required
							placeholder="What's your password?"
							onChange={(event) => setPassword(event.target.value)}
							disabled={state === 'loading'}
						/>
					</div>
					<button type='submit' disabled={state === 'loading'}>
						{state === 'loading' ? 'Logging in' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
