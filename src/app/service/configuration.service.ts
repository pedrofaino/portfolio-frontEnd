import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class Configuration {
  hostName = '';
  public TargetApiUrl = '';
  constructor(private http:HttpClient) {
    this.hostName = window.location.hostname;
   }
   public load(): Promise<any> {
    return this.http
    .get('assets/app.config.json')
    .toPromise()
    .then((data: any) => {
        const params = data[this.hostName] || data.default;

        // Current url where Engage client is served
        this.TargetApiUrl = (params.TargetApiUrl || '').replace(
          '{hostname}',
          this.hostName
        );
        return data;
      });
  }
}

export function ConfigurationLoader(configuration: Configuration) {
  return () => configuration.load();
}



