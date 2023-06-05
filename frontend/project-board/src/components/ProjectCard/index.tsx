import { PropsWithChildren } from 'react';
import Project from '@/app/models/project';
import ProjectCardContext from './ProjectCardContext';
import ProjectTitle from './ProjectTitle';
import ProjectRequirements from './ProjectRequirements';
import ProjectDetail from './ProjectDetail';
import './projectCard.scss';

interface ProjectCardProps extends PropsWithChildren {
	showStatus?: boolean;
	project?: Project;
	skeleton?: boolean;
}

const DUMMY_PROJECT = {
	id: 1,
	title: 'dummy project',
	status: 'NOT_STARTED',
	requirements: [
		{
			id: 'dummy'
		},
		{
			id: 'dummy'
		}
	],
	details: [
		{
			type: 'dummy',
			url: 'http://localhost:3000'
		},
		{
			type: 'dummy',
			url: 'http://localhost:3000'
		},
		{
			type: 'dummy',
			url: 'http://localhost:3000'
		}
	]
};

function ProjectCard({ project, children, skeleton = false, showStatus = true }: ProjectCardProps) {
	let projectCardClassName = 'project-card';
	let status = '';

	if (showStatus && project && project.status !== 'NOT_STARTED') {
		projectCardClassName += ' status';
		if (project?.status === 'IN_PROGRESS') {
			status = 'In progress';
			projectCardClassName += ' in-progress';
		} else if (project?.status === 'COMPLETED') {
			status = 'Completed';
			projectCardClassName += ' completed';
		}
	}

	if (!project && skeleton) {
		project = DUMMY_PROJECT;
	}

	if (!project) {
		throw new Error('No project provided');
	}

	if (skeleton) projectCardClassName += ' skeleton';

	return (
		<ProjectCardContext.Provider value={{ project }}>
			<div className={projectCardClassName} data-status={status}>
				{children}
			</div>
		</ProjectCardContext.Provider>
	);
}

ProjectCard.Title = ProjectTitle;
ProjectCard.Requirements = ProjectRequirements;
ProjectCard.Details = ProjectDetail;

export default ProjectCard;
