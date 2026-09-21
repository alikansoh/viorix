import InvoiceGenerator from "../../invoice/InvoiceGenerator";

export const metadata = {
  title: "Invoice · Viorix Admin",
  robots: { index: false, follow: false },
};

export default function AdminInvoicePage() {
  return <InvoiceGenerator />;
}
