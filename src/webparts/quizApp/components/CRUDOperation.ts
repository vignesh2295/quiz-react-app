import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export default class CRUDOperation {
  public _targetURL: string;
  public _dataBody: string;
  public _spHttpClient: SPHttpClient;

  public getItems(): Promise<any> {
    let status: boolean;
    const choiceRequest = this._targetURL.indexOf("/fields") !== -1;
    return new Promise<any>(
      (
        resolve: (listItems: any) => void,
        reject: (error: any) => void
      ): void => {
        this._spHttpClient
          .get(`${this._targetURL}`, SPHttpClient.configurations.v1, {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          })
          .then(
            (response: SPHttpClientResponse): Promise<any> => {
              status = response.ok;
              return response.json();
            },
            (error: any): void => {
              reject(error);
            }
          )
          .then((response): void => {
            resolve({
              data: choiceRequest ? response.Choices : response.value,
              status: status,
            });
          });
      }
    );
  }
  public createItem(): Promise<object> {
    let status: boolean;
    return new Promise<object>(
      (
        resolve: (result: object) => void,
        reject: (error: any) => void
      ): void => {
        this._spHttpClient
          .post(`${this._targetURL}`, SPHttpClient.configurations.v1, {
            headers: {
              Accept: "application/json;odata=verbose",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
            },
            body: this._dataBody,
          })
          .then(
            (response: SPHttpClientResponse): Promise<object> => {
              status = response.ok;
              return response.json();
            },
            (error: any): void => {
              reject(error);
            }
          )
          .then((item: object): void => {
            resolve({ data: item, status: status });
          });
      }
    );
  }
  public updateItem(): Promise<object> {
    return new Promise<object>(
      (
        resolve: (result: object) => void,
        reject: (error: any) => void
      ): void => {
        this._spHttpClient
          .post(`${this._targetURL}`, SPHttpClient.configurations.v1, {
            headers: {
              Accept: "application/json;odata=verbose",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
              "IF-MATCH": "*",
              "X-HTTP-Method": "MERGE",
            },
            body: this._dataBody,
          })
          .then(
            (response: SPHttpClientResponse): void => {
              resolve(response);
            },
            (error: any): void => {
              reject(error);
            }
          );
      }
    );
  }
  public deleteItem(): Promise<object> {
    let etag: any;
    return new Promise<object>(
      (
        resolve: (result: object) => void,
        reject: (error: any) => void
      ): void => {
        this._spHttpClient
          .get(`${this._targetURL}`, SPHttpClient.configurations.v1, {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          })
          .then((response: SPHttpClientResponse): Promise<object> => {
            etag = response.headers.get("ETag");
            return response.json();
          })
          .then((item): Promise<SPHttpClientResponse> => {
            return this._spHttpClient.post(
              `${this._targetURL}`,
              SPHttpClient.configurations.v1,
              {
                headers: {
                  Accept: "application/json;odata=nometadata",
                  "Content-type": "application/json;odata=verbose",
                  "odata-version": "",
                  "IF-MATCH": etag,
                  "X-HTTP-Method": "DELETE",
                },
              }
            );
          })
          .then(
            (response: SPHttpClientResponse): void => {
              resolve(response);
            },
            (error: any): void => {
              reject(error);
            }
          );
      }
    );
  }
}
