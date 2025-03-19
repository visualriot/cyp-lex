export default function ReadmeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 global-padding global-width">
      <div className="inline-block global-width w-full">{children}</div>
    </section>
  );
}
