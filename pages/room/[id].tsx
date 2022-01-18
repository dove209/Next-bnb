import { NextPage } from "next";
import { getRoomAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { wrapper } from '../../store';
import RoomDetail from "../../components/room/detail/RoomDetail";

const roomDetail: NextPage = () => {
    return <RoomDetail />
}

export default roomDetail;

roomDetail.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
    const { query } = context;
    const { id } = query;
    try {
        if (id) {
            const { data } = await getRoomAPI(Number(id as string));
            store.dispatch(roomActions.setDetailRoom(data))
        }
    } catch (e) {
        console.log(e)
    }
    return {};
})