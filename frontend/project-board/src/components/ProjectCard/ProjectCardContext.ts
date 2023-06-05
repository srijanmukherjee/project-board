import Project from "@/app/models/project";
import { createContext, useContext } from "react";

type ProjectCardContextType = { project: Project } | null;

const ProjectCardContext = createContext<ProjectCardContextType>(null);

export function useProjectCardContext() {
	const context = useContext(ProjectCardContext);

	if (!context) {
		throw new Error("ProjectCard.* must be used as a child of ProjectCard component");
	}

	return context;
}

export default ProjectCardContext;