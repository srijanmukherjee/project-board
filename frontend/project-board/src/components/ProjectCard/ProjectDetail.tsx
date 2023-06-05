import Icon from '@component/icon';
import { useProjectCardContext } from './ProjectCardContext';
import { FeatherIconNames } from 'feather-icons';

interface DetailChipProps {
	url: string;
	type: string;
}

function getDisplayNameFromUrl(url: string) {
	const { hostname } = new URL(url);
	return hostname.slice(hostname.indexOf('.') + 1, hostname.lastIndexOf('.'));
}

function getIconForUrl(url: string): FeatherIconNames {
	const { hostname } = new URL(url);
	if (hostname.indexOf('github') !== -1) return 'github';
	if (hostname.indexOf('gitlab') !== -1) return 'gitlab';
	return 'link-2';
}

function DetailChip({ url, type }: DetailChipProps) {
	let linkIcon = getIconForUrl(url);
	const name = getDisplayNameFromUrl(url);

	return (
		<li className='chip detail-chip'>
			<a href={url} target='_blank'>
				<Icon name={linkIcon} className='icon' />
				{name}
			</a>
		</li>
	);
}

function ProjectDetail() {
	const { project } = useProjectCardContext();

	if (project.details.length === 0) return null;

	return (
		<div className='project-details project-section'>
			<div className='heading'>
				<Icon name='anchor' className='icon' />
				<div role='heading' aria-level={4}>
					Details
				</div>
			</div>
			<ul className='chips'>
				{project.details.map(({ url, type }, index) => {
					return <DetailChip url={url} type={type} key={index} />;
				})}
			</ul>
		</div>
	);
}

export default ProjectDetail;
