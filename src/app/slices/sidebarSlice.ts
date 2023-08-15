import { CurrentAside } from './../../components/authenticated/base/Aside/types';
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';


export interface SidebarState {
    isOpen: boolean;
    aside :  CurrentAside
}

const initialState = {
    isOpen: false,
    aside : CurrentAside.DEFAULT
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        changeAside : (state, action) => {
            state.aside = action.payload as CurrentAside;
        }
    }
});

export const selectSidebar = (state: RootState) => state.sidebar;

export const { toggleSidebar,changeAside } = sidebarSlice.actions;
export default sidebarSlice.reducer;