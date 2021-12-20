/* eslint-disable import/no-anonymous-default-export */
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonActions } from "../store/common";

export default () => {
    const dispatch = useDispatch();
    const validataMode = useSelector((state) => state.common.validateMode);

    const setVaildateMode = (value: boolean) => {
        dispatch(commonActions.setVaildateMode(value));
    }

    return { validataMode, setVaildateMode }
};


