"use client";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  DialogFooter,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import DeleteUserOrDeviceAction from "../../adminActions/deleteUserOrDevice";
import UpdateUserForm from "@/components/admin/forms/updateUserForm";
import UpdateUserOrDeviceAction from "../../adminActions/updateUserOrDevice";
import ToggleUserActivity from "../../adminActions/toggleUserActivity";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  isActive: boolean;
  username: string;
  role: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "isActive",
    header: "فعال",
  },

  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          نام کاربری
          <ArrowUpDown className="ml-2 h-4 w-4 mx-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "role",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteDevice = async () => {
        const userId = row.original.id;
        const deletedUser = await DeleteUserOrDeviceAction({
          id: userId,
          apiPath: "users/remove",
          type: "کاربر",
        });
        if (deletedUser.status === "error") {
          toast.error(deletedUser.message);
        } else if (deletedUser.status === "success") {
          toast.success(deletedUser.message);
        }
      };

      const updateUser = async (values: any) => {
        const userId = row.original.id;
        const updatedUser = await UpdateUserOrDeviceAction({
          data: values,
          apiPath: "users/update/",
          type: "کاربر",
          id: userId,
        });
        if (updatedUser.status === "error") {
          toast.error(updatedUser.message);
        } else if (updatedUser.status === "success") {
          toast.success(updatedUser.message);
        }
        return updatedUser;
      };

      const toggleActivity = async () => {
        const userId = row.original.id;
        const updatedUser = await ToggleUserActivity({ id: userId });
        if (updatedUser.status === "error") {
          toast.error(updatedUser.message);
        } else if (updatedUser.status === "success") {
          toast.success(updatedUser.message);
        }
        return;
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
                  <DropdownMenuItem>ویرایش کاربر</DropdownMenuItem>
                </DialogTrigger>
   
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-700 bg-red-300/25"
                onClick={toggleActivity}
              >
                فعال/غیر فعال
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {row.original.role !== "Admin" && (
              <DropdownMenuItem
                className="text-red-700 bg-red-300/25"
                onClick={deleteDevice}
              >
                حذف کاربر
              </DropdownMenuItem>
                         )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>ویرایش کاربر</DialogTitle>
            </DialogHeader>
            <UpdateUserForm onSubmit={updateUser} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
