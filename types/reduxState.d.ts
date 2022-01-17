import { UserType } from "./user";
import { RoomType } from "./room";
// 유저 redux state
export type UserState = UserType & {
    isLogged: boolean;
};

// 공통 redux state
export type CommonState = {
    validateMode: boolean;
}

// 숙소 검색 redux state
export type SearchRoomState = {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
}

// 숙소 redux state
export type RoomState = {
    rooms: RoomType[];
};