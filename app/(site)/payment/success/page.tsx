import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful — HayLang",
  description: "Your lesson has been confirmed.",
};

const PaymentSuccessPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="mx-auto max-w-[518px] px-4 text-center">
        <div className="mx-auto mb-7.5 flex h-24 w-24 items-center justify-center rounded-full bg-success-soft">
          <svg
            className="h-12 w-12 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="mb-5 text-2xl font-semibold text-ink md:text-4xl">
          Payment Successful!
        </h2>
        <p className="mb-2 text-body">
          Your lesson has been confirmed.
        </p>
        <p className="mb-10 text-body">
          The teacher will contact you shortly with further details.
        </p>

        <Link
          href="/profile"
          className="inline-flex items-center gap-2.5 rounded-full bg-primary-600 px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primary-700"
        >
          Go to Profile
          <svg
            className="fill-white"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
              fill=""
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
