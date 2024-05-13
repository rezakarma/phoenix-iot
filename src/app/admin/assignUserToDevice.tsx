"use client"
import { useEffect, useState, useTransition } from "react";
import GetAllUsers from "./adminActions/getAllUsers";
import GetAllDevices from "./adminActions/getAllDevices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import AssignUserToDeviceAction from "./adminActions/assignUserTOdevice";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const AssignUserToDevice = () => {
    const [users, setUsers] = useState([{  value: 'loading...',
      label: 'loading...'}]);
    const [devices, setDevices] = useState([{  value: 'loading...',
    label: 'loading...'}]);
    const [userValue, setUserValue] = useState('')
    const [deviceValue, setDeviceValue] = useState('')
const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const getUsers = async()=> {
            const response = await GetAllUsers();
                const users = response.items.map((item:any) => (
                     {  value: item.id,
                    label: item.username}
                ))
                console.log('user list ',users)
                setUsers(users);
        }
        const getDevices = async()=> {
            const response = await GetAllDevices();
                const devices = response.items.map((item:any) => (
                     {  value: item.id,
                    label: item.identifier}
                ))
                console.log('d list ',devices)

                setDevices(devices);
        }
        getUsers();
        getDevices();
    },[])


      async function onSubmit() {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(userValue === '' || deviceValue === ''){
          toast.error('لطفا دستگاه و کاربر مورد نظر را انتخاب کنید')
          return
        }
        startTransition(async() => {

          const response =await AssignUserToDeviceAction({userId: userValue, deviceId: deviceValue})
          if(response.status === "error"){
            toast.error(response.message)
          }else if(response.status === 'success') {
            toast.success(response.message)
          }
        })
        }
    return (
      
      <Card className="w-[90%]">
  <CardHeader>
    <CardTitle>اتصال کاربر به دستگاه</CardTitle>
    <CardDescription>با انتخاب یک کاربر و یک دستگاه میتوانید ان ها را به یکدیگر متصل کنید</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-5 w-[50%]">

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">انتخاب کاربر</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>لیست کاربران</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={userValue}  onValueChange={setUserValue}>
          {users.map((items) => (
            <DropdownMenuRadioItem key={items.value} value={items.value}>{items.label}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    


    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">انتخاب دستگاه</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>لیست دستگاه ها</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={deviceValue}  onValueChange={setDeviceValue}>
          {devices.map((items) => (
            <DropdownMenuRadioItem key={items.value} value={items.value}>{items.label}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button onClick={onSubmit} disabled={isPending}>
              {isPending ? " در حال بارگذاری" : "اعمال"} 
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
     
          </CardContent>
        </Card>


     );
}
 
export default AssignUserToDevice;