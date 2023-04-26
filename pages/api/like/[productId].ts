import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import client from '../../../lib/prismadb';


const prisma = client

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
           productId 
        } = req.query
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({message:'not login'})
        }
        
        const sessionUser = session?.user as User;
        let productIDasString = productId as string
        
        const product = await prisma.product.findUnique({ where: { id: productIDasString } });
        console.log('::::user', product)
        //const songPlaylistsIds = song.playlists.map( playlist => ({id: playlist.id}))
       
        console.log('second')
        if (!product) {
              return res.status(401).json({message:'not login'})
        }
        let allLikes = [sessionUser.id, ...product?.likes]
            product.likes = allLikes
            
            const profile = await prisma.product.update({
                where: {
                    id: productIDasString
                },
                data: {
                    likes: product.likes
                }
            });

            console.log('49')

            return res.status(200).json(profile)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}