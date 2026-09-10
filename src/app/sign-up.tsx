import { AuthScreen } from "@/components/auth-screen";

export default function SignUp() {
  return (
    <AuthScreen
      title="Create your account"
      subtitle="Start your language journey today"
      primaryLabel="Sign Up"
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerHref="/sign-in"
    />
  );
}
