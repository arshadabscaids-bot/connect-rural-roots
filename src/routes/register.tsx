import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registration | Rural Digital Literacy" },
      { name: "description", content: "Register free for village digital literacy courses with your name, mobile number, village and district." },
      { property: "og:title", content: "Registration | Rural Digital Literacy" },
      { property: "og:description", content: "Create your free learner account in two minutes." },
    ],
  }),
  component: RegisterPage,
});

const EMPTY = {
  fullName: "",
  email: "",
  mobile: "",
  address: "",
  village: "",
  district: "",
  state: "",
  password: "",
  confirm: "",
};

function RegisterPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** JavaScript validation for all registration fields. */
  const validate = () => {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 3) e.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 5) e.address = "Address is too short.";
    if (!form.village.trim()) e.village = "Village is required.";
    if (!form.district.trim()) e.district = "District is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    toast.success("Registration successful! You can now log in.");
    setForm(EMPTY);
  };

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const text = (k: keyof typeof EMPTY, label: string, placeholder: string, type = "text") => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} className="mt-1.5" placeholder={placeholder} value={form[k]} onChange={set(k)} />
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <div>
      <PageHero eyebrow="Registration" title="Join the programme" subtitle="Free enrolment for every rural learner." />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
              {text("fullName", "Full Name", "Ramesh Naidu")}
              {text("email", "Email", "you@example.com", "email")}
              {text("mobile", "Mobile Number", "9876543210")}
              {text("village", "Village", "Kothapalli")}
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" className="mt-1.5" placeholder="House number, street, landmark" value={form.address} onChange={set("address")} />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
              {text("district", "District", "Anantapur")}
              {text("state", "State", "Andhra Pradesh")}
              {text("password", "Password", "••••••", "password")}
              {text("confirm", "Confirm Password", "••••••", "password")}
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full">
                  <UserPlus className="mr-1 size-4" /> Create account
                </Button>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  Already registered?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
