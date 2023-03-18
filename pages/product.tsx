
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


export default function Product(params:{product:any, products:any}) {
 

    const { product, products } = params
    
    
    const onSubmitForm = async (productId: any) => {
        
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
        <div className="w-full  ">
            <div>
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
                product.images.map((e: any, index: Key | null | undefined) => (
                    <img src={e} key={index} />
                ))
            }
            </Carousel>
               

                <div className=" uppercase font-bold mt-3 text-lg">{product.product_name}</div>
                <div className="font-semibold text-lg">NGN {product.product_price }</div>
                <div>{product.product_description }</div>
                <div className="flex items-center gap-2 my-5">
                    <button className=" bg-[#33c336d5] rounded-xl w-[60%] p-2 text-white " onClick={()=>onSubmitForm(product.id)}>Add to favorite </button>
                    <div className=" w-[50px] h-[50px] rounded-full bg-[#33c336d5] flex justify-center items-center">
                    <Link  href={`https://wa.me/${product?.seller_contact.replace(/\s/g,'')}`} ><AiOutlineWhatsApp size={30} color='white'/></Link>
                    </div>
                </div>
            </div>
            <div className="flex w-full my-3 gap-2 flex-wrap">
                {
                    product.slug.map((e: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, i: Key | null | undefined) => (
                      
                            <div key={i} className=" rounded-md p-2 bg-green-500 text-white uppercase">{e}</div>
                       
                    ))

                }
            </div>
            <div className=" grid grid-cols-2 lg:grid-cols-4 gap-2">        
                {
                    products.map((e: { id: string | number; images: (string | undefined)[]; product_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; product_price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, i: Key | null | undefined) => (
                        <div className=" w-full" key={i}>
                            <Link href={{ pathname: '/product', query: { id: e.id } }} >
                                <img src={e.images[0]} alt="" className=" w-full" />
                                <div>{e.product_name}</div>
                                <div>NGN{ e.product_price}</div>
                            </Link>
                           
                    </div>
                    ))
               }
            </div>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const prisma = new PrismaClient();
    const session = await getSession(context);
    if (!session) {
      return {
        props: {
          session: null
        }, 
      }
    }
  
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