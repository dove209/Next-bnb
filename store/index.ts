import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { AnyAction, Store } from 'redux';
import user from './user';
import common from "./common";

const rootReducer = combineReducers({
    common: common.reducer,
    user: user.reducer,
})

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload,
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<Store<any, AnyAction>> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);

