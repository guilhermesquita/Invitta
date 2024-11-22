export default interface Guest {
  id: string;
  name: string;
  email: string;
  confirmed: boolean;
  hasCompanions: boolean;
  numberCompanions: number;
}
