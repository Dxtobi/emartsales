
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar(params: { [x: string]: any; }) {
  const { session, ...others } = params
 


  //console.log('session:::', others)
    return (
      <>
            <Head>
              <title>WeSales</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className='z-50 flex items-center justify-between p-5 absolute top-0 right-0 w-full   header_div bg-[#ffffff00]'>
                <Link href='/' className='brand '>
                    <span className='custom-text'>WeSales</span>
          </Link>
          </div>
                
      </>
    )
  }