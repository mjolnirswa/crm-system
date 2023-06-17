import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: localStorage.getItem('email') || null,
    token: localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || null,
    password: localStorage.getItem('password') || null,
    name: localStorage.getItem('name') || null,
    userImg: localStorage.getItem('img') || null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.name = action.payload.name
            state.userImg = action.payload.userImg
            state.password = action.payload.password

            localStorage.setItem('email', state.email)
            localStorage.setItem('password', state.password)
            localStorage.setItem('name', state.name)
            localStorage.setItem('img', state.userImg)

            if(action.payload.id) {
                state.id = action.payload.id
                localStorage.setItem('id', state.id)
            }

            if(action.payload.token) {
                state.token = action.payload.token
                localStorage.setItem('token', state.token)
            }
        },

        removeUser(state) {
            state.email = null
            state.id = null
            state.token = null

            localStorage.clear()
        }
    },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer