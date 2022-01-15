/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { placeId } = req.query;
        if (!placeId) {
            return res.status(400).send('placeId가 없습니다.')
        }
        try {
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
            );
            const { formatted_address: location } = data.results[0];
            const { lat, lng } = data.results[0].geometry.location;
            const result = {
                location,
                latitude: lat,
                longitude: lng,
            };
            res.status(200).send(result);
        } catch (e) {
            return res.status(404).end()
        }
    }

    return res.status(405).end()
}