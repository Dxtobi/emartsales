
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
import Head from "next/head";


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
            <Head>
        <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>
        <meta
          name={product?.product_description }
          content={product?.product_description }
          key={product?.product_description }
                />
        <meta name="description" content={product?.product_description } />
        <meta property="og:title" content={product?.product_name} />
        <meta property="og:description" content={product?.product_description } />
        <meta property="og:image" content={product?.images[0]} />
    
        <meta name="keywords" content="Online shopping, E-commerce, Fashion, Clothing, Apparel, Accessories, Shoes, Electronics, Gadgets, Home decor, Furniture, Beauty products, Health and wellness, Sports and fitness, Jewelry, Watches, Baby products, Toys and games, Books, Gifts and souvenirs, Sustainable products, Organic products, Discounted items, Sale, Best deals, Exclusive offers, Free shipping, Customer reviews, Secure payments, Return policy, cloths, trending" />
        <meta name="author" content="joseph akanbi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Head>
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
                <h1 className=" uppercase font-bold mt-3 text-lg">{product?.product_name}</h1>
                <h2 className="font-semibold text-lg">NGN {product?.product_price }</h2>
                <p>{product?.product_description }</p>
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