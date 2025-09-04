

import {useAuth} from "../../context/useAuth";
import AdminHome from "./AdminHome";
import PassengerHome from "./PassengerHome";
import GuestHome from "./GuestHome";





const Home = () => {
  const { isAdmin, loading,  isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  

    if(!isAuthenticated){
      return <GuestHome />
    }

      
    return isAdmin() ? <AdminHome />  : <PassengerHome />

  



  
}
export default Home;
