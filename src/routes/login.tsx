import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | Rural Digital Literacy" },
      { name: "description", content: "Sign in to continue your digital literacy courses, track lessons and download certificates." },
      { property: "og:title", content: "Login | Rural Digital Literacy" },
      { property: "og:description", content: "Learner and admin sign in for the rural digital literacy platform." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);

  /** Client-side validation for every field. */
  const validate = () => {
    const e: Record<string, string> = {};
    if (form.username.trim().length < 3) e["username"] = "Username must be at least 3 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e["email"] = "Enter a valid email address.";
    if (form.password.length < 6) e["password"] = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }
    toast.success(`Welcome back, ${form.username}!`);
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value }),
  });

  return (
    <div>
      <PageHero eyebrow="Login" title="Welcome back" subtitle="Sign in to continue learning." />
      <section className="mx-auto max-w-md px-4 py-16">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" className="mt-1.5" placeholder="ramesh_naidu" {...field("username")} />
                {errors["username"] && <p className="mt-1 text-xs text-destructive">{errors["username"]}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="mt-1.5" placeholder="you@example.com" {...field("email")} />
                {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input id="password" type={show ? "text" : "password"} placeholder="••••••" {...field("password")} />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors["password"] && <p className="mt-1 text-xs text-destructive">{errors["password"]}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox id="remember" /> Remember me
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("A reset link will be sent to your registered email.")}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full">
                <LogIn className="mr-1 size-4" /> Login
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
