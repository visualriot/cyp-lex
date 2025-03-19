import Image from "next/image";
import { PrimaryBtn } from "@/components/buttons";

export default function Home() {
  return (
    <section className="container mx-auto max-w-7xl">
      <div className="relative h-[40rem] grid grid-cols-1 md:grid-cols-2 gap-16 py-8 md:py-10">
        <div className="flex flex-col justify-center">
          <div className="relative z-20 text-text space-y-10">
            <h1 className="text-4xl font-extrabold mb-4 font-jet">
              Discover what words children and young people encounter when they
              read
            </h1>
            <p className="text-base">
              The Children and Young People’s Books Lexicon (CYP-LEX) is a
              database that captures every word used in books popular with
              children and young people in the UK. It provides insights into how
              over 100,000 distinct words are used across 1,200 books for ages
              7–16. You can use the menu below to look up specific words or pull
              out words with certain characteristics. Please refer to the README
              tab for more detail on what information this database provides.
            </p>
            <PrimaryBtn href="/database" size="lg">
              Get Started
            </PrimaryBtn>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="h-full w-full">
            <Image
              src="/hero_img.png"
              alt="Hero Image"
              layout="fill"
              objectFit="contain"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full text-zinc-500 text-sm text-center mt-8">
          <p>
            Korochkina, M., Marelli, M., Brysbaert, M., & Rastle, K. (2024).{" "}
            <span className="italic">
              The Children and Young People’s Books Lexicon (CYP-LEX): A
              large-scale lexical database of books read by children and young
              people in the United Kingdom.
            </span>{" "}
            Quarterly Journal of Experimental Psychology, 77(12), 2418-2438.{" "}
            <a
              href="https://doi.org/10.1177/17470218241229694"
              className="hover:text-accent smooth"
            >
              https://doi.org/10.1177/17470218241229694
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
