import { AuthUser } from '@/@types/users';
import { gos, eos } from './helper';
import { getProfile, modifiedAxiosResponse } from './../../../api/auth/AuthRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
type initialStateType = {
    user: AuthUser | null,
    loading: 'idle' | 'pending' | 'idle',
    error: string
}
const initalAuthState : initialStateType = {
    user : null,
    loading: 'idle',
    error: ""
}

 type FetchProfileProps = {
    url: string,
    token: string
 }

export const fetchProfile = createAsyncThunk('/fetch/profile', async ({url,token} : FetchProfileProps) => {

    try {
        const response = await getProfile(url, token) as modifiedAxiosResponse ;
        
        return gos(response);
    } catch (error) {
       eos(error)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: initalAuthState,
    reducers: {
        changeUserProfilePicture : (state,action) =>{
            state.user!.profile_photo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.user = action.payload.data;
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export const selectUser = (state : RootState) => state.user!.user;

export const {changeUserProfilePicture} = userSlice.actions;

export default userSlice.reducer;
// export const {} = userSlice.actions;
