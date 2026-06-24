import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }
  const session = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ["line_items"],
    }
  );

  const {
    status,
    customer_details,
    metadata,
    payment_status,
  } = session;

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    try {
      const payload = {
        userEmail: customer_details?.email,
        userId: metadata?.userId,
        title: metadata?.title,
        authorName:metadata.authorName,
        amount: metadata?.amount,
        recipeId: metadata?.recipeId || "",
        transactionId: metadata?.transactionId,
        paymentType: metadata?.paymentType,
        stripeSessionId: session_id,
        paidAt: new Date().toISOString(),
      };
      // console.log(payload)
      const tokenReq = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/token`, {
        headers: await headers()
      })
      const resToken = await tokenReq.json()
      // console.log(resToken)
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resToken?.token}`
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        }
      );
    } catch (error) {
      console.error("Subscription activation failed:", error);
    }

    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f8fbff_46%,#eef5ff_100%)] dark:bg-zinc-950">
        <Card className="w-full max-w-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl">
          <Card.Content className="p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300">
                Payment Successful
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Thank You!
              </h1>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your payment has been successfully processed.
                A confirmation email has been sent to your email.
              </p>

              <div className="mt-6 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm text-zinc-600 dark:text-zinc-400">
                Your purchase was successful. You can now access your product
                from the dashboard at any time.
              </div>

              <div className="mt-8 flex w-full flex-col justify-center sm:flex-row gap-3">
                <Link href="/dashboard">
                  <Button
                    variant="primary"
                    className="bg-linear-to-r from-orange-500 to-amber-600 text-white font-semibold"
                  >
                    Go To Dashboard
                  </Button>
                </Link>

                <Link href="/">
                  <Button variant="outline">
                    Back Home
                  </Button>
                </Link>
              </div>
            </div>
          </Card.Content>
        </Card>
      </section>
    );
  }

  return null;
}