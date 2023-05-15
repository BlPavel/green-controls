import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  IDaDataCityResponse,
  IDaDataRegionResponse,
  IDaDataStreetResponse,
  IRegistrationCity,
  IRegistrationRegion,
  IRegistrationStreet,
  IResponseModel,
} from 'green-controls/src/interfaces';
import { API_ADDRESS_DA_DATA } from 'green-controls/src/token';

@Injectable({ providedIn: 'root' })
export class DaDataService {
  constructor(private readonly _httpClient: HttpClient, @Inject(API_ADDRESS_DA_DATA) private readonly _apiAddress: string) {}

  public getRegion(name: string): Observable<IRegistrationRegion[]> {
    return this._httpClient
      .post<IResponseModel<IDaDataRegionResponse>>(`${this._apiAddress}/dadata/suggest/region`, {
        name,
      })
      .pipe(
        map((res) => res.result.regionList),
      );
  }

  public getCity(name: string, regionName: string): Observable<IRegistrationCity[]> {
    return this._httpClient
      .post<IResponseModel<IDaDataCityResponse>>(`${this._apiAddress}/dadata/suggest/city-by-name`, {
        name,
        regionName,
      })
      .pipe(
        map((res) => res.result.cityList),
      );
  }

  public getStreet(name: string, cityName: string, regionName: string, isSettlement: boolean): Observable<IRegistrationStreet[]> {
    return this._httpClient
      .post<IResponseModel<IDaDataStreetResponse>>(`${this._apiAddress}/dadata/suggest/street-by-name`, {
        name,
        cityName,
        isSettlement,
        regionName,
      })
      .pipe(
        map((res) => res.result.streetList),
      );
  }
}
