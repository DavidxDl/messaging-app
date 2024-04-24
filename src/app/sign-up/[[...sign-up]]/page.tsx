import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="h-svh flex items-center justify-center">
      <SignUp path="/sign-up" />
    </main>
  )
}
