// Angular Modules
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

export class Constants {
    public readonly API_ENDPOINT: string = 'https://www.userdomain.com/';
    public readonly API_MOCK_ENDPOINT: string = 'https://www.userdomainmock.com/';
    public static TitleOfSite: string = 'Making API calls';
}