/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmpty } from 'lodash'
import { StoredRoomType } from '../../../types/room';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // 숙소 등록하기
        try {
            const {
                largeBuildingType,
                buildingType,
                roomType,
                isSetUpForGuest,
                maximumGuestCount,
                bedroomCount,
                bedCount,
                bedList,
                publicBedList,
                bathroomCount,
                bathroomType,
                latitude,
                longitude,
                country,
                city,
                district,
                streetAddress,
                detailAddress,
                postcode,
                amentities,
                conveniences,
                photos,
                description,
                title,
                price,
                startDate,
                endDate,
                hostId,
            } = req.body;

            if (
                !largeBuildingType ||
                !buildingType ||
                !roomType ||
                isSetUpForGuest === null ||
                !maximumGuestCount ||
                !bedroomCount ||
                !bedCount ||
                !bedList ||
                !publicBedList ||
                !bathroomCount ||
                bathroomType === null ||
                !latitude ||
                !longitude ||
                !country ||
                !city ||
                !district ||
                !streetAddress ||
                (detailAddress !== '' && !detailAddress) ||
                !postcode ||
                !amentities ||
                !conveniences ||
                !photos ||
                !description ||
                !title ||
                !price ||
                !startDate ||
                !endDate ||
                !hostId
            ) {
                res.status(400).send('필수 값이 없습니다.')
            }

            const rooms = Data.room.getList();
            if (isEmpty(rooms)) {
                const newRoom: StoredRoomType = {
                    id: 1,
                    ...req.body,
                    createAt: new Date(),
                    update: new Date(),
                };
                Data.room.write([newRoom]);
                res.status(201).end();
            } else {
                const newRoom: StoredRoomType = {
                    id: rooms[rooms.length - 1].id + 1,
                    ...req.body,
                    createAt: new Date(),
                    updateAt: new Date(),
                };
                Data.room.write([...rooms, newRoom]);
                res.status(201).end()
            }
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }

    if (req.method === 'GET') {
        const { checkInDate, checkOutDate, adultCount, childrenCount, latitude, longitude, limit, page = '1', } = req.query;
        try {
            const rooms = Data.room.getList();

            // 위치로 필터링 하기
            const filteredRooms = rooms.filter((room) => {
                if (latitude && latitude !== '0' && longitude && longitude !== '0') {
                    if (
                        !(
                            Number(latitude) - 0.5 < room.latitude &&
                            room.latitude < Number(latitude) + 0.05 &&
                            Number(longitude) - 0.5 < room.longitude &&
                            room.longitude < Number(longitude) + 0. - 5
                        )
                    ) {
                        return false;
                    }
                }
                if (checkInDate) {
                    if (
                        new Date(checkInDate as string) < new Date(room.startDate) ||
                        new Date(checkOutDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }
                if (checkOutDate) {
                    if (
                        new Date(checkOutDate as string) < new Date(room.startDate) ||
                        new Date(checkOutDate as string) > new Date(room.endDate)
                    ) {
                        return false;
                    }
                }
                if (
                    room.maximumGuestCount < Number(adultCount as string) + (Number(childrenCount as string) * 0.5 || 0)
                ) {
                    return false;
                }
                return true;
            })

            // 개수 자르기
            const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

            // host 정보 넣기
            const roomsWithHost = await Promise.all(
                limitedRooms.map(async (room) => {
                    const host = Data.user.find({ id: room.hostId });
                    return { ...room, host }
                })
            );


            return res.status(200).send(roomsWithHost);
        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.end();
};
