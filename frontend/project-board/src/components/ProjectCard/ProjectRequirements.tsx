import Icon from '@component/icon';
import { useProjectCardContext } from './ProjectCardContext';

function RequirementChip({ value }: { value: String }) {
	return <li className='chip'>{value}</li>;
}

function ProjectRequirements() {
	const { project } = useProjectCardContext();
	return (
		<div className='project-requirements project-section'>
			<div className='heading'>
				<Icon name='box' className='icon' />
				<div role='heading' aria-level={4}>
					Requirements
				</div>
			</div>
			<ul className='chips'>
				{project.requirements.map(({ id }, index) => {
					return <RequirementChip value={id} key={index} />;
				})}
			</ul>
		</div>
	);
}

export default ProjectRequirements;
