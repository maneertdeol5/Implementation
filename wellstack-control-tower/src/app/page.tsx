import { redirect } from "next/navigation";

/**
 * Root page - redirects to portfolio dashboard
 */
export default function Home() {
  redirect("/portfolio");
}
