
import Image from "next/image";
import Link  from "next/link";


export default function IndexCard({img}:{img:any}) {

  

    return (
        <>
            <div className="w-full box-shadow p-3  bg-gray-400 rounded-md slide relative flex-1 user-card my-8">
               
                    <img width={100} height={100} src={img} alt='' className=" w-full" />
                   
            </div>
            
      </>
    )
  }