import React, { useState } from "react";
import { Check, Code2, Eye, EyeOff, Github, Lock, ShieldCheck } from "lucide-react";

export function AuthPreview() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    setStatus("");

    if (!form.email || !form.password || (mode === "register" && (!form.name || !form.username))) {
      setStatus("Please fill all required fields before continuing.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : {
              name: form.name,
              username: form.username,
              email: form.email,
              password: form.password
            };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const details = Array.isArray(result.details) ? result.details.join(" ") : "";
        throw new Error(details || result.message || "Authentication failed");
      }

      localStorage.setItem("blogifyAccessToken", result.data.accessToken);
      localStorage.setItem("blogifyRefreshToken", result.data.refreshToken);
      localStorage.setItem("blogifyUser", JSON.stringify(result.data.user));

      setStatus(
        mode === "login"
          ? `Welcome back, ${result.data.user.name}. Login successful.`
          : `Account created successfully for ${result.data.user.username}.`
      );
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative hidden min-h-[480px] overflow-hidden bg-slate-950 p-8 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.35),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(244,63,94,0.28),transparent_34%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck size={16} /> Secure JWT workspace
          </div>
          <h3 className="mt-8 text-4xl font-semibold leading-tight">
            One account for posting, messaging, communities, and creator growth.
          </h3>
        </div>
        <div className="floating-card absolute bottom-8 left-8 right-8 z-10 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between text-sm">
            <span>Draft quality score</span>
            <span className="font-semibold text-emerald-300">94%</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
          {["login", "register"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`rounded-xl px-4 py-3 text-sm font-semibold capitalize transition ${
                mode === item
                  ? "bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {mode === "register" && (
            <label className="form-field">
              <span>Name</span>
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Aisha Morgan"
              />
            </label>
          )}
          {mode === "register" && (
            <label className="form-field">
              <span>Username</span>
              <input
                value={form.username}
                onChange={(event) => updateField("username", event.target.value.toLowerCase())}
                placeholder="aishamorgan"
              />
            </label>
          )}
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="creator@blogify.dev"
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                onClick={() => setShowPassword((value) => !value)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950"
            disabled={loading}
            onClick={handleSubmit}
          >
            <Lock size={18} />{" "}
            {loading ? "Please wait..." : mode === "login" ? "Sign in securely" : "Create creator account"}
          </button>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="social-button" onClick={() => setStatus("GitHub OAuth button clicked.")}>
              <Github size={18} /> GitHub
            </button>
            <button className="social-button" onClick={() => setStatus("Dev.to OAuth button clicked.")}>
              <Code2 size={18} /> Dev.to
            </button>
          </div>
          {status && (
            <p className="rounded-2xl bg-cyan-50 p-3 text-sm font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
              {status}
            </p>
          )}
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
            <Check className="mr-2 inline" size={16} />
            Animated validation, protected routes, refresh tokens, and bcrypt-ready social auth flows.
          </p>
        </div>
      </div>
    </div>
  );
}
