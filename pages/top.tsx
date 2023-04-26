
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import EditProfile from "../components/EditProfile";
import { PrismaClient } from '@prisma/client';
import { AiFillHeart } from "react-icons/ai";
import { getSession } from "next-auth/react";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import client from "../lib/prismadb";



export default function Profile(params: { products: any; idType: number; session:any}) {

  console.log(params)
  if (!params.session) {
    return <div>You not logged in</div>
  }
 const { products} = params
  console.log(params)

    return (
      <div className="flex min-h-[70vh] flex-col items-center  p-0  gap-3">
       
        {
          products.map((e: { images: (string | undefined)[]; product_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; product_price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; likes: string | any[]; }, i: Key | null | undefined) => (
            <div key={i} className="w-full flex items-start  gap-2 p-2 bg-[#ffff]">
              <img src={e.images[0]} alt="" className="w-[30%]" />
              <div className="">
                <div>
                {e.product_name}
                </div>
                <div>
                NGN  {e.product_price}
                </div>
                <div className=" flex gap-2 items-center">
                  <AiFillHeart size={29} /> 
                  <div> {e.likes.length}k</div>
                </div>
              </div>
            </div>
          ))
       }

        

      
      </div>
    )
}


export async function getServerSideProps(context: any) {


    const prisma = client;
    //console.log(context.query.id);
    const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session: null
      }, 
    }
  }
  const sessionUser = session?.user as User;
  const products = await prisma.product.findMany({
    where:
    {
      likes: {
        has: sessionUser.id
      }
    }
  });
    //console.log(profile);
    return {
      props: {
        products,
        session
      },
    }
  }