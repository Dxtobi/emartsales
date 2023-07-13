
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import { useRouter,  } from "next/router"
import Image from "next/image";
import { AiOutlineSearch, AiOutlineWhatsApp } from "react-icons/ai";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import Carousel from "nuka-carousel";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import client from "../lib/prismadb";
import PostContainer from "../components/home/PostContainer";


export default function Product(params:{product:any, products:any, session:any}) {
 

    const { product, products,session } = params
    
    
    const onSubmitForm = async (productId: any) => {
        vibrate()
        try {
           
            //console.log(values);
            
            const config: AxiosRequestConfig = {
                url: `/api/like/${productId}`,
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                }
            };

            const res = await axios(config)

            if (res.status === 200) {
                console.log(res.data)
                window.alert('added to favorite')
                vibrate()
                //router.reload()
            } else {
                
            }
        } catch (error) {
            
            console.log(error)
        }
    }
   if( product===null || !product) {
    return <div>Product not found</div>
   }

    function vibrate() {
        if (!window) {
            return;
        }
    
        if (!window.navigator) {
            return;
        }
    
        if (!window.navigator.vibrate) {
            return;
        }
    
        window.navigator.vibrate(100);
    }
   // const phone = product?.seller_contact.trim()
   
    return (
        <div className="w-full   py-20">
             <Carousel
            renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
                <button className='w-[100px] h-[300px]' onClick={previousSlide} disabled={previousDisabled}>
                
                </button>
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <button
                    className='w-[100px] h-[300px]'
                    onClick={nextSlide} disabled={nextDisabled}>
                </button>
            )}
            animation="zoom"
            autoplay={true}
            //autoplayInterval={50}
            >
            {
                product?.images.map((e: any, index: Key | null | undefined) => (
                    <img src={e} key={index} />
                ))
            }
            </Carousel>
            <div className="p-3">
                <div className=" uppercase font-bold mt-3 text-lg">{product?.product_name}</div>
                <div className="font-semibold text-lg">NGN {product?.product_price }</div>
                <div>{product?.product_description }</div>
                <div className="flex items-center gap-2 my-5">
                    <button className=" bg-gradient-to-t from-red-500 to-[coral] rounded-xl w-[60%] p-2 text-white " onClick={()=>onSubmitForm(product?.id)}>Add to favorite </button>
                    <div className=" w-[50px] h-[50px] rounded-full bg-gradient-to-t from-red-500 to-[coral] flex justify-center items-center">
                    <Link  href={`https://wa.me/${product?.seller_contact.replace(/\s/g,'')}`} ><AiOutlineWhatsApp size={30} color='white'/></Link>
                    </div>
                </div>
            </div>
            <div className="flex w-full my-3 gap-2 flex-wrap p-3">
                {
                    product?.slug.map((e: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => (     
                            <div key={i} className=" rounded-md p-2 bg-gradient-to-l from-red-500 to-[coral] text-white uppercase">{e}</div>   
                    ))

                }
            </div>
            <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2 p-3">        
                {
                    products?.map((data: any, i: Key | null | undefined)  => (<PostContainer data={data} key={i}/>))
               }
            </div>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const prisma = client
    const session = await getSession(context);
  
   // console.log(context.query.id)
   
    const sessionUser = session?.user as User;
    
    const product = await prisma.product.findUnique({ where: { id: context.query.id } });
    const products = await prisma.product.findMany({ where: { slug:{hasSome:product?.slug} } });
    console.log(session, product?.slug[0]);
    return {
      props: {
        session,
            product,
            products
      },
    }
  }