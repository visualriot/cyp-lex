import { PrimaryBtn } from "@/components/buttons";
import { Link } from "@heroui/link";

export default function ReadmePage() {
  return (
    <div className="space-y-8">
      <h2 className="font-jet text-xl font-bold">
        The CYP-LEX database contains 400 books popular among children in each
        of three age groups: 7–9, 10–12, and 13–16. You can search within a
        specific age group or across all 1,200 books.
      </h2>
      <p>For each word, CYP-LEX provides:</p>
      <ul className="red-disc space-y-2">
        <li>Its lemma (uninflected form)</li>
        <li>Its most common part of speech</li>
        <li>
          The number of times it appears in books for a given age group (both
          raw count and a standardised frequency metric, the Zipf frequency)
        </li>
        <li>
          The number of books in which it appears within that age group (raw
          count and percentage). Please note that for the individual age bands
          (7–9, 10–12, 13–16), the total number of books is 400, while for all
          ages combined, the total is 1,200 books
        </li>
        <li>
          The number of times (both raw count and a standardised frequency
          metric, the Zipf frequency) it appears in British television
          programmes aimed at different age groups (0–6 years, 6–12 years, all
          ages). These frequencies are extracted from{" "}
          <Link
            className="text-accent hover:underline"
            href="https://journals.sagepub.com/doi/10.1080/17470218.2013.850521"
            target="_blank"
          >
            the SUBTLEX database (van Heuven et al., 2014)
          </Link>
          ; please refer to Korochkina et al. (2024) for more information.{" "}
        </li>
      </ul>
      <p>
        If some of the words you entered are missing from the Results table, it
        means they are not attested in CYP-LEX (i.e., they do not appear in the
        1,200 books we analysed). If a common word is missing, it may be due to
        spelling differences (e.g., some words may only be attested in American
        or British spelling). You might want to try an alternative spelling.
        Please note that if a word is missing in CYP-LEX, this does not mean it
        is also unattested in SUBTLEX-UK, so you may want to check this database
        instead
      </p>
      <PrimaryBtn href="/about" size="lg">
        Learn more
      </PrimaryBtn>
    </div>
  );
}
