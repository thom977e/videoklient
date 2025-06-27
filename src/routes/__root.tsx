import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />{" "}
        {/* Her vises child routes som fx /, /planets, /planets/$id */}
      </main>
      <Footer />
    </div>
  ),
});
