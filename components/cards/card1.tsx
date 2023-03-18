
import { useRouter } from "next/router";
import { AiOutlineTwitter, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";


export default function Card1({ profile }) {


    const router = useRouter()
    console.log(profile)

    return (
        <>
            <button className="w-1/4 p-2 bg-purple-900 text-white rounded-md my-3" onClick={() => router.back()}>Back</button>
            <div className="w-full box-shadow p-3 bg-purple-500 text-white rounded-md">
                
                <br />
                <div className="w-full h-[25vh] bg-purple-900 flex justify-center items-center rounded-md" >
                    <img src={profile.image} alt="" className="w-[100px] h-[100px] rounded-lg" />
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-3xl font-semibold uppercase m-3">{profile.name}</div>
                    <div className="capitalize m-3">{profile.occupation}</div>
                    <div className="capitalize m-3">
                        {profile.email}
                    </div>
                    <div className="text-center m-3">{profile.bio}</div>
                    <div>{profile.phone}</div>
                    
                    <a href={profile.slug} className="bg-purple-900 text-white w-1/2  p-2 m-3 rounded-lg text-center">More</a>

                    <div className="flex gap-3 my-5">
                    
                    {profile.twitter && <div className="w-[10vh] h-[10vh] rounded-full bg-purple-700 flex justify-center items-center">
                            <a href={profile.twitter} className='text-white'><AiOutlineTwitter  size={30}/></a>
                        </div>}
                        {profile.instagram && <div className="w-[10vh] h-[10vh] rounded-full bg-purple-700 flex justify-center items-center">
                            <a href={profile.instagram} className='text-white'><AiFillInstagram  size={30}/></a>
                        </div>}
                        {profile.linkedin && <div className="w-[10vh] h-[10vh] rounded-full bg-purple-700 flex justify-center items-center">
                            <a href={profile.linkedin} className='text-white'><AiFillLinkedin  size={30}/></a>
                        </div>}
                    </div>

                    
                </div>
            </div>
            
      </>
    )
  }