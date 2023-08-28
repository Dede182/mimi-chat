import { FilePath } from '@/components/authenticated/Chat/types/ChatTypes';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
    opened : boolean,
    file? : FilePath ,
    loading : boolean,
    error : string | null
}

const initialState : initialStateType = {
    opened : false,
    file : undefined,
    loading : false,
    error : null
}

export const chatFileSlice = createSlice({
    name: 'chatFile',
    initialState,
    reducers: {
        openChatFile : (state) => {
            state.opened = true;
        },
        closeChatFile : (state) => {
            state.opened = false;
        },
        setChatFile : (state,action) => {
            state.file = action.payload;
        }
    }
})

export const { openChatFile,closeChatFile,setChatFile } = chatFileSlice.actions;
export default chatFileSlice.reducer;