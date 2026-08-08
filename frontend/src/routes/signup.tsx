import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, OrDivider, PrimaryButton, SocialButtons } from "@/components/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Interview Twin AI" }, { name: "description", content: "Create your free Interview Twin AI account." }] }),
  component: () => (
    <AuthLayout
      title="Create your account"
      subtitle="Start practicing in under 60 seconds. No credit card."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link></>}
    >
      <div className="space-y-4">
        <SocialButtons />
        <OrDivider />
        <Field id="name" label="Full name" placeholder="Alex Rivera" />
        <Field id="email" label="Work email" type="email" placeholder="you@company.com" />
        <Field id="password" label="Password" type="password" placeholder="At least 8 characters" />
        <PrimaryButton to="/dashboard">Create account</PrimaryButton>
        <p className="text-xs text-muted-foreground text-center">By signing up you agree to our Terms and Privacy Policy.</p>
      </div>
    </AuthLayout>
  ),
});
