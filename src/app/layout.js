import "./globals.css";

export const metadata = {
  title: "NNC Digital CRM — Smart CRM Software for Small Businesses in India",
  description: "NNC Digital CRM helps small businesses capture leads, automate follow-ups, manage pipelines, and close more deals. Free 14-day trial. No credit card required.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        {children}
      </body>
    </html>
  );
}
