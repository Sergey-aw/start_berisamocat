"use client";
import { ProfileForm } from "@/components/ui/form_loop_franch";
import Image from "next/image";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import React, { useState } from 'react';



export default function Home() {
    const [sliderValue, setSliderValue] = useState(50);
    let perscooter=650;
    const handleSliderChange = (value) => {
        setSliderValue(value); // Assuming the slider returns an array of values
    };

    if (sliderValue >= 1 && sliderValue <= 100) {
      perscooter = Math.round(550*(1 + (sliderValue - 1) / 99)); // Map A from 1-100 to 1-2
    } else if (sliderValue > 100 && sliderValue <= 200) {
      perscooter = Math.round(550*(2 - (sliderValue - 100) / 200 * 0.5)); // Map A from 100-200 to 2-1.5
    }
    const scooter = 75000;
    let profit = Math.round((sliderValue * perscooter * 28 * 7 * 0.5));
    const revenue = Math.round(profit / 0.5 / 7);
    const roi =  Math.round((sliderValue * scooter ) / (profit / 7) );
    const invest=scooter*sliderValue;
    
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
    });
    

  return (
    <div>
      <div>
      <Link href="/">
      <Image
       className="w-2/5 p-4 max-w-64"
       src="/logo_beri_min.svg"
       alt="Берисамокат"
       width={250}
       height={50}
       ></Image></Link></div>
      <div className="text-4xl mx-auto text-center mt-4 font-formamedium">Оставить заявку <br/>на франшизу Берисамокат</div>
    <div className="sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-2 container mx-auto text-left">
    <div className="text-gray-800 pb-8 mx-auto text-center">Отправим презентацию на почту в течение 10-ти минут.</div>
    <ProfileForm/>

    </div>

{/* Grid with cards  */}

<div className="sm:w-full sm:p-4 md:w-11/12 lg:w-11/12 p-2 container mx-auto text-center">
<div className="grid lg:md:grid-cols-3 lg:md:grid-rows-3 lg:md:gap-8 sm:grid-cols-1 sm:gap-4 pt-10">



<div className="lg:col-start-3 lg:row-start-2 lg:row-span-2 bg-beriblue rounded-xl text-left p-4 text-white"><div className="text-xl font-formamedium">Условия запуска</div><div className="pt-2 font-formabold">
    <ul className="list-disc list-outside font-forma text-lg pl-4">
        <li>без паушального взноса</li>
        <li>запускаем от 10 самокатов</li>
        <li>готовые для шеринга самокаты от ведущих мировых производителей</li>
        <li>настроенный приём платежей с зачислением на ваш счёт на следующий рабочий день</li>
        <li>база знаний по маркетингу и ремонту самокатов</li>
      </ul>
      </div></div>

    <div className="lg:row-span-1 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Количество самокатов</div><div className="pt-8 text-5xl text-beriblue font-formabold">
    <p className="pb-4">{sliderValue}</p>
    <Slider defaultValue={[50]} max={200} step={1} min={10} onValueChange={handleSliderChange}  className="pb-4"/>
    
      
    </div></div>
   
    <div className="lg:col-start-2 lg:row-start-1 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Средняя выручка за месяц</div><div className="pt-8 text-5xl text-beriblue font-formabold">{formatter.format(revenue)} р.</div></div>
    <div className="lg:col-start-2 lg:row-start-2 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Прибыль за сезон, 7 месяцев</div><div className="pt-8 text-5xl text-beriblue font-formabold">{formatter.format(profit)} р.</div></div>
    <div className="lg:row-span-2 lg:col-start-1 lg:row-start-2 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Средняя выручка с одного самоката</div><div className="pt-8 text-5xl text-beriblue font-formabold">{perscooter} руб.</div>
    <div className="pt-4">
      <Image
       className="w-2/3 p-4"
       src="/laptop.svg"
       alt="Берисамокат"
       width={250}
       height={250}
      ></Image></div>
      </div>
    <div className="lg:col-start-2 lg:row-start-3 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Окупаемость</div><div className="pt-8 text-5xl text-beriblue font-formabold">{roi} мес.</div></div>
    <div className="lg:col-start-3 lg:row-start-1 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Инвестиции в самокаты</div><div className="pt-8 text-5xl text-beriblue font-formabold">{formatter.format(invest)} р.</div></div>
  

</div>
    </div>

    </div>
  );
}
