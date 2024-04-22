"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Manual from "./manual";

const UserDevice = () => {
  return (
    <div className="flex flex-col w-full h-full gap-5 manual ltr">
      <div className="w-full flex gap-2 justify-end">
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-lx">حالت دستگاه:</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالت دستگاه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manual">دستی</SelectItem>
            <SelectItem value="Sensor">سنسور</SelectItem>
            <SelectItem value="Timer">تایمر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Tabs defaultValue="Manual" className="w-[100%]">
          <TabsList>
            <TabsTrigger value="Manual">دستی</TabsTrigger>
            <TabsTrigger value="Sensor">سنسنور</TabsTrigger>
            <TabsTrigger value="Timer">تایمر</TabsTrigger>
          </TabsList>
          <TabsContent value="Manual">
            <Manual
              value={{
                identifier: "string",
                fan1: true,
                fan2: false,
                water1: true,
                water2: true,
              }}
            />
          </TabsContent>
          <TabsContent value="Sensor">Change your password here.</TabsContent>
          <TabsContent value="Timer">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDevice;
