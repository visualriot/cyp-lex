export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 secondary-padding global-width">
      <div className="inline-block global-width w-full">{children}</div>
    </section>
  );
}
