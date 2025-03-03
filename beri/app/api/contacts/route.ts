// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import { sendTelegramMessage } from "@/lib/utils";

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);
  
export async function POST(request: NextRequest) {
  const res = await request.json();

  const contactProperties: Record<string, string | number> = {
    firstName: res["username"], 
    phone: res["phone"],
    city: res["city"] 
  };
  
  const email = res["email"];

  // Note: updateContact() will create or update a contact
  const resp: {
    success: boolean,
    id?: string,
    message?: string
  } = await loops.updateContact(email, contactProperties);

  // Send data to Telegram
  const formType = res["formType"] || "Основная форма";
  const telegramMessage = `
<b>Новая заявка с сайта (${formType}):</b>
<b>Имя:</b> ${res["username"] || "Не указано"}
<b>Телефон:</b> ${res["phone"] || "Не указано"}
<b>Email:</b> ${email || "Не указано"}
<b>Регион:</b> ${res["city"] || "Не указано"}
  `;
  
  try {
    await sendTelegramMessage(telegramMessage);
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    // Don't fail the request if Telegram notification fails
  }

  return NextResponse.json({ success: resp.success });
}
