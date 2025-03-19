import { Snippet } from "@heroui/snippet";
import { Link } from "@heroui/link";
import { PrimaryBtn } from "@/components/buttons";

export default function AboutPage() {
  const linkStyle =
    "text-accent hover:scale-[98%] hover:underline smooth cursor-pointer";
  return (
    <div className="space-y-8">
      <h1 className="font-jet text-2xl font-bold text-accent text-left">
        About CYP-LEX
      </h1>
      <p>
        The CYP-LEX database was developed by a research group based at Royal
        Holloway, University of London (UK), the University of Ghent (Belgium),
        and the University of Milano-Bicocca (Italy). Detailed information on
        book selection, data processing, and metric computation is provided in a
        publicly available research article:
        <Link
          className={linkStyle}
          href="https://doi.org/10.1177/17470218241229694"
        >
          https://doi.org/10.1177/17470218241229694
        </Link>
        . This article also discusses the database in the context of reading and
        language development. A brief, accessible summary of these findings is
        available <Link className={linkStyle}>here</Link>.
      </p>
      <p>
        The database is also publicly available as several .csv data sheets. If
        using Excel, open these files via the 'Insert Data' tab. Each file is
        accompanied by detailed information on all metrics. You can download the
        files using the following link:{" "}
        <Link
          className={linkStyle}
          href="https://doi.org/10.17605/OSF.IO/SQU49"
        >
          https://doi.org/10.17605/OSF.IO/SQU49
        </Link>
        .
      </p>
      <div className="space-y-4 pb-4">
        <p>If you use this resource, please cite it as follows: </p>
        <Snippet
          hideSymbol
          tooltipProps={{
            content: "Copy to clipboard",
            color: "foreground",
          }}
          classNames={{
            base: "w-full",
            pre: "text-wrap",
          }}
          copyButtonProps={{
            className: "self-end",
          }}
        >
          <p>
            Korochkina, M., Marelli, M., Brysbaert, M., & Rastle, K. (2024). The
            Children and Young People’s Books Lexicon (CYP-LEX): A large-scale
            lexical database of books read by children and young people in the
            United Kingdom. Quarterly Journal of Experimental Psychology,
            77(12), 2418–2438. https://doi.org/10.1177/17470218241229694.’
          </p>
        </Snippet>
      </div>
      <PrimaryBtn href="/database" size="lg">
        Try it Now
      </PrimaryBtn>
    </div>
  );
}
