"use client";

import { User } from "@/db/schema";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface AllUsersProps {
  users: User[];
  organizationId: string;
}

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  const [loadingUsers, setLoadingUsers] = useState<Set<string>>(new Set());
  const router = useRouter();

  const handleInviteMember = async (user: User) => {
    try {
      // Add this user to the loading set
      setLoadingUsers((prev) => new Set(prev).add(user.id));

      const { error } = await authClient.organization.inviteMember({
        email: user.email,
        role: "member",
        organizationId: organizationId,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(`Invitation sent to ${user.name}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to invite member to organization");
      console.error(error);
    } finally {
      // Remove this user from the loading set
      setLoadingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(user.id);
        return newSet;
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {users.map((user) => {
          const isUserLoading = loadingUsers.has(user.id);
          return (
            <div key={user.id}>
              <Button
                onClick={() => handleInviteMember(user)}
                disabled={isUserLoading}
              >
                {isUserLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  `Invite ${user.name} to organization`
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
