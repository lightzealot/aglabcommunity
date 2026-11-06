import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { memberNumber } from "@/lib/member-number";
import { getSession } from "@/lib/session";
import { OnboardingForm } from "./form";

export const metadata = { title: "Bienvenido" };

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.onboarded) redirect("/");

  const number = await memberNumber(session.user.createdAt);

  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <h1 className="display text-center text-5xl">
        Bienvenido<span className="text-accent">.</span>
      </h1>
      <p className="mt-3 mb-8 text-center text-ash">
        Pon tu foto y tu nombre. Así se verá tu tarjeta de miembro.
      </p>
      <OnboardingForm
        defaultName={session.user.name}
        image={session.user.image ?? null}
        number={number}
        since={session.user.createdAt.toISOString()}
      />
    </main>
  );
}
