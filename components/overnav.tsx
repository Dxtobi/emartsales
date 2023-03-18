
import { AiFillHome, AiFillProfile, AiFillSetting, AiFillStar, AiOutlineSearch, AiOutlineStar, AiOutlineTwitter, AiOutlineUser, AiOutlineVerticalAlignTop } from "react-icons/ai";
import Link from "next/link"
import {useRouter} from "next/router"
import { useEffect } from "react";

export default function OverNav() {


    const router = useRouter();
    const { pathname } = router
    
    useEffect(() => {
        
    }, [pathname])

 const others=" lg:flex-col  lg:top-20 lg:left-4 lg:gap-5 bg-[#000000a6] lg:m-4 lg:p-5 lg:w-[10%] lg:rounded-xl"

  const mobile = "flex items-center fixed bottom-0 left-0 right-0 m-auto bg-[#000000f3] justify-between w-full[90%] p-3  header_div rounded-t-xl"
  return (
    <>
      <footer className={`${mobile} ${others}`}>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/"
              >
              <AiFillHome size={pathname == "/" ? 32 : 25} color={ pathname == "/" ? "#25bd5f" : "white"} />
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/top"
              >
          <AiFillStar size={pathname == "/top" ? 32 : 25} color={ pathname == "/top" ? "#25bd5f" : "white"} />
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/search"
          >
          <AiOutlineSearch size={pathname == "/search" ? 32 : 25} color={ pathname == "/search" ? "#25bd5f" : "white"} />
        </Link>
        
      </footer>
    </>
  )
}