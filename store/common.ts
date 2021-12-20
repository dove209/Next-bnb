import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

// 초기 상태
const initialState: CommonState = {
    validateMode: false,
};

const common = createSlice({
    name: 'common',
    initialState,
    reducers: {
        // vaildateMode 변경
        setVaildateMode(state, action: PayloadAction<boolean>) {
            state.validateMode = action.payload;
        },
    },
});

export const commonActions = { ...common.actions };

export default common;