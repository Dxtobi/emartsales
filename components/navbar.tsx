
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import {


  signOut,

} from "next-auth/react";
export default function Navbar(params: { [x: string]: any; }) {
  const { session, ...others } = params
  const [userName, setUser] = useState('E-mart')
  const [userImg, setImage] = useState(null)

  useEffect(() => {
    if (others.profile?.session?.user.name && others.profile?.session?.user.image) {
      setImage(others.profile.session.user.image)
      setUser(others.profile.session.user.name)
      return 
    }
  }, [params])
  //console.log('session:::', others)
    return (
      <>
            <Head>
              <title>{userName}</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className='z-50 flex items-center justify-between p-5 absolute top-0 right-0 w-full   header_div bg-[#ffffff00]'>
                <Link href='/' className='brand '>
                    <span className='custom-text'>WeSales</span>
          </Link>
          {
            others.profile?.session &&(<button onClick={()=>signOut()}>
                                              <div>
                                                <AiOutlineLogout size={25}/>
                                              </div>
                                            </button>
            )
            
          }
          </div>
                
      </>
    )
  }