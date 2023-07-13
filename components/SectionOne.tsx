import { motion } from "framer-motion";


export default function SectionOne() {
    return (
        <div className="min-h-screen overflow-y-clip -full px-5 flex">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 100 }}
          exit={{ y: 0 }}
          className="absolute top-0 left-[1rem] right-0 mx-auto ">
          <img src="/images/pnglogo.png" alt="logo" className="h-[70vh]"/>
        </motion.div>
      
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 100 }}
          exit={{ y: 0 }}
          className="absolute top-0 left-[3rem] right-0 mx-auto">
                <img src="/images/shoe.png" alt="logo" />
                <div
         
          className="flex flex-col justify-end items-end gap-2 md:absolute bottom-[40vh] right-4">
               
                    <div className="custom-text w-fit p-2  border-b-2  text-center">
                        Fashion
                    </div>
                    <div className="custom-text w-fit p-2  border-b-2  text-center">
                        Accessories
                    </div>
                    <div className="custom-text w-fit p-2  border-b-2  text-center">
                        Gadgets
                    </div>
                    <div className="custom-text w-fit p-2  border-b-2   text-center">
                        Electronics
                    </div>
               
        </div>
            </motion.div>
            
          
      </div>
      
    )
}