/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).send('keyword가 없습니다.');
        }
        try {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=ko&input=${encodeURI(keyword as string)}`);
            // description 과 placeId를 전달

            const results = data.predictions.map((prediction: any) => ({
                description: prediction.description,
                placeId: prediction.place_id,
            }));

            res.status(200).send(results);
        } catch (e) {
            return res.status(404).end()
        }
    }
    return res.status(405).end();
}