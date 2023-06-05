import { useEffect, useState } from 'react';
import { agent } from '@/app/api/agent';
import ProjectCard from '@component/ProjectCard';
import Project from '@/app/models/project';

import './projectList.scss';
import { useAppSelector } from '@/app/store/configureStore';
import { projectSelectors } from './projectSlice';
import Loader from '@component/Loader';
import creepyCatAnimationData from '@/app/lotties/123750-creepy-cat.json';
import Lottie from 'react-lottie';

function NoProjectMessage() {
	const lottieOptions = {
		loop: true,
		autoplay: true,
		animationData: creepyCatAnimationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	const { projectParams } = useAppSelector((store) => store.project);

	return (
		<div className='not-found'>
			<Lottie options={lottieOptions} style={{ width: 'min(90%, 400px)' }} />

			<div>{projectParams.query === null || projectParams.query?.trim() === '' ? 'No projects' : "Couldn't find any project"}</div>
		</div>
	);
}

function ProjectList() {
	const projects = useAppSelector(projectSelectors.selectAll);
	const { state } = useAppSelector((store) => store.project);

	return (
		<ul className='project-list'>
			{projects.length === 0 ? (
				state === 'loading' ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<NoProjectMessage />
				)
			) : (
				projects.map((project, index) => (
					<li key={index}>
						<ProjectCard project={project} skeleton={state === 'loading'}>
							<ProjectCard.Title />
							<ProjectCard.Requirements />
							<ProjectCard.Details />
						</ProjectCard>
					</li>
				))
			)}
		</ul>
	);
}

export default ProjectList;
