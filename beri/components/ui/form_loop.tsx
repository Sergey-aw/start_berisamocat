// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"
import { useState, useEffect } from "react";
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
  
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Updating the form schema to include an email field
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Слишком короткое имя.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Кажется это не номер телефона.",
  }),  
  email: z.string().email({
    message: "Кажется, это не email.",
  }),
  city: z.string().min(2, {
    message: "Выберите регион из списка.",
  }),
})



export function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [defaultCity, setDefaultCity] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        phone: "",
        email: "",
        city: defaultCity,
      },
    })

    const getRegionFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const region = params.get('region');
      const regionMap = {
          bg: 'Богородицк',
          bd: 'Буддёновск',
          sh: 'Салехард'
      };
      return region && regionMap[region] ? regionMap[region] : '';
  }

  useEffect(() => {
    const cityFromUrl = getRegionFromUrl();
    if (cityFromUrl) {
      setDefaultCity(cityFromUrl);
      form.setValue('city', cityFromUrl);
      console.log('City from URL:', cityFromUrl);
    }
  }, [form]);
      

      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            setIsLoading(true);
          const response = await fetch('/api/contacts/', {
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
    <>
     {!isSuccess && (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Как вас зовут?</FormLabel>
                          <FormControl>
                              <Input placeholder="Иван Самокатный" {...field} />
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
                              <Input placeholder="ivan@yandex.ru" {...field} />
                          </FormControl>
                          <FormDescription>
                              Ни с кем не делимся вашей почтой и не спамим
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                  )} />
    <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                              <Input placeholder="+7 999 99-99-99" {...field} />
                          </FormControl>
                          {/* <FormDescription>
                              Ни с кем не делимся вашей почтой и не спамим
                          </FormDescription> */}
                          <FormMessage />
                      </FormItem>
                  )} />




              <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Регион</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || defaultCity}>
                              <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Выберите регион из списка" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="Богородицк">Богородицк</SelectItem>
                                  <SelectItem value="Буддёновск">Буддёновск</SelectItem>
                                  <SelectItem value="Салехард">Салехард</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormDescription>
                             
                          </FormDescription>
                          <FormMessage />
                      </FormItem>
                  )} />
              <Button type="submit" disabled={isLoading} variant={isSuccess ? 'green' : 'default'}>{isLoading ? 'Отправляем..' : isSuccess ? 'Успешно!' : 'Отправить'}</Button>
          </form>
      </Form>
      )}
            <Alert hidden={!isSuccess}>
              <MailCheckIcon className="h-4 w-4" />
              <AlertTitle className="text-lg">Заявка отправлена!</AlertTitle>
              <AlertDescription>
                  В течение 5-ти минут вы получите письмо на указанный адрес с актуальными предложениями по готовым регионам.
              </AlertDescription>
          </Alert></>
          

  );

  
}
export default ProfileForm;