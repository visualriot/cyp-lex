import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col space-y-16 justify-center items-center">
      <Image src="/email.png" alt="Hero Image" width={120} height={120} />
      <h1 className="font-jet font-bold text-xl text-center">
        For all inquiries regarding this website, please contact
        <a href="mailto:rastle.lab@gmail.com">
          <span className="text-accent hover:scale-90 hover:text-secondary smooth">
            &nbsp;rastle.lab@gmail.com
          </span>
        </a>
        .
      </h1>
      <p className="text-center font-medium">
        Please include{" "}
        <span className="text-secondary font-semibold">
          ‘Inquiry about the CYP-LEX digital database’
        </span>{" "}
        in the subject line.
      </p>
    </div>
  );
}
