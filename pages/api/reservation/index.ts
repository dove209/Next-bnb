/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import Data from "../../../lib/data";
import { StoredReservation } from "../../../types/reservation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // 숙소 등록하기
        try {
            const { userId, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount } = req.body;
            if (!userId || !checkInDate || !checkOutDate || adultCount === undefined || childrenCount === undefined || infantsCount === undefined) {
                return res.status(400).send('필수 값이 없습니다.')
            }

            const reservations = Data.reservation.getList();
            if (isEmpty(reservations)) {
                const reservation: StoredReservation = {
                    id: 1,
                    ...req.body,
                    createdAt: new Date(),
                    updateAt: new Date(),
                };
                Data.reservation.write([reservation]);
                return res.status(201).end();
            }

            const reservation: StoredReservation = {
                id: reservations[reservations.length - 1].id + 1,
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            Data.reservation.write([...reservations, reservation]);
            return res.status(201).end();

        } catch (e) {
            console.log(e)
            return res.send(e);
        }
    }
    return res.status(405).end();
}