import GlobalNavbar from "@/components/layouts/globalNavbar";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalNavbar />
      {children}
    </>
  );
}