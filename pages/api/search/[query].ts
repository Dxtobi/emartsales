import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';


const prisma = new PrismaClient()

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
      const { query  } = req.query
      const q = query

        console.log(query)
        const result = await prisma.product.findMany({
            where: {
              slug: {
                  hasSome: query
                },
               
            },
          })

      console.log(result)
        return res.status(200).json(result)
    } catch (error) {
       console.log(error)
       return res.status(500).send({message:'error',})
    }
}