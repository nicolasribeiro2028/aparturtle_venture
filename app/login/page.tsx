import { ButtonLink } from "@/components/ui";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <h1 className="text-2xl font-bold text-[var(--bauhaus-neutral)]">
        Sign in
      </h1>
      <p className="text-center text-[var(--bauhaus-muted)]">
        Auth will be implemented in Step 3. Use the button below to return.
      </p>
      <ButtonLink href="/" variant="outline" className="px-6 py-3">
        Back to home
      </ButtonLink>
    </div>
  );
}
