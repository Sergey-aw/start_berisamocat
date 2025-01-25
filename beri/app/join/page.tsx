import { ProfileForm } from "@/components/ui/form_loop";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
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
      <div className="text-4xl mx-auto text-center mt-10 font-formamedium">Оставь заявку</div>
    <div className="sm:w-full sm:p-4 md:w-1/2 md:min-w-1/3 lg:w-1/3 p-4 container mx-auto text-left">
    <ProfileForm/>
    </div>
    </div>
  );
}
