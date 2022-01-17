/* eslint-disable @next/next/no-typos */
import React from 'react'
import { NextPage } from 'next';
import { wrapper } from '../../store';
import RoomMain from '../../components/room/main/RoomMain';
import { getRoomListAPI } from '../../lib/api/room';
import { roomActions } from '../../store/room';

const Room: NextPage = () => {
    return <RoomMain />;
}


Room.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
    const { query } = context;
    const { checkInDate, checkOutDate, adultCount, childrenCount, latitude, longitude, limit, page = '1' } = query;
    try {
        const { data } = await getRoomListAPI({
            checkInDate,
            checkOutDate,
            adultCount,
            childrenCount,
            latitude,
            longitude,
            limit: limit || '20',
            page: page || '1',
            // 한글은 encode
            location: query.location ? encodeURI(query.location as string) : undefined,
        });
        store.dispatch(roomActions.setRooms(data));
    } catch (e) {
        console.log(e);
    }
    return {};
}
)


export default Room;
