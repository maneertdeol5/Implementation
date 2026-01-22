import { redirect } from "next/navigation";

/**
 * Clients index page - redirects to portfolio
 */
export default function ClientsPage() {
  redirect("/portfolio");
}
