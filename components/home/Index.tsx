
import axios, {AxiosRequestConfig} from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router"
//import { data } from "../../lib";
//import PostContainer from "./postContainer";
import { Key } from "react";
import PostContainer from "./PostContainer";

const np=['Accessories','Perfumes','Fashion','Phones','Electronics', 'Footwears']

export default function HomeContainer(params: { data:any }) {

    const { data } = params
    const router = useRouter()

console.log(data)
    return (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 p-3">
            {
                data?.map((d: any, i: Key | null | undefined) => (
                    <PostContainer data={d} key={i} />
                ))
            }
        </div>
    )
}