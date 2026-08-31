import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | Rural Digital Literacy" },
      { name: "description", content: "View and edit your learner profile, change your password and upload a profile photo." },
      { property: "og:title", content: "My Profile" },
      { property: "og:description", content: "Manage your learner details and account security." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    fullName: "Ramesh Naidu",
    email: "ramesh@example.com",
    mobile: "9876543210",
    village: "Kothapalli",
    district: "Anantapur",
    state: "Andhra Pradesh",
  });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    toast.success("Profile photo updated.");
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.next.length < 6) return toast.error("New password must be at least 6 characters.");
    if (pwd.next !== pwd.confirm) return toast.error("Passwords do not match.");
    toast.success("Password changed successfully.");
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <div>
      <PageHero eyebrow="Profile" title="Your learner account" subtitle="Keep your details up to date to receive certificates correctly." />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                <Avatar className="size-20">
                  {photo && <AvatarImage src={photo} alt="Profile photo" />}
                  <AvatarFallback className="bg-brand-soft text-primary">RN</AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileRef.current?.click()}
                  aria-label="Upload profile photo"
                  className="absolute -right-1 -bottom-1 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Camera className="size-4" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {profile.village}, {profile.district}, {profile.state}
                </p>
              </div>
            </div>

            <Tabs defaultValue="view" className="mt-8">
              <TabsList>
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit profile</TabsTrigger>
                <TabsTrigger value="password">Change password</TabsTrigger>
              </TabsList>

              <TabsContent value="view" className="mt-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(profile).map(([k, v]) => (
                    <div key={k} className="rounded-lg border p-4">
                      <dt className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
                      <dd className="mt-1 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>

              <TabsContent value="edit" className="mt-6">
                <form
                  className="grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Profile saved.");
                  }}
                >
                  {Object.keys(profile).map((k) => (
                    <div key={k}>
                      <Label htmlFor={k} className="capitalize">
                        {k.replace(/([A-Z])/g, " $1")}
                      </Label>
                      <Input
                        id={k}
                        className="mt-1.5"
                        value={profile[k as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [k]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <Button type="submit">
                      <Save className="mr-1 size-4" /> Save changes
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="password" className="mt-6">
                <form className="max-w-md space-y-4" onSubmit={savePassword}>
                  {(
                    [
                      ["current", "Current password"],
                      ["next", "New password"],
                      ["confirm", "Confirm new password"],
                    ] as const
                  ).map(([k, label]) => (
                    <div key={k}>
                      <Label htmlFor={k}>{label}</Label>
                      <Input
                        id={k}
                        type="password"
                        className="mt-1.5"
                        value={pwd[k]}
                        onChange={(e) => setPwd({ ...pwd, [k]: e.target.value })}
                      />
                    </div>
                  ))}
                  <Button type="submit">Update password</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
