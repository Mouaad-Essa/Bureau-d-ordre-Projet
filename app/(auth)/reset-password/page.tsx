"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      router.push("/login"); // Redirect if token is missing
    }
  }, [router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la réinitialisation.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Votre mot de passe a été réinitialisé.",
      });

      router.push("/login");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la réinitialisation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Input
            type="password"
            placeholder="Répéter le mot de passe"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Envoi..." : "Réinitialiser le mot de passe"}
          </Button>
        </div>
      </form>
    </div>
  );
}