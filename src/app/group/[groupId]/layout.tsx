export default async function GroupPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-4/5 mx-auto flex flex-col gap-10">{children}</main>;
}
