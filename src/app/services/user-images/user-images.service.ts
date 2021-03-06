import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageInterface } from 'src/app/models/table-models/image-creation-interface';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class UserImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'user-images';

  constructor(private http: HttpClient) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' + btoa('username:password'));
  }

  public createImage(
    image: ImageInterface,
    token: string,
  ): Observable<ImageFromDatabaseInterface> {
    return this.http.post<ImageFromDatabaseInterface>(
      `${this.apiServerUrl}/${this.section}`,
      image,
      {
        headers: new HttpHeaders().set(TOKEN_KEY, token),
      },
    );
  }

  public getUserImages(
    token: string,
    pageNumber: number,
    limitNumber: number,
    searchGoal?: string | null,
    privacyFilter?: string | null,
  ): Observable<ResponseWithMetaInterface> {
    let params = `limit=${limitNumber}&page=${pageNumber}`;

    if (searchGoal) {
      params += `&searchGoal=${searchGoal}`;
    }

    if (privacyFilter) {
      params += `&privacyFilter=${privacyFilter}`;
    }

    return this.http.get<ResponseWithMetaInterface>(
      `${this.apiServerUrl}/${this.section}?${params}`,
      {
        headers: new HttpHeaders().set(TOKEN_KEY, token),
      },
    );
  }

  public getUserImage(
    token: string,
    imageId: string,
  ): Observable<ImageFromDatabaseInterface> {
    return this.http.get<ImageFromDatabaseInterface>(
      `${this.apiServerUrl}/${this.section}/${imageId}`,
      {
        headers: new HttpHeaders().set(TOKEN_KEY, token),
      },
    );
  }

  public updateUserImage(
    token: string,
    image: ImageFromDatabaseInterface,
  ): Observable<string> {
    return this.http.put(`${this.apiServerUrl}/${this.section}`, image, {
      headers: new HttpHeaders().set(TOKEN_KEY, token),
      responseType: 'text',
    });
  }

  public deleteUserImage(token: string, imageId: number): Observable<string> {
    return this.http.delete(`${this.apiServerUrl}/${this.section}/${imageId}`, {
      headers: new HttpHeaders().set(TOKEN_KEY, token),
      responseType: 'text',
    });
  }
}
