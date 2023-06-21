import { RootState } from "@/app/store/configureStore";
import { agent } from "@api/agent";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface AccountSlice {
	jwt?: string;
	state: 'loading' | 'idle';
	error?: string;
}

const initialState: AccountSlice = {
	state: 'idle',
	jwt: undefined
}

export const login = createAsyncThunk<string, { username: string, password: string }, { state: RootState }>(
	'account/login',
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await agent.Account.login(username, password);
			return response.jwt;
		} catch (e) {
			if (e instanceof AxiosError) {
				return thunkAPI.rejectWithValue(e.response?.data.message ?? "Something went wrong");
			}
			return thunkAPI.rejectWithValue("Something went wrong");
		}
	},
	{
		condition: () => {
			return localStorage.getItem('USER_JWT') === null
		}
	}
)

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = undefined;
			state.error = undefined;
			state.state = 'idle';
			localStorage.removeItem('USER_JWT');
		},
		setJWT: (state, action) => {
			state.jwt = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state, action) => {
			state.state = 'loading';
			state.error = undefined;
		});

		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload) {
				state.jwt = action.payload;
				localStorage.setItem('USER_JWT', state.jwt);
			}
			state.state = 'idle';
			state.error = undefined;
		});

		builder.addCase(login.rejected, (state, action) => {
			state.error = action.payload as string;
			state.state = 'idle'
		})
	}
});

export const { logout, setJWT } = accountSlice.actions; 