import InvoiceGenerator from "./InvoiceGenerator";

export const metadata = {
  title: "Invoice Generator",
  robots: { index: false, follow: false },
};

export default function InvoicePage() {
  return <InvoiceGenerator />;
}
