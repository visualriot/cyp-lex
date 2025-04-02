export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full">
      <div className="w-full flex">{children}</div>
    </section>
  );
}
