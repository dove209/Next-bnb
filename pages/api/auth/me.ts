/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const accessToken = req.headers.cookie;
            console.log(accessToken)
            res.statusCode = 400;
            return res.end();
        } catch (e) {
            console.log(e)
            res.statusCode = 500;
            return res.send(e);
        }
    }

    res.statusCode = 405;

    return res.end();
};

