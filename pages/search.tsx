
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router"
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import HomeContainer from "../components/home/Index";


export default function Login() {
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState(Array<string>)
    const [result, setResult] = useState([])
    

    const onSubmitForm = async (values: any) => {
        setLoading(true)
        if (query.length < 1) {
            return
        }
        try {
           
            //console.log(values);
            
            const config: AxiosRequestConfig = {
                url: `/api/search/${query}`,
                
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            };

            const res = await axios(config)

            if (res.status === 200) {
                setResult(res.data)
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

    function cleanInput(value: string): void {
        const text = value.toLocaleLowerCase().split(" ")
        console.log(text)
        setQuery(text)

    }

    return (
        <div className="w-full  ">
            <div className="w-[90%] p-2 flex items-center justify-between bg-white rounded-md m-auto border-2 border-gray-700">
                <input className="p-1  w-[80%] outline-none" type='text' onChange={(e)=>cleanInput(e.target.value)} placeholder="search" />
                <button onClick={onSubmitForm} className="w-[15%] p-1 rounded-xl bg-slate-600  flex justify-center items-center "><AiOutlineSearch  color="white" size={30}/></button>
            </div>
            
            {
                loading && ( <div className=" text-center">
                    Loading
                </div>)
            }
            
            <div className=" my-4">
                <HomeContainer data={result} />
            </div>
        </div>
    )
}