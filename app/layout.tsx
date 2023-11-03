import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Session, getServerSession } from "next-auth";

export const metadata = {
  title: "Promptopia",
  description: "Discover & share AI prompts",
};
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session as Session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
