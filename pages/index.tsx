
import {


  signOut,

  getSession,
  signIn

} from "next-auth/react";

import { data } from '../lib/fakeData';

import HomeContainer from '../components/home/Index';

import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react';

import Auth from '../components/auth';
import { BiLoader } from 'react-icons/bi';
import Link from 'next/link';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import CarouselElement from '../components/carosel/CaroselElelement';
import axios, { AxiosRequestConfig } from 'axios';
import client from '../lib/prismadb';
import SectionOne from "../components/SectionOne";
import { motion } from "framer-motion";
import PostContainer from "../components/home/PostContainer";



const Home = (params: { session: any; profile: any; products: Array<any>; tags:any }) => {

  const {session, tags, products} = params
  const [prod, setProd] = useState(products)
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');

  
  

  
const getMoreTab = async (values: any) => {
  setLoading(true)
  setSelected(values)
 
  try {
     
      //console.log(values);
      
      const config: AxiosRequestConfig = {
          url: `/api/search/${[values]}`,
          
          method: "GET",
          headers: {
              "Content-Type":"application/json"
          }
      };

      const res = await axios(config)

      if (res.status === 200) {
        setProd(res.data)
        setLoading(false)
       // console.log(res.data)
          //router.reload()
      } else {
          setLoading(false)
      }
  } catch (error) {
      setLoading(false)
      console.log(error)
  }
}

  const getMore = async (values: any) => {
    setLoading(true)
    
   
    try {
       
        //console.log(values);
        
        const config: AxiosRequestConfig = {
            url: `/api/products/${prod.length}`,
            
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        };

        const res = await axios(config)

        if (res.status === 200) {
          setProd([...prod, ...res.data])
            setLoading(false)
            //router.reload()
        } else {
            setLoading(false)
        }
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}
  


  const cancel = () => {
    setAuth(!auth)
  }
  return (
    <div className="flex  flex-col items-center w-full md:w-[70%]  m-auto ">
      
     <SectionOne/>
      <section 
         
          className="my-5 w-full font-bold text-white  bg-gradient-to-t from-red-500 to-[coral] p-3 md:rounded-lg">
        <h1 className="text-2xl my-4">We Deliver Nation Wild</h1>
        {session?.user?.role != 'admin' && (
        <>
          <button onClick={()=>signIn('google')} className=' bg-[#ffffff] text-gray-600 w-full p-3 my-6 rounded-xl '>
            SIGN IN  / SIGN UP
          </button>
        
        </>
        )}
        <h1 className="text-2xl my-4">Top products</h1>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-2" initial={{ scale: 0 }}
        whileInView={{scale: 1}}>
       { products.slice(0, 4).map((data, i) => (
  <PostContainer key={i} data={data} />
))}
       </motion.div>
     </section>
        <div className="p-3 m-auto w-full">

        <CarouselElement products={[]} />
        </div>
          <Link href='https://wa.me/message/P67PWTYW2YO5F1' className='fixed right-8 bottom-20 bg-[#25b05b33] lg:bg-[#25b05a] text-white flex justify-center items-center w-16 h-16 rounded-full header_div'><AiOutlineWhatsApp size={34}/></Link>
          
          
          <div className='flex gap-3 items-center my-4 overflow-x-scroll w-full no-scrollbar  p-3'>
            
            {
              tags.map((e: { tag_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, i: Key | null | undefined) => (
                <button key={i} onClick={()=>getMoreTab(e.tag_name)} className={`p-2 whitespace-nowrap rounded-sm cursor-pointer uppercase ${selected === e.tag_name && 'border-b-2 border-b-orange-500 text-orange-600'}  `}>{e.tag_name}</button>
              ))
            }
          </div>
          <HomeContainer data={prod} />
        
      
      {
        prod?.length > 9 && <button onClick={getMore} className=' bg-orange-600 text-white whitespace-nowrap rounded-lg w-full md:w-1/2 p-4'>Load More</button>
      }
      {
        loading &&(<div className=' flex justify-center items-center w-full h-[100vh] fixed header_div z-50 text-yellow-50 bg-[#000000b1]'>
                      <div>
                        <BiLoader size={30} />
                      </div>
                    </div>
                      )
        
      }
      {/* <!-- Google tag (gtag.js) --> */}
      
      </div>
  )
}



export async function getServerSideProps(context: any) {
  try {
    const prisma = client
    const products = await prisma.product.findMany({take:20});
    const tags = await prisma.tag.findMany();
    const session = await getSession(context);
    //console.log('session:::', products, tags);
    return {
      props: {
        session,
        products:products?products:[],
        tags:tags?tags:[]
      },
    }
  } catch (error) {
   // console.log(error.message)
    return {
      props: {
        session:null,
        products:[],
        tags:[]
      },
    }
  }
}
export default Home
