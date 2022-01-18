/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const room = Data.room.find(Number(id as string));
            if (room) {
                const host = Data.user.find({ id: room.hostId });
                if (host) {
                    const newUserWithoutPassword: Partial<Pick<
                        StoredUserType,
                        'password'
                    >> = host;
                    delete newUserWithoutPassword.password;
                    const roomWithHost = { ...room, host: newUserWithoutPassword };
                    return res.status(200).send(roomWithHost)
                }
                return res.status(404).send('호스트 정보가 없습니다.')
            }
            return res.status(404).send('해당 숙소가 없습니다.')
        } catch (e) {
            console.log(e)
        }
    }
    return res.status(405).end();
}