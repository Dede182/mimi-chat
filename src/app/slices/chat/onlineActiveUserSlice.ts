import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
interface onlineUserTypes {
    id : number,
    name : string,
}

const initialOnlineUsers : Array<onlineUserTypes> = []

export const onlineActiveUserSlice = createSlice({
    name : "onlineUsers",
    initialState : initialOnlineUsers,
    reducers : {
        setInitialOnlineUsers : (state,action) => {
            const users = action.payload
            state.push(...users)
        },
        addOnlineUser : (state,action) => {
            console.log('joined' + action.payload)
            const user = action.payload
            //before push check the user already exists on state or not
            state.find((u) => u.id === user.id) ? null : state.push(user)
        },
        removeOnlineUser : (state,action) => {
            console.log('leave' + action.payload)
            const user = action.payload
            const index = state.findIndex((u) => u.id === user.id)
            index !== -1 ? state.splice(index,1) : null
            

        }
    },
})

export const selectOnlineActiveUsers= (state : RootState) => state.onlineActiveUsers
export const { addOnlineUser,removeOnlineUser,setInitialOnlineUsers } = onlineActiveUserSlice.actions
export default onlineActiveUserSlice.reducer