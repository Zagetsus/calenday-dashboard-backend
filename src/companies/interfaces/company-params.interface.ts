export interface CompanyBodyParams {
  name: string;
  document: string;
  corporateName: string;
  tradingName?: string;
}

export interface CompanyParams {
  userId: string;
  body: CompanyBodyParams;
}
