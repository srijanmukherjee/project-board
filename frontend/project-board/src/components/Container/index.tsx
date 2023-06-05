import { ReactNode } from 'react';
import './container.scss';

interface ContainerProps {
	children: ReactNode;
}

function Container({ children }: ContainerProps) {
	return <div className='container'>{children}</div>;
}

export default Container;
