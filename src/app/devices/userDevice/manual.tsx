"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { manualSchema } from '@/schema/index'
 import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
 

interface Props {value :

    {
        identifier:	string
        fan1:	boolean
        fan2	:	boolean
        water1	:	boolean
        water2	:	boolean
    }
}
    
const Manual = (props : Props) => {
    const form = useForm<z.infer<typeof manualSchema>>({
        resolver: zodResolver(manualSchema),
        defaultValues: {
            identifier: props.value.identifier,
            fan1:	props.value.fan1,
            fan2:	props.value.fan2,
            water1: props.value.water1,
            water2:props.value.water2,
        },
      })
     
      function onSubmit(data: z.infer<typeof manualSchema>) {
        console.log(data)
      }
     
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-row space-y-6 manual">
            <div>
              <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4 flex gap-10 justify-evenly">
              <FormField
                  control={form.control}
                  name="fan1"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                         فن 1
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="fan2"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                         فن 2
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="water1"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-center gap-5 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                         شیر اب 1
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="water2"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-5 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                         شیر اب 2
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}
 
export default Manual;