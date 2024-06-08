import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setListings: (state, action) => {
            state.listings = action.payload.listings;
        },
        setBookings: (state, action) => {
            state.user.bookings = action.payload;
        },
        setWishList: (state, action) => {
            state.user.wishList = action.payload;
        },
        setPropertyList: (state, action) => {
            state.properties = action.payload
        }
    }
});

export const { setLogin, setLogout, setListings, setBookings, setWishList } = userSlice.actions;
export default userSlice.reducer;
