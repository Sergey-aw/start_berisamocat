// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import { Suspense, useState, useEffect } from "react";
import { ProfileForm } from "@/components/ui/form_loop";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const cityData = {
  bg: {
    name: 'Богородицк',
    revenue: 1500,
    roi: 7,
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
    roi: 7,
    scooters: "46",
    model: "Ninebot Max G30",
    cityimg: "/db.jpg",
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
    roi: 7,
    scooters: "46",
    model: "Ninebot Max G30",
    cityimg: "/db.jpg",
    toinvest: 1591000,
    profit: 150000,
    listItems: [
      "без паушального взноса",
      "запускаем от 30 самокатов",
      "готовые для шеринга самокатов от ведущих мировых производителей",
      "настроенный приём платежей с зачислением на ваш счёт на следующий рабочий день",
      "база знаний по маркетингу и ремонту самокатов"
    ]
  },
};

function JoinContent() {
  const searchParams = useSearchParams();
  const [defaultCity, setDefaultCity] = useState("bg");
  const [cityimg, setCityimg] = useState('/bg.jpg');
  const [toinvest, setToinvest] = useState(0);
  const [profit, setProfit] = useState(0);
  const [roi, setRoi] = useState(0);
  const [scooters, setScooters] = useState();
  const [model, setModel] = useState("");

  const regionFromUrl = searchParams?.get("region");

// Set the initial city from URL if available.
useEffect(() => {
  if (regionFromUrl && cityData[regionFromUrl]) {
    setDefaultCity(regionFromUrl);
  }
}, [regionFromUrl]);

// Whenever defaultCity changes, update all dependent states.
useEffect(() => {
  setRoi(cityData[defaultCity].roi);
  setScooters(cityData[defaultCity].scooters);
  setCityimg(cityData[defaultCity].cityimg);
  setToinvest(cityData[defaultCity].toinvest);
  setProfit(cityData[defaultCity].profit);
  setModel(cityData[defaultCity].model);
}, [defaultCity]);


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
          />
        </Link>
      </div>
      <div className="text-4xl mx-auto text-center mt-4 font-formamedium">
        Оставь заявку
      </div>
      <div className="sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-2 container mx-auto text-left">
        <div className="text-gray-800 pb-8 mx-auto text-center">
          Отправим детали по выбранному региону на почту в течение 10-ти минут.
        </div>
        <ProfileForm setDefaultCity={setDefaultCity} initialCity={regionFromUrl} />
      </div>
      {defaultCity && (
        <div className="sm:w-full sm:p-4 md:w-10/12 lg:w-10/12 container mx-auto text-center mt-8">
          <div className="text-4xl font-formamedium text-center">
            {cityData[defaultCity].name}
          </div>
          <div className="grid lg:md:grid-cols-3 lg:md:grid-rows-4 lg:md:gap-8 sm:grid-cols-1 sm:gap-4 pt-10">
            <div className="lg:col-start-1 lg:row-start-3 lg:row-span-2 bg-beriblue rounded-xl text-left p-4 text-white">
              <div className="text-xl font-formamedium">О регионе</div>
              <div className="pt-2 font-formabold">
                <ul className="list-disc list-outside font-forma text-lg pl-4">
                  {cityData[defaultCity].listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2 lg:row-span-2 lg:col-start-2 lg:row-start-3 bg-slate-100 rounded-xl text-left p-4">
              <div className="text-xl font-formamedium">Размер инвестиций</div>
              <div className="pt-8 text-5xl text-beriblue font-formabold">
                {formatter.format(toinvest)} руб.
              </div>
            </div>
            <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 bg-slate-100 rounded-xl text-left p-4 relative min-h-64">
              <div>
                {defaultCity && (
                  <Image
                    key={defaultCity} 
                    className="object-cover rounded-xl"
                    fill={true}
                    src={cityimg}
                    alt={`Берисамокат ${cityData[defaultCity].name}`}
                  />
                )}
              </div>
            </div>
            <div className="lg:col-span-2 lg:row-span-2 bg-slate-100 rounded-xl text-left p-4">
              <div className="text-xl font-formamedium">Прибыль в месяц</div>
              <div className="pt-8 text-5xl text-beriblue font-formabold">
                от {formatter.format(profit)} руб.
              </div>
            </div>
          </div>
          <div className="grid lg:md:grid-cols-3 lg:md:grid-rows-1 lg:md:gap-8 sm:grid-cols-1 sm:gap-4 lg:md:pt-8 sm:pt-4">
            <div className="bg-slate-100 rounded-xl text-left p-4">
              <div className="text-xl font-formamedium">Окупаемость</div>
              <div className="pt-8 text-5xl text-beriblue font-formabold">
                {formatter.format(roi)} месяцев
              </div>
            </div>
            <div className="bg-slate-100 rounded-xl text-left p-4">
              <div className="text-xl font-formamedium">Количество самокатов</div>
              <div className="pt-8 text-5xl text-beriblue font-formabold">
                {scooters}
              </div>
            </div>
            <div className="bg-slate-100 rounded-xl text-left p-4">
              <div className="text-xl font-formamedium">Модель самокатов</div>
              <div className="pt-8 text-5xl text-beriblue font-formabold">
                {model}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinContent />
    </Suspense>
  );
}