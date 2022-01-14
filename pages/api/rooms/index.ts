/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { isEmpty } from 'lodash'
import { StoredRoomType } from '../../../types/room';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req)
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

    return res.end();
};
