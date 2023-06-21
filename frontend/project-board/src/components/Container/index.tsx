import { ReactNode, useEffect } from 'react';
import './container.scss';
import { useAppDispatch } from '@/app/store/configureStore';
import { setJWT } from '@feature/account/accountSlice';

interface ContainerProps {
	children: ReactNode;
}

function Container({ children }: ContainerProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const jwt = localStorage.getItem('USER_JWT');
		if (jwt) {
			dispatch(setJWT(jwt));
		}
	}, [dispatch]);

	return <div className='container'>{children}</div>;
}

export default Container;
