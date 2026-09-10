import { AuthScreen } from "@/components/auth-screen";

export default function SignIn() {
  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Log in to continue your journey"
      primaryLabel="Log In"
      footerText="New here?"
      footerLinkLabel="Create account"
      footerHref="/sign-up"
    />
  );
}
