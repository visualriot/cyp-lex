export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 secondary-padding">
      <div className="global-width w-full flex">{children}</div>
    </section>
  );
}
