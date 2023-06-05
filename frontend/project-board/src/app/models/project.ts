import Detail from "./detail";
import Requirement from "./requirement";

interface Project {
	id: number,
	title: String;
	status: String;
	requirements: Requirement[];
	details: Detail[];
}

export interface ProjectParams {
	page: number,
	projectsPerPage?: number;
	query?: string;
}

export default Project;