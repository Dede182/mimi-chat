import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit"

const theme = localStorage.getItem('theme') || 'light'
const language = localStorage.getItem('language') || 'en'

const initialSettingState ={
    theme,
    language,
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        }
    }
})

export const { changeTheme,changeLanguage } = settingSlice.actions

export const selectTheme = (state: RootState) => state.setting.theme
export const selectLanguage = (state: RootState) => state.setting.language

export default settingSlice.reducer
    