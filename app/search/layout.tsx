import Link from "next/link";
import { getCurrentUserId } from "@/app/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/search"
            className="font-semibold text-zinc-800 dark:text-zinc-100"
          >
            WildNest
          </Link>
          {userId ? (
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Sign out
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
