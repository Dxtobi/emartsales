
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
import { AiFillGithub, AiOutlineComment } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";


const active = "w-[40px] h-[40px] rounded-full bg-slate-300 object-cover";
const normal = "w-[50px] h-[50px] rounded-full object-cover bg-slate-300";
export default function PostContainer(params: { data: any; }) {

    const { data } = params

    const router = useRouter()

    //console.log("data::", data)
    return (
        <div className={`w-full bg-white  mb-3 rounded-lg`}>
            
            <Link href={{ pathname: '/product', query:{id:data.id} }} >
                <img src={data.images[0]} alt='' width={100} height={200} className=" w-full rounded-lg" />
                <div className=" p-2">
                    <div className=" font-bold">{data.product_name}</div>
                    <div className=" text-green-800 font-semibold">NGN{ data.product_price}</div>
                </div>
            </Link>
            
        </div>
    )
}