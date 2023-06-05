import Icon from '@component/icon';
import './pagination.scss';

interface PaginationProps {
	count: number;
	defaultPage?: number;
	boundaryCount?: number;
	siblingCount?: number;
	minCount?: number;
	onChange?: (page: number) => void;
	disabled?: boolean;
}

function Pagination({ count, onChange, disabled = false, minCount = 7, defaultPage = 1, boundaryCount = 1, siblingCount = 1 }: PaginationProps) {
	if (count < 0 || minCount < 0) throw new Error('Pagination count must be positive');

	if (count == 0) return null;

	return (
		<ul className={'pagination' + (disabled ? ' disabled' : '')}>
			<li
				className={defaultPage == 1 ? 'disabled' : ''}
				onClick={() => {
					if (defaultPage > 1 && onChange) onChange(defaultPage - 1);
				}}>
				<Icon name='chevron-left' />
			</li>

			{/* Pages */}
			{new Array(count).fill(0).map((_, page) => (
				<li
					key={page}
					className={page + 1 == defaultPage ? 'active' : ''}
					onClick={() => {
						if (page + 1 != defaultPage && onChange) onChange(page + 1);
					}}>
					{page + 1}
				</li>
			))}

			<li
				className={defaultPage == count ? 'disabled' : ''}
				onClick={() => {
					if (defaultPage < count && onChange) onChange(defaultPage + 1);
				}}>
				<Icon name='chevron-right' />
			</li>
		</ul>
	);
}

export default Pagination;
