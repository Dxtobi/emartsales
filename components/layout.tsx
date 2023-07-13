import Navbar from './navbar'
import Footer from './footer'
import {useRouter} from "next/router"

import { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { motion } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


export default function Layout(params: { [x: string]: any; children: any }) {

  const { children, ...others } = params
  const nonPaths = ['/post', '/new']
  
  const [loading, setLoading] = useState(false)
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const router = useRouter()
  useEffect(()=>{
    
    const handleRoutChangeStart = (url: string )=> ( url !== router.asPath ) && setLoading(true);
    const handleRoutChangeComplete = (url: string )=> ( url !== router.asPath ) && setLoading(false);

    router.events.on('routeChangeStart', handleRoutChangeStart)
    router.events.on('routeChangeComplete', handleRoutChangeComplete)
    router.events.on('routeChangeError', handleRoutChangeComplete)

  }, [router])
  

  const _links = [
    {path:'/', name:'home'}, {path:'/top', name:'Favorite'}, {path:'/search', name:'Search'}
  ]
  return (
    <div className=''>
      <Navbar profile={others} />
      
      {loading && <div className=' flex justify-center items-center w-full h-[100vh] fixed header_div z-50 text-yellow-50 bg-[#000000b1]'><div>Loading</div></div>}
      
      <main className=' m-auto  '>{children}</main>
                <div className="md:hidden block fixed top-0 left-0 w-full z-50">
                    <button onClick={() => setShowMenuMobile(!showMenuMobile)} className='fixed right-2 top-3 z-40 '>{showMenuMobile ? <AiOutlineClose size={30}/> : <AiOutlineMenu size={30} />}</button>
                    {showMenuMobile && <div className=' w-full'>
                        <motion.div
                            initial={{ x: -100 }}
                            animate={{ x: 1, }}
                            exit={{ x: 0 }}
                            className="md:hidden block w-[60%]  ">
                            <Sidebar urls={_links}  setShowMenuMobile={setShowMenuMobile} showMenuMobile={showMenuMobile} />
                        </motion.div>
                        <div onClick={() => setShowMenuMobile(!showMenuMobile)} onKeyDown={() => setShowMenuMobile(!showMenuMobile)} className='h-full bg-[#000000b0] w-full -z-20 absolute left-0 top-0'>

                        </div>
                    </div>
                    }
                </div>
      
      <Footer />
      
    </div>
  )
}