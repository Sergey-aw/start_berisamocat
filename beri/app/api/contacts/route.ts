// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";


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

  return NextResponse.json({ success: resp.success });
}
