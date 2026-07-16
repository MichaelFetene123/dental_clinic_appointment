"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { login } from "@/lib/actions/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 p-4">
      <div className="w-full max-w-md relative">
        <Link 
          href="/" 
          className="absolute -top-12 left-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <BiArrowBack className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex flex-col items-center justify-center gap-3 mb-2">
              <Image
                src="/images/logo/logo-1.png"
                alt="Clinic Logo"
                width={80}
                height={80}
                className="w-auto h-auto object-contain"
                priority
              />
              <h1 className="text-2xl font-boruna text-primary tracking-tight">Classic Dental Clinic</h1>
            </div>
            <div className="space-y-1.5 text-center">
              <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </div>
          </CardHeader>
          
          <form action={formAction}>
            <CardContent className="space-y-4">
              {state?.error && (
                <div className="rounded-md bg-destructive/15 border border-destructive/30 px-4 py-3 text-sm text-destructive font-medium flex items-center">
                  {state.error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="#" 
                    className="text-xs font-medium text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isPending}
                  className="bg-background"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full font-medium"
                size="lg"
              >
                {isPending ? "Signing in..." : "Log in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
