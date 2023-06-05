import { useAppDispatch, useAppSelector } from '@/app/store/configureStore';
import ProjectList from './ProjectList';
import Pagination from '@component/Pagination';
import { fetchProjects, setParams } from './projectSlice';
import { useEffect, useState } from 'react';

function Projects() {
	const dispatch = useAppDispatch();
	const { pagination, state } = useAppSelector((store) => store.project);
	const [loadedOnce, setLoadedOnce] = useState(false);

	useEffect(() => {
		if (state == 'loaded' && !loadedOnce) setLoadedOnce(true);
	}, [state, loadedOnce]);

	const onPaginationChange = (page: number) => {
		console.log(page);
		dispatch(setParams({ page }));
		dispatch(fetchProjects());
	};

	return (
		<>
			<ProjectList />
			{(loadedOnce || state === 'loaded') && pagination!.totalPages > 1 && (
				<Pagination count={pagination!.totalPages} defaultPage={pagination!.page} onChange={onPaginationChange} disabled={state === 'loading'} />
			)}
		</>
	);
}

export default Projects;
