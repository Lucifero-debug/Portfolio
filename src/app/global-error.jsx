"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  console.log("Error object:", error);
  console.log("Sentry object:", Sentry);

  useEffect(() => {
    try {
      if (Sentry && error) {
        Sentry.captureException(error);
      }
    } catch (sentryError) {
      console.error('Sentry failed to capture the error:', sentryError);
    }
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
