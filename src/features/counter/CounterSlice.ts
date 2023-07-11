import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {

    value: number;
}

const initialState: CounterState = {
    value: 10
}

// action
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // reducer
    reducers: {
        //increment
        increment(state) {
            // this works because it uses immer under the hood
            state.value++;
        },
        //decrement
        //reset
    },
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
