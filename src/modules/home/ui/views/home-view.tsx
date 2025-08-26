"use client";
import { authClient } from "@/lib/auth.client";
import { Button } from "@/components/ui/button";

export const Homeview = () => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    <div className=" flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={async () => {
          await authClient.signOut();
          window.location.href = "/sign-in";
        }}
      >
        Signout
      </Button>
    </div>
  );
};
