import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, PrimaryButton } from "@/components/auth-layout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Interview Twin AI" }, { name: "description", content: "Reset your Interview Twin AI password." }] }),
  component: () => (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<><Link to="/login" className="font-medium text-primary hover:underline">Back to login</Link></>}
    >
      <div className="space-y-4">
        <Field id="email" label="Email" type="email" placeholder="you@company.com" />
        <PrimaryButton>Send reset link</PrimaryButton>
      </div>
    </AuthLayout>
  ),
});
