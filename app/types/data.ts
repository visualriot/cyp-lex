export interface SearchCriteria {
  Age: string;
  Word?: string | string[];
  Lemma?: string | string[] | boolean;
  mcPoS?: string | string[] | boolean;
  Count?: boolean | number | [number, number]; // raw_freq
  Zipf_freq?: boolean | number | [number, number];
  CD_book_count_raw?: boolean | number | [number, number];
  CD_book_perc_raw?: boolean | number | [number, number];
  CBeebies_raw?: boolean | number | [number, number];
  CBeebies_log?: boolean | number | [number, number];
  CBBC_raw?: boolean | number | [number, number];
  CBBC_log?: boolean | number | [number, number];
  SubtlexUK_raw?: boolean | number | [number, number];
  SuntlexUK_log?: boolean | number | [number, number];
  LetterCount?: number | [number, number];
}
