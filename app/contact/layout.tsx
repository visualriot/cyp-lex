export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 secondary-padding justify-center items-center">
      <div className="global-width w-full justify-center items-center flex">
        {children}
      </div>
    </section>
  );
}
