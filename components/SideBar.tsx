import { type } from "os";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import {signOut} from "next-auth/react";
import Switcher from './ThemeSwitch'
// eslint-disable-next-line react/prop-types
const Sidebar = ({ urls, setShowMenuMobile }: any) => {








  return (
    <div
      className="flex flex-col justify-between items-start min-h-screen w-full bg-[#ffffff00]  py-10 flex-grow z-50 backdrop-blur-custom">


      <div className="flex flex-col items-start gap-4  mx-auto w-full">
        <ul className="mt-4 w-full">
          {urls.map((e: { path: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, i: any) => (
            <li key={e.path + i}>
              <a
                href={e.path}
                onClick={() => setShowMenuMobile(false)}
                className={`block py-2 px-10 w-full capitalize  border-b my-4 text-white`}>
                {e.name}

              </a>
            </li>
          ))}
          <li >
            <div
              className={`block py-2 px-10 w-full capitalize  border-b my-4`}>
              <Switcher />
            </div>
          </li>
        </ul>
      </div>
      <div>
        <button className="block py-2 px-10 w-full capitalize  border-b my-4 text-white" onClick={() => signOut()}>
          <div>
            SignOut
          </div>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
