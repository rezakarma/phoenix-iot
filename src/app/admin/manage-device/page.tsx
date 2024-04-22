import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDevice from "./addDevice";
import DeviceList from "./deviceLists/deviceLists";

const ManageDevice = () => {
  return (
    <div className="flex flex-col justify-start h-[90%]">
      <Tabs defaultValue="createDevice" className="w-[90%]">
        <TabsList>
          <TabsTrigger value="createDevice">ساختن دستگاه</TabsTrigger>
          <TabsTrigger value="deviceList">لیست تمامی دستگاه ها</TabsTrigger>
        </TabsList>
        <TabsContent value="createDevice">
          <AddDevice />
        </TabsContent>
        <TabsContent value="deviceList">
          <DeviceList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageDevice;
