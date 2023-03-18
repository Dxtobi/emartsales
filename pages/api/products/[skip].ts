import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';


const prisma = new PrismaClient()

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {

        //console.log(req)
        const { skip } = req.query;
        let q = skip as unknown as number;

        //console.log(query)
        if (typeof q === "string") {
            
            q = parseInt(q);
           // console.log(q)
        }
        
        const results = await prisma.product.findMany({
            skip:q
          })

       // console.log(results);
        return res.status(200).json(results);

    } catch (error) {

       console.log(error)
       return res.status(500).send({message:'error',})
    }
}