import * as React from "react";

export interface DataItem {
  Age?: string;
  word: string;
  lemma?: string | string[];
  mcpos?: string | string[];
  raw_freq: number;
  book_raw: number;
  book_zipf: number;
  book_perc: number;
  CBeebies_raw: number;
  CBeebies_zipf: number;
  CBBC_raw: number;
  CBBC_zipf: number;
  SUBTLEXUK_raw: number;
  SUBTLEXUK_zipf: number;
}

export interface SearchCriteria {
  Age: string;
  word?: string | string[];
  lemma?: boolean;
  mcpos?: string | string[] | boolean;
  raw_freq?: boolean | number | [number, number];
  zipf_freq?: boolean | number | [number, number];
  book_raw?: boolean | number | [number, number];
  book_perc?: boolean | number | [number, number];
  CBeebies_raw?: boolean | number | [number, number];
  CBeebies_zipf?: boolean | number | [number, number];
  CBBC_raw?: boolean | number | [number, number];
  CBBC_zipf?: boolean | number | [number, number];
  SUBTLEXUK_raw?: boolean | number | [number, number];
  SUBTLEXUK_zipf?: boolean | number | [number, number];
  numberOfLetters?: number | [number, number];
}
