import AdminNvbar from "@/components/admin/adminNavber";
import AdminSideBar from "@/components/admin/sidebar/adminSideBar";

const userLayout = ({ children }) => {
    return ( 
        <div className="flex flex-col ">
      <div className="absolute h-[8%] min-h-fit w-[100%] z-10 bg-white flex  justify-center items-center shadow-lg">
      <AdminNvbar/>
      </div>
      <div className="flex w-[100%] h-screen">
        <div className="w-full dark:bg-gray-700 bg-bgGray flex justify-center items-center">
            <div className="h-[80%] w-[95%]">

          {children}
            </div>
        </div>
      </div>
    </div>
     );
}
 
export default userLayout;