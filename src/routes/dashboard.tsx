import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import { ANNOUNCEMENTS, COURSES } from "@/data/site";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Rural Digital Literacy" },
      { name: "description", content: "Admin and learner dashboard with user counts, course progress charts, announcements and recent activity." },
      { property: "og:title", content: "Programme Dashboard" },
      { property: "og:description", content: "Track learners, lessons, announcements and progress at a glance." },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Total Users", value: "1,248", icon: "Users" },
  { label: "Registered Students", value: "864", icon: "GraduationCap" },
  { label: "Courses", value: String(COURSES.length), icon: "BookOpen" },
  { label: "Completed Lessons", value: "5,320", icon: "CircleCheck" },
  { label: "Pending Lessons", value: "742", icon: "Clock" },
  { label: "Notifications", value: "18", icon: "Bell" },
];

const PROGRESS_DATA = [
  { month: "Mar", completed: 320, enrolled: 410 },
  { month: "Apr", completed: 412, enrolled: 480 },
  { month: "May", completed: 505, enrolled: 560 },
  { month: "Jun", completed: 610, enrolled: 700 },
  { month: "Jul", completed: 720, enrolled: 810 },
  { month: "Aug", completed: 845, enrolled: 905 },
];

const CATEGORY_DATA = [
  { name: "Basics", value: 38 },
  { name: "Finance", value: 26 },
  { name: "Safety", value: 18 },
  { name: "Citizen", value: 12 },
  { name: "Communication", value: 6 },
];

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const ACTIVITIES = [
  { user: "Sunita Yadav", action: "Completed UPI Mastery lesson 4", when: "10 minutes ago" },
  { user: "Ramesh Naidu", action: "Downloaded PM-Kisan guide", when: "1 hour ago" },
  { user: "Fatima Sheikh", action: "Enrolled in Cyber Security Awareness", when: "3 hours ago" },
  { user: "Dinesh Kumar", action: "Earned Computer Basics certificate", when: "Yesterday" },
  { user: "Priya Nair", action: "Uploaded a new smartphone tutorial", when: "Yesterday" },
];

function Dashboard() {
  return (
    <div>
      <PageHero eyebrow="Dashboard" title="Programme at a glance" subtitle="Learner counts, progress charts, announcements and recent activity." />

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STATS.map((s) => (
            <Card key={s.label} className="card-hover">
              <CardContent className="pt-6">
                <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-primary">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <p className="mt-3 text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Lessons completed vs enrolled</h2>
              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PROGRESS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                    <Legend />
                    <Bar dataKey="enrolled" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="completed" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Enrolment by category</h2>
              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                      {CATEGORY_DATA.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Recent activities</h2>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">When</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ACTIVITIES.map((a) => (
                    <TableRow key={a.action}>
                      <TableCell className="font-medium">{a.user}</TableCell>
                      <TableCell className="text-muted-foreground">{a.action}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">{a.when}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold">Announcements</h2>
                <ul className="mt-4 space-y-4">
                  {ANNOUNCEMENTS.slice(0, 3).map((a) => (
                    <li key={a.title}>
                      <Badge variant="secondary">{a.date}</Badge>
                      <p className="mt-1 text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.body}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold">My course progress</h2>
                <div className="mt-4 space-y-4">
                  {COURSES.slice(0, 4).map((c, i) => {
                    const pct = [85, 60, 40, 20][i] ?? 30;
                    return (
                      <div key={c.id}>
                        <div className="flex justify-between text-sm">
                          <span>{c.title}</span>
                          <span className="text-muted-foreground">{pct}%</span>
                        </div>
                        <Progress value={pct} className="mt-1.5" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold">Quick links</h2>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(
                    [
                      ["Training", "/training"],
                      ["Videos", "/video-learning"],
                      ["Certificates", "/certificate"],
                      ["Profile", "/profile"],
                    ] as const
                  ).map(([label, to]) => (
                    <Button key={to} asChild variant="outline" size="sm">
                      <Link to={to}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
