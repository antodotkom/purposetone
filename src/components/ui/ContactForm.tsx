"use client";

import { FormEvent, useState } from "react";

type State = "idle" | "error" | "submitting" | "success";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@") || message.trim().length < 12) {
      setState("error");
      return;
    }
    setState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="pt-card bg-paper-deep text-ink" role="status">
        <p className="pt-kicker">Contact</p>
        <h2 className="pt-h3 mt-2">Thanks.</h2>
        <p className="pt-body mt-2">
          We got your note. We read slowly — music stories, not noise. If the pitch has a record in it, we’ll write back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-lg flex-col gap-4" noValidate>
      <label className="flex flex-col gap-1 text-[14px] text-line">
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border-2 border-paper-deep bg-white px-4 py-3 font-body text-[16px] text-ink"
          autoComplete="name"
        />
      </label>
      <label className="flex flex-col gap-1 text-[14px] text-line">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border-2 border-paper-deep bg-white px-4 py-3 font-body text-[16px] text-ink"
          autoComplete="email"
        />
      </label>
      <label className="flex flex-col gap-1 text-[14px] text-line">
        Artist, record, or story
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          className="rounded-md border-2 border-paper-deep bg-white px-4 py-3 font-body text-[16px] text-ink"
        />
      </label>
      {state === "error" ? (
        <p className="text-[14px] text-error">Need a name, email, and a few sentences.</p>
      ) : null}
      <button
        type="submit"
        className="pt-btn pt-btn--primary self-start"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending" : "Send"}
      </button>
    </form>
  );
}
