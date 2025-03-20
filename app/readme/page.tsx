import { PrimaryBtn } from "@/components/buttons";

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
          ages). These frequencies are extracted from the SUBTLEX database (van
          Heuven et al., 2014); please refer to Korochkina et al. (2024) for
          more information.{" "}
        </li>
      </ul>
      <PrimaryBtn href="/about" size="lg">
        Learn more
      </PrimaryBtn>
    </div>
  );
}
