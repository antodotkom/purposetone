"use client";

import { useEffect, useState } from "react";

const LETTER_KEY = "pt-studio-letter";

export function NewsletterBlock({
  variant = "paper",
}: {
  variant?: "paper" | "footer";
}) {
  const [sent, setSent] = useState(false);
  const ink = variant === "footer";

  useEffect(() => {
    const sync = () => {
      try {
        if (localStorage.getItem(LETTER_KEY) === "1") setSent(true);
      } catch {
        /* ignore */
      }
    };
    sync();
    window.addEventListener("pt-letter", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pt-letter", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <div id="studio-letter" className={`pt-card ${ink ? "" : "bg-paper-deep text-ink"}`}>
      {sent ? (
        <div role="status">
          <p className="pt-kicker">Studio letter</p>
          <h2 className="pt-h3 mt-2">Thanks.</h2>
          <p className="pt-body mt-2">
            You’re on the letter. Process notes, not noise — we’ll write when there’s something worth the inbox.
          </p>
        </div>
      ) : (
        <>
          <p className="pt-kicker">Studio letter</p>
          <h2 className="pt-h3 mt-2">Process notes, not noise.</h2>
          <p className="pt-body mt-2">
            A short letter on practice, shipping weeks, and keeping your tone. No
            countdown timers. Unsubscribe any Tuesday.
          </p>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              try {
                localStorage.setItem(LETTER_KEY, "1");
                window.dispatchEvent(new Event("pt-letter"));
              } catch {
                /* ignore */
              }
              setSent(true);
            }}
          >
            <label className="sr-only" htmlFor={`studio-letter-${variant}`}>
              Email
            </label>
            <input
              id={`studio-letter-${variant}`}
              type="email"
              required
              placeholder="you@studio.example"
              className="h-12 flex-1 rounded-pill border-2 border-paper-deep bg-white px-4 font-body text-[16px] text-ink placeholder:text-ink-soft"
            />
            <button type="submit" className="pt-btn pt-btn--primary">
              Join
            </button>
          </form>
        </>
      )}
    </div>
  );
}
