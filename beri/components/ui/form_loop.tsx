// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MailCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from "next/link";
  
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Updating the form schema to include an email field
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
})



export function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          city: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            setIsLoading(true);
          const response = await fetch('http://localhost:3000/api/contacts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // Assuming your API expects a direct payload. Adjust according to your API's expected structure.
            body: JSON.stringify(values),
          });
      
          if (!response.ok) { // Check if the HTTP request was successful.
            throw new Error('Network response was not ok: ' + response.statusText);
          }
      
          const responseData = await response.json(); // Assuming the response is JSON.
          // Handle your response here. For example:
          console.log('Response data:', responseData);
          setIsSuccess(true);
        } catch (error) {
          // Handle any errors here
          console.error('Error during fetch operation:', error);
        }
        finally {
            setIsLoading(false);
          }
      }
        //       // Check if the request was successful
        //       if (!response.ok) {
        //         // Handle non-successful responses
        //         throw new Error(`Error: ${response.status}`);
        //       }
          
        //       // Assuming the response is JSON
        //       const data = await response.json();
          
        //       // Use the response data
        //       console.log('Success:', data.success);
        //       return data;
        //     } catch (error) {
        //       // Handle any errors
        //       console.error('Failed to update contact:', error);
        //       throw error; // Rethrow or handle as needed
        //     }
        //   }
        //   updateContact(values).then(data => {
        //     console.log('Contact update response:', data);
        //   }).catch(error => {
        //     console.error('Contact update failed:', error);
        //   });
    

  return (
    <><Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                              <Input placeholder="shadcn" {...field} />
                          </FormControl>
                      </FormItem>
                  )} />


              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input placeholder="your-email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                              Well never share your email with anyone else.
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                  )} />
              <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Регион</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Выберите регион из списка" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="Богородицк">Богородицк</SelectItem>
                                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormDescription>
                              You can manage email addresses in your{" "}
                              <Link href="/examples/forms">email settings</Link>.
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                  )} />
              <Button type="submit" disabled={isLoading} variant={isSuccess ? 'green' : 'default'}>{isLoading ? 'Loading...' : isSuccess ? 'Success!' : 'Submit'}</Button>
          </form>
      </Form>
      
            <Alert hidden={!isSuccess}>
              <MailCheckIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                  You can add components and dependencies to your app using the cli.
              </AlertDescription>
          </Alert></>
          

  );

  
}