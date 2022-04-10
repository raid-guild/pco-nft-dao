export type BoardSection = {
  id: number;
  status: SectionStatus;
};

export enum SectionStatus {
  Forclosure = "forclosure",
  Owned = "owned",
  Undiscoverd = "undiscovered",
}
