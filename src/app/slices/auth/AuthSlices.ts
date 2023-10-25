import { gos, eos } from './helper';
import { modifiedAxiosResponse } from './../../../api/auth/AuthRequest';
import Cookies from 'js-cookie';
import { RootState } from './../../store';
import { postLogin } from '@/api/auth/AuthRequest';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initalAuthState = {
    token: Cookies.get("token") || null,
    loading: 'idle',
    error: ""
}
type authbody = {
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
}
export const authService = createAsyncThunk('auth/login', async (body: authbody) => {
    const url = body.url;
    const data = body.body;

    try {
        const response = await postLogin(url, data) as modifiedAxiosResponse ;
        
        return gos(response);
    } catch (error) {
       console.log(error);
       eos(error)
    }

})


export const authSlice = createSlice({
    name: 'auth',
    initialState: initalAuthState,
    reducers: {
        clearError : (state) =>{
            state.error = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authService.pending, (state) => {
                state.loading = 'fetching'
            })
            .addCase(authService.fulfilled, (state, action) => {
                const token = action.payload.data.token
                state.token = token
                Cookies.set("token", token)
                state.loading = 'successful'
            })
            .addCase(authService.rejected, (state, action) => {
                state.loading = 'idle'
                console.log(action);
                state.error = action.error.message !
            })
    }
})

export const selectAuth = (state: RootState) => state.auth

export const {clearError} = authSlice.actions
export default authSlice.reducer
