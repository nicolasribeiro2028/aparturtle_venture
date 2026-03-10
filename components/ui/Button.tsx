"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--bauhaus-green)] text-white hover:bg-[var(--bauhaus-green-dark)] border-2 border-[var(--bauhaus-green-dark)]",
  secondary:
    "bg-[var(--bauhaus-purple)] text-white hover:bg-[var(--bauhaus-purple-dark)] border-2 border-[var(--bauhaus-purple-dark)]",
  outline:
    "bg-transparent text-[var(--bauhaus-neutral)] border-2 border-[var(--bauhaus-neutral)] hover:bg-[var(--bauhaus-neutral)] hover:text-[var(--background)]",
};

const base =
  "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--bauhaus-green)] focus:ring-offset-2 rounded-none";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

export function Button(props: ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant = "primary", children, className = "", ...rest } = props;
  const combined = `${base} ${variantStyles[variant]} ${className}`.trim();
  return (
    <button type="button" className={combined} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
} & Partial<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">>;

export function ButtonLink(props: ButtonLinkProps) {
  const { variant = "primary", children, className = "", href, ...rest } = props;
  const combined = `${base} ${variantStyles[variant]} ${className}`.trim();
  return (
    <Link href={href} className={combined} {...rest}>
      {children}
    </Link>
  );
}
