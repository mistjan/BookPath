import awardsRaw from "./awards-data.json";

export interface WinnerItem {
  nameCn: string;
  nameOriginal?: string;
  country?: string;
}

export interface AwardEdition {
  awardYear: number | null;
  awardEditionNumber: number;
  awardEditionLabel: string;
  awardCycle: string;
  recipientType: string;
  status: string;
  workItems: WinnerItem[];
  authorItems: WinnerItem[];
  listItems: unknown[];
  verificationStatus: string;
  editionNumberBasis?: string;
  evaluationNote?: string;
}

export interface AwardData {
  nameCn: string;
  nameOriginal: string;
  slug: string;
  countryOrRegion: string;
  foundedYear: number;
  awardType: string;
  recipientType: string;
  awardDataCategory: string;
  officialUrl?: string;
  scopeNote?: string;
  frequencyHint?: string;
  description?: string;
  selectionTendency?: string;
  beginnerValue?: string;
  limitationNote?: string;
  whoShouldRead?: string;
  awardEditions: AwardEdition[];
  curationStatus?: string;
}

export const awardsData: AwardData[] = awardsRaw as AwardData[];