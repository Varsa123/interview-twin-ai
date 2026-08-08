import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Sparkles, GraduationCap, Briefcase, Code2, Check } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume Analysis — Interview Twin AI" },
      {
        name: "description",
        content: "Upload your resume to extract skills, projects and a quality score.",
      },
    ],
  }),
  component: ResumePage,
});

const skills = [
  { skill: "React", level: 90 },
  { skill: "TypeScript", level: 85 },
  { skill: "Node.js", level: 78 },
  { skill: "Postgres", level: 72 },
  { skill: "AWS", level: 60 },
  { skill: "GraphQL", level: 55 },
];

function ResumePage() {
  const [hover, setHover] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload-resume`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("API Response:", data);

      console.log(data);

      if (data.interview_questions) {
        setQuestions(data.interview_questions);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };
  return (
    <DashboardShell
      title="Resume Analysis"
      subtitle="We extract skills, projects, and a quality score in seconds."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Upload */}
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload resume</CardTitle>
            <CardDescription>PDF, max 10MB</CardDescription>
          </CardHeader>
          <CardContent>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setHover(true);
              }}
              onDragLeave={() => setHover(false)}
              onDrop={(e) => {
                e.preventDefault();
                setHover(false);
              }}
              className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${hover ? "border-primary bg-primary/5 shadow-glow" : "border-border/80 hover:border-primary/60"}`}
            >
              <div className="grid size-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <Upload className="size-6" />
              </div>
              <div>
                <p className="font-medium">Drop your PDF here</p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <Button size="sm" variant="outline" className="mt-1">
                Choose file
              </Button>
              <Button className="mt-3 w-full" onClick={uploadResume} disabled={loading}>
                {loading ? "Uploading..." : "Upload Resume"}
              </Button>
            </label>

            <div className="mt-5 rounded-xl border border-border/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Resume quality</p>
                <Badge className="bg-success/15 text-success border-0">Strong</Badge>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-display text-3xl font-bold gradient-text">87</span>
                  <span className="text-muted-foreground text-xs">/ 100</span>
                </div>
                <Progress value={87} className="mt-2 h-2" />
              </div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" /> ATS-friendly format
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" /> Quantified achievements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-warning" /> Add 2 more keywords for "Frontend"
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Preview + parsed */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-border/60 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Parsed resume</CardTitle>
                <CardDescription>Alex Rivera · alex@example.com</CardDescription>
              </div>
              <Badge variant="secondary" className="rounded-full">
                <Sparkles className="size-3 mr-1" /> AI parsed
              </Badge>
            </CardHeader>
            <Card className="border-border/60 shadow-card">
              <CardHeader>
                <CardTitle>Generated Interview Questions</CardTitle>
              </CardHeader>

              <CardContent>
                {questions.length === 0 ? (
                  <p>No questions generated yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {questions.map((q, index) => (
                      <li key={index} className="rounded border p-3">
                        {q}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <CardContent className="space-y-5">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Code2 className="size-3.5" /> Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Postgres",
                    "TailwindCSS",
                    "Next.js",
                    "GraphQL",
                    "AWS",
                    "Docker",
                    "Jest",
                    "Figma",
                    "Python",
                  ].map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-full">
                      {s}
                    </Badge>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Briefcase className="size-3.5" /> Experience
                </h3>
                <div className="mt-2 space-y-2">
                  {[
                    { c: "Acme Corp", r: "Senior Frontend Engineer", d: "2022 — Present" },
                    { c: "Pixel Labs", r: "Frontend Engineer", d: "2020 — 2022" },
                  ].map((e) => (
                    <div key={e.c} className="rounded-lg border border-border/60 p-3 text-sm">
                      <p className="font-medium">
                        {e.r} · {e.c}
                      </p>
                      <p className="text-xs text-muted-foreground">{e.d}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <FileText className="size-3.5" /> Projects
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li>• AI Notes app — 3.2k stars on GitHub</li>
                    <li>• Realtime kanban — used by 14k teams</li>
                    <li>• OSS UI kit — 800 weekly downloads</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="size-3.5" /> Education
                  </h3>
                  <p className="mt-2 text-sm">B.S. Computer Science · UC Berkeley</p>
                  <p className="text-xs text-muted-foreground">2016 — 2020</p>
                </div>
              </section>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-card">
            <CardHeader>
              <CardTitle>Skill strength</CardTitle>
              <CardDescription>How your skills compare to the SWE benchmark</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={skills} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <CartesianGrid
                      stroke="var(--color-border)"
                      strokeDasharray="4 4"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="skill"
                      type="category"
                      tick={{ fill: "var(--color-foreground)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="level" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
