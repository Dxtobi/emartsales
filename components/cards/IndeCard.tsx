
import Image from "next/image";
import Link  from "next/link";


export default function IndexCard({img}:{img:any}) {

  

    return (
        <>
            <div className="w-full box-shadow   bg-white rounded-md slide relative flex-1 user-card my-8 px-1">
               
                    <img width={100} height={100} src={img} alt='' className=" w-full rounded-lg" />
                   
            </div>
            
      </>
    )
  }