import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/store/configureStore';
import { fetchProjects, setParams } from '@feature/projects/projectSlice';
import Icon from '@component/icon';
import './header.scss';

function Header() {
	const dispatch = useAppDispatch();
	const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>();
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		console.log(query);
		dispatch(setParams({ query, page: 1 }));
		dispatch(fetchProjects());
	}, [dispatch, query]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		if (debounceTimeout) clearTimeout(debounceTimeout);
		setDebounceTimeout(
			setTimeout(() => {
				let { value } = event.target;
				value = value.trim();
				if (value === query) return;
				setQuery(value);
				setDebounceTimeout(null);
			}, 500)
		);
	};

	return (
		<div className='topbar'>
			<div className='top'>
				<h1>Project Todo</h1>
				<button>Github</button>
			</div>
			<div className='bottom'>
				<div className='inputbox'>
					<Icon name='search' className='icon' />
					<input placeholder='Search for ideas' onChange={onSearch} />
				</div>
			</div>
		</div>
	);
}

export default Header;
