import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, OrDivider, PrimaryButton, SocialButtons } from "@/components/auth-layout";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Interview Twin AI" }, { name: "description", content: "Log in to your Interview Twin AI account." }] }),
  component: () => (
    <AuthLayout
      title="Welcome back"
      subtitle="Pick up right where you left off."
      footer={<>Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link></>}
    >
      <div className="space-y-4">
        <SocialButtons />
        <OrDivider />
        <Field id="email" label="Email" type="email" placeholder="you@company.com" />
        <div>
          <Field id="password" label="Password" type="password" placeholder="••••••••" />
          <div className="mt-1 text-right text-xs">
            <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
          </div>
        </div>
        <PrimaryButton to="/dashboard">Log in</PrimaryButton>
      </div>
    </AuthLayout>
  ),
});
