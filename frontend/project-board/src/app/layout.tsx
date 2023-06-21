'use client';

import './globals.scss';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import Container from '@component/Container';
import { store, useAppDispatch } from './store/configureStore';
import { setJWT } from '@feature/account/accountSlice';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<title>Project Board</title>
				<meta name='description' content='Keep track of project ideas' />
			</head>
			<body className={inter.className}>
				<Provider store={store}>
					<Container>{children}</Container>
				</Provider>
			</body>
		</html>
	);
}
