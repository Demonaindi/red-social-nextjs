import Navbar from "../components/navbar";
import Providers from "../providers";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
}
