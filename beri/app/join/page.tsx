// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import { ProfileForm } from "@/components/ui/form_loop";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const cityData = {
  bg: {
    name: 'Богородицк',
    revenue: 1500,
    roi:7,
    scooters: 46,
    model: "Ninebot Max G30",
    cityimg: "/bg.jpg",
    toinvest: 1591000,
    profit: 150000,
    listItems: [
      "без паушального взноса",
      "запускаем от 10 самокатов",
      "готовые для шеринга самокаты от ведущих мировых производителей",
      "настроенный приём платежей с зачислением на ваш счёт на следующий рабочий день",
      "база знаний по маркетингу и ремонту самокатов"
    ]
  },
  db: {
    name: 'Дубна',
    revenue: 2000,
    roi:7,
    scooters: "46",
    model: "Ninebot Max G30",
    cityimg: "/bd.jpg",
    toinvest: 1591000,
    profit: 150000,
    listItems: [
      "Успешно работает с 2022 года",
      "Население 75 тыс. человек, в регионе присутствуют конкуренты",
      "Имеется штат сотрудников по развозу и ремонту самокатов",
      "Договор аренды помещения и инструменты для ремонта",
      "Продажа по причине переезда"
    ]
  },
  sh: {
    name: 'Салехард',
    revenue: 3000,
    roi:7,
    scooters: "46",
    model: "Ninebot Max G30",
    cityimg: "/sh.jpg",
    toinvest: 1591000,
    profit: 150000,
    listItems: [
      "без паушального взноса",
      "запускаем от 30 самокатов",
      "готовые для шеринга самокаты от ведущих мировых производителей",
      "настроенный приём платежей с зачислением на ваш счёт на следующий рабочий день",
      "база знаний по маркетингу и ремонту самокатов"
    ]
  },
};

export default function Home() {
  const [defaultCity, setDefaultCity] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [revenue, setRevenue] = useState(0);
  const [cityimg, setCityimg] = useState('');
  const [toinvest, setToinvest] = useState(0);
  const [profit, setProfit] = useState(0);
  const [roi, setRoi] = useState(0);
  const [scooters, setScooters] = useState();
  const [model, setModel] = useState("");


  const getRegionFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const region = params.get('region');
    if (region && cityData[region]) {
      return region;
    }
    return "bg"; // or return a default value like 'bg'
  };
  useEffect(() => {
    const cityFromUrl = getRegionFromUrl();
    if (cityFromUrl) {
      setDefaultCity(cityFromUrl);
      setRevenue(cityData[cityFromUrl].revenue);
      setRoi(cityData[cityFromUrl].roi);
      setScooters(cityData[cityFromUrl].scooters);
      setCityimg(cityData[cityFromUrl].cityimg);
      setToinvest(cityData[cityFromUrl].toinvest);
      setProfit(cityData[cityFromUrl].profit);
      setModel(cityData[cityFromUrl].model);
      console.log('City from URL:', defaultCity);
    }
  }, []);

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
      <div className="text-4xl mx-auto text-center mt-4 font-formamedium">Оставь заявку</div>
    <div className="sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-2 container mx-auto text-left">
    <div className="text-gray-800 pb-8 mx-auto text-center">Отправим детали по выбранному региону на почту в течение 10-ти минут.</div>
    <ProfileForm setDefaultCity={setDefaultCity} />
    </div>


{/* Grid with cards  */}
{ defaultCity && (
<div className="sm:w-full sm:p-4 md:w-10/12 lg:w-10/12 container mx-auto text-center mt-8">
<div className="text-4xl font-formamedium text-center">{cityData[defaultCity].name}</div>

<div className="grid lg:md:grid-cols-3 lg:md:grid-rows-4 lg:md:gap-8 sm:grid-cols-1 sm:gap-4 pt-10">


<div className="lg:col-start-1 lg:row-start-3 lg:row-span-2 bg-beriblue rounded-xl text-left p-4 text-white"><div className="text-xl font-formamedium">О регионе</div><div className="pt-2 font-formabold">
    <ul className="list-disc list-outside font-forma text-lg pl-4">
    {cityData[defaultCity] && cityData[defaultCity].listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
      </ul>
      </div></div>


   
    <div className="lg:col-span-2 lg:row-span-2 lg:col-start-2 lg:row-start-3 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Размер инвестиций</div><div className="pt-8 text-5xl text-beriblue font-formabold">{formatter.format(toinvest)} руб.</div></div>
    <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 bg-slate-100 rounded-xl text-left p-4 relative min-h-64">  <div>
    {cityimg && (
  <Image
    className="object-cover rounded-xl"
    fill={true}
    src={cityimg}
    alt="Берисамокат"
  />
)}</div></div>
    <div className="lg:col-span-2 lg:row-span-2 bg-slate-100 rounded-xl text-left p-4"><div className="text-xl font-formamedium">Прибыль в месяц</div><div className="pt-8 text-5xl text-beriblue font-formabold">от {formatter.format(profit)} руб.</div>
    
      </div>
  

</div>
<div className="grid lg:md:grid-cols-3 lg:md:grid-rows-1 lg:md:gap-8 sm:grid-cols-1 sm:gap-4 lg:md:pt-8 sm:pt-4">
    <div className="bg-slate-100 rounded-xl text-left p-4" >
    <div className="text-xl font-formamedium">Окупаемость</div><div className="pt-8 text-5xl text-beriblue font-formabold">{formatter.format(roi)} месяцев</div>
    </div>
    <div className="bg-slate-100 rounded-xl text-left p-4">
    <div className="text-xl font-formamedium">Количество самокатов</div><div className="pt-8 text-5xl text-beriblue font-formabold">{scooters}</div>
    </div>
    <div className="bg-slate-100 rounded-xl text-left p-4">
    <div className="text-xl font-formamedium">Модель самокатов</div><div className="pt-8 text-5xl text-beriblue font-formabold">{model}</div>
    </div>
</div>
    
</div>

)}

    </div>
  );
}
