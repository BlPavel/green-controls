export interface IAddressModel {
  regionName: string;
  regionCode: string;
  cityName: string;
  cityCode: string;
  streetName: string;
  streetCode: string;
  house: string;
  flat: string;
  addressText: string;
}

export interface IRegistrationRegion {
  name: string;
  fullName: string;
  fiasCode: string;
  kladrCode: string;
  type: string;
  typeFull: string;
  okato: string;
  addressText: string;
  isFederalCity: boolean;
}

export interface IRegistrationCity {
  addressText: string;
  fiasCode: string;
  fullName: string;
  isFederalCity: boolean;
  isSettlement: boolean;
  kladrCode: string;
  name: string;
  okato: string;
  postalCode: string;
  type: string;
  typeFull: string;
  federalCity: boolean;
}

export interface IRegistrationStreet {
  addressText: string;
  fiasCode: string;
  fullName: string;
  kladrCode: string;
  name: string;
  okato: string;
  postalCode: string;
  type: string;
  typeFull: string;
}

export interface IDaDataRegionResponse {
  regionList: IRegistrationRegion[];
}

export interface IDaDataCityResponse {
  cityList: IRegistrationCity[];
}

export interface IDaDataStreetResponse {
  streetList: IRegistrationStreet[];
}
