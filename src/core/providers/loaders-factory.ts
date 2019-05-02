import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SettingsProvider {

    constructor() { }

    load() {


// // APP_INITIALIZER
// export function SettingsLoaderFactory(settings: SettingsProvider) {
//     return () => settings.load();
// }

// // TranslateLoader
// export function HttpLoaderFactory(httpClient: HttpClient) {
//     return new MultiTranslateHttpLoader(httpClient, [
//         { prefix: './assets/i18n/translate/', suffix: '.json' }
//     ]);
// }

// export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
//     if (parentModule) {
//         throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
//     }
// }
    }}
