import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user: {
            email: "",
            id: "",
        },
        jwt: null,
    },
    reducers: {
        login(state, { payload }) {
            console.log(payload);
            state.isLoggedIn = true;
            state.jwt = payload.jwt;
            state.user = payload.user;
            console.log(state.user);
            console.log(state.id);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = {
                email: "",
                id: "",
            };
            state.jwt = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
