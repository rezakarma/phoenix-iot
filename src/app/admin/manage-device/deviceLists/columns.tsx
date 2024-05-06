"use client";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown } from "lucide-react";
import DeleteUserOrDeviceAction from "../../adminActions/deleteUserOrDevice";
import UpdateDeviceForm from "@/components/admin/forms/updateDeviceForm";
import UpdateUserOrDeviceAction from "../../adminActions/updateUserOrDevice";
import GetUserOrDeviceAction from "../../adminActions/getUserOrDevice";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Devices = {
  id: string;
  identifier: string;
  setting: string;
  belongToUsername: string;
  temperature: string;
  humidity: string;
  isSync: boolean;
};

export const columns: ColumnDef<Devices>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },

  {
    accessorKey: "identifier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          identifier
          <ArrowUpDown className="ml-2 h-4 w-4 mx-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "belongToUsername",
    header: "مطعلق به کاربر",
  },
  {
    accessorKey: "temperature",
    header: "دما",
  },
  {
    accessorKey: "humidity",
    header: "رطوبت",
  },
  {
    accessorKey: "isSync",
    header: "isSync",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fetchDeviceData = async () => {
        const deviceId = row.original.id;
        const getDevice = await GetUserOrDeviceAction({
          id: deviceId,
          apiPath: "device/get-device",
          type: "دستگاه",
        });
        if (getDevice) {
          if (getDevice.status === "error") {
            return {
              identifier: "",
              switch1Name: "",
              switch2Name: "",
              switch3Name: "",
              switch4Name: "",
            };
          } else {
            return {
              identifier: getDevice.identifier,
              switch1Name: getDevice.switch1Name,
              switch2Name: getDevice.switch2Name,
              switch3Name: getDevice.switch3Name,
              switch4Name: getDevice.switch4Name,
            };
          }
        }
      };
      const deleteDevice = async () => {
        const deviceId = row.original.id;
        const deletedDevice = await DeleteUserOrDeviceAction({
          id: deviceId,
          apiPath: "device/delete-device",
          type: "دستگاه",
        });
        if (deletedDevice.status === "error") {
          toast.error(deletedDevice.message);
        } else if (deletedDevice.status === "success") {
          toast.success(deletedDevice.message);
        }
      };

      const updateDevice = async (values: any) => {
        const deviceId = row.original.id;
        const device = {
          id: deviceId,
          identifier: values.identifier,
          switch1Name: values.switch1Name,
          switch2Name: values.switch2Name,
          switch3Name: values.switch3Name,
          switch4Name: values.switch4Name,
        };
        console.log(device)
        const updatedUser = await UpdateUserOrDeviceAction({
          data: device,
          apiPath: "device/update-device",
          type: "دستگاه",
          id: "",
        });
        if (updatedUser.status === "error") {
          toast.error(updatedUser.message);
        } else if (updatedUser.status === "success") {
          toast.success(updatedUser.message);
        }
        return updatedUser;
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem>ویرایش دستگاه</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-700 bg-red-300/25"
                onClick={deleteDevice}
              >
                حذف دستگاه
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>ویرایش دستگاه</DialogTitle>
            </DialogHeader>
            <UpdateDeviceForm
              onSubmit={updateDevice}
              deviceData={fetchDeviceData}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
