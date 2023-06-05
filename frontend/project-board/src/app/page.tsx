'use client';

import Header from '@component/Header';
import Projects from '@feature/projects/Projects';
import { useEffect } from 'react';
import { useAppDispatch } from './store/configureStore';
import { fetchProjects } from '@feature/projects/projectSlice';

async function IndexPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);

	return (
		<>
			<Header />
			<Projects />
		</>
	);
}

export default IndexPage;
