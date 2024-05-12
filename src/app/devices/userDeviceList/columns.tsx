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
import GetToken from "@/app/auth/getToken";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Devices = {
  id: string;
  identifier: string;
  setting: string;
  temperature: string;
  humidity: string;
  fanSwitch1: boolean;
  fanSwitch2: boolean;
  waterSwitch1: boolean;
  waterSwitch2: boolean;
  fanSwitchOnAt: number;
  fanSwitchOffAt: number;
  waterSwitchOffAt: string;
  isSync: boolean;
};
import GetDevice from '@/app/devices/userAction/getDevice'
import UserDevice from "../userDevice/page";
export const columns: ColumnDef<Devices>[] = [

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
    accessorKey: "setting",
    header: "نوع تظیم",
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
    accessorKey: "fanSwitch1",
    header: "فن 1",
  },
  {
    accessorKey: "fanSwitch2",
    header: "فن 2",
  },
  {
    accessorKey: "waterSwitch1",
    header: "شیر اب 1",
  },
  {
    accessorKey: "waterSwitch2",
    header: "شیر اب 2",
  },
  {
    accessorKey: "fanSwitchOnAt",
    header: "دما روشن شدن فن ها",
  },
  {
    accessorKey: "fanSwitchOffAt",
    header: "دما خاموش شدن فن ها",
  },
  {
    accessorKey: "waterSwitchOffAt",
    header: "رطوبت خاموش شدن شیر اب",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fetchDevice = async () => {
        const result = await GetDevice(row.original.id);
        console.log(result)
        if(result.id){
          // const newObject = {
          //   identifier: result.identifier,
          //   fan1: result.fanSwitch1,
          //   fan2: result.fanSwitch2,
          //   water1: result.waterSwitch1,
          //   water2: result.waterSwitch2
          // };
          
          return result
        }
        if(result.status) {
          if(result.status === 'error'){
            toast.error(result.message)
            return

          }else if(result.status === 'successs'){
            toast.success(result.message)
            return

          }
        }
        toast.error('خطایی رخ داده است ، لطفا بعدا مجدد تلاش کنید')
        return 'nothing'

      };

      let newObject = {

      }






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
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="w-full max-w-md h-full md:h-auto md:max-w-xl">
            <DialogHeader>
              <DialogTitle>ویرایش دستگاه</DialogTitle>
            </DialogHeader>
            <UserDevice value={fetchDevice}/>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
