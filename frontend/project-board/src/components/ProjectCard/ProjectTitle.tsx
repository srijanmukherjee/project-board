import { useProjectCardContext } from './ProjectCardContext';

function ProjectTitle() {
	const { project } = useProjectCardContext();
	return <div className='project-title'>{project.title}</div>;
}

export default ProjectTitle;
