import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddUsers from "./addUser";
import UsersList from "./usersList/usersList";

const ManageUsers = () => {
  return (
    <div className="flex flex-col justify-start h-[90%]">
      <Tabs defaultValue="createUsers" className="w-[90%]">
        <TabsList>
          <TabsTrigger value="createUsers">ساختن کاربر</TabsTrigger>
          <TabsTrigger value="usersList">لیست تمامی کاربران</TabsTrigger>
        </TabsList>
        <TabsContent value="createUsers">
          <AddUsers />
        </TabsContent>
        <TabsContent value="usersList">
          <UsersList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageUsers;
