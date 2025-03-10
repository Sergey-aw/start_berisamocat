// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, MailCheckIcon } from "lucide-react";
import Link from "next/link";
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

export function ProfileForm({ setDefaultCity, initialCity }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      city: initialCity,
    },
  });

  useEffect(() => {
    if (initialCity) {
      setDefaultCity(initialCity);
    }
  }, [initialCity, setDefaultCity]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await fetch('/api/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          formType: 'Форма присоединиться'
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      const responseData = await response.json();
      console.log('Response data:', responseData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error during fetch operation:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isSuccess && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              )}
            />

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
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 999 99-99-99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регион</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      form.setValue('city', value);
                      setDefaultCity(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите регион из списка" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bg">Богородицк</SelectItem>
                      <SelectItem value="db">Дубна</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              size="lg" 
              className="w-full text-lg" 
              type="submit" 
              disabled={isLoading} 
              variant={isSuccess ? 'green' : 'default'}
            >
              {isLoading ? 'Отправляем..' : isSuccess ? 'Успешно!' : 'Отправить'}
            </Button>
          </form>
        </Form>
      )}

      <Alert hidden={!isSuccess}>
        <MailCheckIcon className="h-4 w-4" />
        <AlertTitle className="text-lg">Заявка отправлена!</AlertTitle>
        <AlertDescription>
          Скоро вы получите письмо на указанный адрес с актуальными предложениями по готовым регионам и подробную презентацию про наш сервис.
          <p className="pt-4">
            <Link href="/" className="text-gray-800 underline hover:text-blue-700">
              Вернуться на главную <ArrowRight className="inline" size={14}/>
            </Link>
          </p>
        </AlertDescription>
      </Alert>
    </>
  );
}

export default ProfileForm;