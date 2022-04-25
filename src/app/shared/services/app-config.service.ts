import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';

// tslint:disable-next-line:typedef
export function initializeAppConfig(appConfig: AppConfigService) {
  return () => appConfig.load();
}

export interface IAppConfig {
  version: string;
  backUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static config: IAppConfig;

  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  load(): Promise<void> {
    const jsonFile = '/assets/config.json';
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get(jsonFile).toPromise().then((response) => {
        AppConfigService.config = response as IAppConfig;
        resolve();
      }).catch((response: any) => {
        reject('Could not load file ' + jsonFile + ' : ' + JSON.stringify(response));
      });
    });
  }

}
