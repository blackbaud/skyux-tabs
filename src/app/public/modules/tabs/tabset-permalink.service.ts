import {
  Location
} from '@angular/common';

import {
  Injectable,
  Optional
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

interface PermalinkParams {
  [_: string]: string;
}

@Injectable()
export class SkyTabsetPermalinkService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    @Optional() private router: Router
  ) { }

  public getParam(name: string): string {
    return this.getParams()[name];
  }

  public setParam(name: string, value: string | null): void {
    if (!this.router) {
      return;
    }

    const params = this.getParams();

    if (value === null) {
      delete params[name];
    } else {
      params[name] = value;
    }

    // Update the URL without triggering a navigation state change.
    // See: https://stackoverflow.com/a/46486677
    const url = this.router.createUrlTree(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    }).toString();

    this.location.go(url);
  }

  public clearParam(name: string): void {
    /*tslint:disable-next-line:no-null-keyword*/
    this.setParam(name, null);
  }

  public getParamHref(name: string, value: string): string | null {
    if (!name) {
      /*tslint:disable-next-line:no-null-keyword*/
      return null;
    }

    const params = this.getParams();
    params[name] = value;

    const baseUrl = this.location.path().split('?')[0];
    const paramString = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');

    return this.location.prepareExternalUrl(`${baseUrl}?${paramString}`);
  }

  public urlify(value: string): string {
    if (!value) {
      return '';
    }

    const sanitized = value.toLowerCase()

      // Remove special characters.
      .replace(/[\_\~\`\@\!\#\$\%\^\&\*\(\)\[\]\{\}\;\:\'\/\\\<\>\,\.\?\=\+\|"]/g, '')

      // Replace space characters with a dash.
      .replace(/\s/g, '-')

      // Remove any double-dashes.
      .replace(/--/g, '-');

    return sanitized;
  }

  private getParams(): PermalinkParams {
    const params: PermalinkParams = {};

    const path = this.location.path();
    if (path.indexOf('?') === -1) {
      return params;
    }

    const existingParamPairs = path.split('?')[1].split('&');
    existingParamPairs.forEach((pair) => {
      const fragments = pair.split('=');
      params[fragments[0]] = fragments[1];
    });

    return params;
  }

}
