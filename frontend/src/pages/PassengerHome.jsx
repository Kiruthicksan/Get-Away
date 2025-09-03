import { useForm } from "react-hook-form";

import { useAuth } from "../context/useAuth";

import MainNavbar from "../components/navbar/MainNavbar";

const PassengerHome = () => {
 
  const { user} = useAuth();
  return (
    <div>
     
      
      <div>
        <div className="flex flex-col justify-center text-center mt-8 tracking-wider leading-7 mb-5">
          <h1 className="font-extrabold text-2xl ">
            Welcome Back,{" "}
            {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}{" "}
          </h1>
          <p className="text-sm ">Find and book your next flight</p>
        </div>

        <div>
          <h1>Quick Flight Search</h1>
          <div>
            <div>
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerHome;
