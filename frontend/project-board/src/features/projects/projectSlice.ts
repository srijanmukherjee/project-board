import { RootState } from "@/app/store/configureStore";
import getRequestParams from "@/app/util/requestParam";
import { agent } from "@api/agent";
import Project, { ProjectParams } from "@model/project";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface ProjectSlice {
	pagination?: {
		page: number,
		totalPages: number,
		totalProjects: number,
		projectPerPage: number
	},

	state: 'loaded' | 'loading' | 'idle',
	projectParams: ProjectParams
}

const initialState: ProjectSlice = {
	state: 'loading',
	projectParams: {
		page: 1
	}
}

const projectsAdapter = createEntityAdapter<Project>();

export const fetchProjects = createAsyncThunk<{ projects: Project[] }>(
	'project/fetchProjects',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const params = getRequestParams(state.project.projectParams);

		try {
			const response = await agent.Project.fetchAll(params);
			thunkAPI.dispatch(setPagination(response));
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue({ error: e })
		}
	}
)

export const projectSlice = createSlice({
	name: 'project',
	initialState: projectsAdapter.getInitialState<ProjectSlice>(initialState),
	reducers: {
		setPagination: (state, action) => {
			const { page, totalPages, projectPerPage, totalProjects } = action.payload;
			state.pagination = { page, totalPages, projectPerPage, totalProjects };
		},
		setParams: (state, action) => {
			state.projectParams = { ...state.projectParams, ...action.payload };
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.pending, (state) => {
			state.state = 'loading';
		});

		builder.addCase(fetchProjects.rejected, (state, action) => {
			console.log(action);
			state.state = 'loaded';
		});

		builder.addCase(fetchProjects.fulfilled, (state, action) => {
			projectsAdapter.setAll(state, action.payload.projects);
			state.state = 'loaded';
		})
	}
});

export const { setPagination, setParams } = projectSlice.actions;

export const projectSelectors = projectsAdapter.getSelectors((state: RootState) => state.project);