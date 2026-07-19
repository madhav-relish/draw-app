"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_ENDPOINT } from "@/config";
import { Button, Input, Card, Divider, Background } from "@repo/ui";

interface AuthPageProps {
  isSignin: boolean;
}

export default function AuthPage({ isSignin }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (bodyData: { email: string; password: string; name: string }) => {
    try {
      setLoading(true);
      setError(null);
      const baseUrl = BACKEND_ENDPOINT || "http://localhost:3004";
      const response = await axios.post(`${baseUrl}/signup`, bodyData);
      console.log("SignedUp::", response.data);
      router.push("/signin");
    } catch (err: any) {
      console.error("Error while signing up::", err);
      setError(err.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (bodyData: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const baseUrl = BACKEND_ENDPOINT || "http://localhost:3004";
      const response = await axios.post(`${baseUrl}/signin`, bodyData);
      console.log("SignedIn::", response.data);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
    } catch (err: any) {
      console.error("Error while signing in::", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignin) {
      await handleSignin({ email, password });
    } else {
      await handleSignup({ email, password, name });
    }
  };

  return (
    <Background>
      {/* Top Right Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Centered Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card variant="hoverable">
          {/* Brand Logo & Link */}
          <Link href="/" className="inline-flex items-center gap-2.5 mx-auto group select-none">
            <div className="w-8 h-8 rounded-md bg-primary border-2 border-border shadow-[3px_3px_0_0_var(--border-color)] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0_0_var(--border-color)] active:translate-y-0 transition-brutal flex items-center justify-center text-white font-clash font-bold text-lg leading-none">
              F
            </div>
            <span className="font-clash font-semibold text-xl tracking-[-0.03em] text-foreground">
              Figment
            </span>
          </Link>

          {/* Heading Titles */}
          <div className="text-center">
            <h1 className="font-clash text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">
              {isSignin ? "Welcome back." : "Create your space."}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-[280px] mx-auto font-medium">
              {isSignin
                ? "Enter your details below to resume sketching."
                : "Start diagramming and collaborating with your team in seconds."}
            </p>
          </div>

          {/* OAuth Buttons (Social) */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => console.log("OAuth Github")}
              leftIcon={
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.069.069-.608 0 .963.748 1.47 1.473 1.47 1.258.822 2.379.584 2.964.446.077-.544.295-.908.536-1.116-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              }
            >
              Github
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => console.log("OAuth Google")}
              leftIcon={
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.832 0-8.73-3.87-8.73-8.599 0-4.73 3.898-8.599 8.73-8.599 2.244 0 4.133.79 5.613 2.204l3.12-3.076C18.17 1.012 15.42 0 12.24 0 5.48 0 0 5.373 0 12s5.48 12 12.24 12c6.9 0 11.52-4.757 11.52-11.52 0-.79-.086-1.524-.22-2.195H12.24z" />
                </svg>
              }
            >
              Google
            </Button>
          </div>

          {/* Divider */}
          <Divider label="or continue with" />

          {/* Form Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border-2 border-red-500/30 text-red-500 text-xs font-sans font-bold text-center">
              {error}
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isSignin && (
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Marcus Vance"
                required
              />
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="marcus@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={loading}
              rightIcon={<ArrowRight size={16} className="stroke-[2.5]" />}
              className="mt-2"
            >
              {isSignin ? "Sign in" : "Create account"}
            </Button>
          </form>

          {/* Footer Crossover links */}
          <div className="text-center font-sans text-xs font-semibold text-foreground/60 select-none">
            {isSignin ? (
              <>
                New to Figment?{" "}
                <Link href="/signup" className="text-primary hover:underline font-bold">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline font-bold">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    </Background>
  );
}