/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
/** @enum {number} */
const ScriptProtocol = {
    HTTP: 0,
    HTTPS: 1,
    AUTO: 2,
};
export { ScriptProtocol };
ScriptProtocol[ScriptProtocol.HTTP] = 'HTTP';
ScriptProtocol[ScriptProtocol.HTTPS] = 'HTTPS';
ScriptProtocol[ScriptProtocol.AUTO] = 'AUTO';
/**
 * Bing Maps V8 specific loader configuration to be used with the {\@link GoogleMapAPILoader}
 *
 * @export
 */
export class GoogleMapAPILoaderConfig {
}
GoogleMapAPILoaderConfig.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * The Google Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiKey;
    /**
     * The Google Maps client ID (for premium plans).
     * When you have a Google Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Google Maps API will fail to load if both a client ID and an API key are included.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clientId;
    /**
     * The Google Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.channel;
    /**
     * Google Maps API version.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiVersion;
    /**
     * Host and Path used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.hostAndPath;
    /**
     * Protocol used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.protocol;
    /**
     * Defines which Google Maps libraries should get loaded.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.libraries;
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.region;
    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.language;
    /**
     * The Google Maps API requires a separate library for clustering. Set the property
     * to true in order to load this library.
     * See https://developers.google.com/maps/documentation/javascript/marker-clustering
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.enableClustering;
    /**
     * Host and Path used for the cluster library `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clusterHostAndPath;
}
/** *
 * Default loader configuration.
  @type {?} */
const DEFAULT_CONFIGURATION = new GoogleMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
export class GoogleMapAPILoader extends MapAPILoader {
    /**
     * Creates an instance of GoogleMapAPILoader.
     * \@memberof GoogleMapAPILoader
     * @param {?} _config - The loader configuration.
     * @param {?} _windowRef - An instance of {\@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param {?} _documentRef - An instance of {\@link DocumentRef}.
     *                                     Necessary because Bing Map V8 interacts with the document object.
     */
    constructor(_config, _windowRef, _documentRef) {
        super();
        this._config = _config;
        this._windowRef = _windowRef;
        this._documentRef = _documentRef;
        if (this._config === null || this._config === undefined) {
            this._config = DEFAULT_CONFIGURATION;
        }
    }
    /**
     * Gets the loader configuration.
     *
     * \@readonly
     * \@memberof GoogleMapAPILoader
     * @return {?}
     */
    get Config() { return this._config; }
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof GoogleMapAPILoader
     * @return {?}
     */
    Load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        /** @type {?} */
        const script = this._documentRef.GetNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        /** @type {?} */
        const callbackName = `Create`;
        script.src = this.GetMapsScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            (/** @type {?} */ (this._windowRef.GetNativeWindow()))[callbackName] = () => {
                if (this._config.enableClustering) {
                    /** @type {?} */
                    const clusterScript = this._documentRef.GetNativeDocument().createElement('script');
                    clusterScript.type = 'text/javascript';
                    clusterScript.src = this.GetClusterScriptSrc();
                    clusterScript.onload = clusterScript.onreadystatechange = () => {
                        resolve();
                    };
                    this._documentRef.GetNativeDocument().head.appendChild(clusterScript);
                }
                else {
                    resolve();
                }
            };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    }
    /**
     * Gets the Google Maps scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Google Maps scripts are loaded.
     * @return {?} - The url to be used to load the Google Map scripts.
     *
     */
    GetMapsScriptSrc(callbackName) {
        /** @type {?} */
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        /** @type {?} */
        const queryParams = {
            v: this._config.apiVersion,
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        return this.GetScriptSrc(hostAndPath, queryParams);
    }
    /**
     * Gets the Google Maps Cluster library url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @return {?} - The url to be used to load the Google Map Cluster library.
     *
     */
    GetClusterScriptSrc() {
        /** @type {?} */
        const hostAndPath = this._config.clusterHostAndPath ||
            'developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
        return this.GetScriptSrc(hostAndPath, {});
    }
    /**
     * Gets a scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} hostAndPath - Host and path name of the script to load.
     * @param {?} queryParams - Url query parameters.
     * @return {?} - The url with correct protocol, path, and query parameters.
     *
     */
    GetScriptSrc(hostAndPath, queryParams) {
        /** @type {?} */
        const protocolType = /** @type {?} */ (((this._config && this._config.protocol) || ScriptProtocol.HTTPS));
        /** @type {?} */
        let protocol;
        switch (protocolType) {
            case ScriptProtocol.AUTO:
                protocol = '';
                break;
            case ScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case ScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        /** @type {?} */
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            /** @type {?} */
            const i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
GoogleMapAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapAPILoader.ctorParameters = () => [
    { type: GoogleMapAPILoaderConfig, decorators: [{ type: Optional }] },
    { type: WindowRef },
    { type: DocumentRef }
];
if (false) {
    /** @type {?} */
    GoogleMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    GoogleMapAPILoader.prototype._config;
    /** @type {?} */
    GoogleMapAPILoader.prototype._windowRef;
    /** @type {?} */
    GoogleMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0lBU25FLE9BQUk7SUFDSixRQUFLO0lBQ0wsT0FBSTs7OzhCQUZKLElBQUk7OEJBQ0osS0FBSzs4QkFDTCxJQUFJOzs7Ozs7QUFTUixNQUFNOzs7WUFETCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkVYLE1BQU0scUJBQXFCLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDOzs7Ozs7QUFRN0QsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOzs7Ozs7Ozs7SUEyQmhELFlBQWlDLE9BQWlDLEVBQVUsVUFBcUIsRUFBVSxZQUF5QjtRQUNoSSxLQUFLLEVBQUUsQ0FBQztRQURxQixZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUVoSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUN4QztLQUNKOzs7Ozs7OztRQWZVLE1BQU0sS0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7SUEwQjdELElB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WUFFZixNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUN6QztZQUNELE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzVDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxLQUFxQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDekYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLFFBQVEsS0FBSyxXQUFXLElBQUksTUFBTSxFQUFFLENBQUM7Ozs7WUFsS3RELFVBQVU7Ozs7WUE0Qm1DLHdCQUF3Qix1QkFBcEQsUUFBUTtZQWpJSCxTQUFTO1lBQUUsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XHJcblxyXG4vKipcclxuICogUHJvdG9jb2wgZW51bWVyYXRpb25cclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAZW51bSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGVudW0gU2NyaXB0UHJvdG9jb2wge1xyXG4gICAgSFRUUCxcclxuICAgIEhUVFBTLFxyXG4gICAgQVVUT1xyXG59XHJcblxyXG4vKipcclxuICogQmluZyBNYXBzIFY4IHNwZWNpZmljIGxvYWRlciBjb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgd2l0aCB0aGUge0BsaW5rIEdvb2dsZU1hcEFQSUxvYWRlcn1cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnIHtcclxuICAgIC8qKlxyXG4gICAgICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIEtleSAoc2VlOlxyXG4gICAgICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9nZXQtYXBpLWtleSlcclxuICAgICAgICovXHJcbiAgICBhcGlLZXk/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgY2xpZW50IElEIChmb3IgcHJlbWl1bSBwbGFucykuXHJcbiAgICAgKiBXaGVuIHlvdSBoYXZlIGEgR29vZ2xlIE1hcHMgQVBJcyBQcmVtaXVtIFBsYW4gbGljZW5zZSwgeW91IG11c3QgYXV0aGVudGljYXRlXHJcbiAgICAgKiB5b3VyIGFwcGxpY2F0aW9uIHdpdGggZWl0aGVyIGFuIEFQSSBrZXkgb3IgYSBjbGllbnQgSUQuXHJcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIHdpbGwgZmFpbCB0byBsb2FkIGlmIGJvdGggYSBjbGllbnQgSUQgYW5kIGFuIEFQSSBrZXkgYXJlIGluY2x1ZGVkLlxyXG4gICAgICovXHJcbiAgICBjbGllbnRJZD86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBjaGFubmVsIG5hbWUgKGZvciBwcmVtaXVtIHBsYW5zKS5cclxuICAgICAqIEEgY2hhbm5lbCBwYXJhbWV0ZXIgaXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgYWxsb3dzIHlvdSB0byB0cmFjayB1c2FnZSB1bmRlciB5b3VyIGNsaWVudFxyXG4gICAgICogSUQgYnkgYXNzaWduaW5nIGEgZGlzdGluY3QgY2hhbm5lbCB0byBlYWNoIG9mIHlvdXIgYXBwbGljYXRpb25zLlxyXG4gICAgICovXHJcbiAgICBjaGFubmVsPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR29vZ2xlIE1hcHMgQVBJIHZlcnNpb24uXHJcbiAgICAgKi9cclxuICAgIGFwaVZlcnNpb24/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cclxuICAgICAqL1xyXG4gICAgaG9zdEFuZFBhdGg/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm90b2NvbCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXHJcbiAgICAgKi9cclxuICAgIHByb3RvY29sPzogU2NyaXB0UHJvdG9jb2w7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoaWNoIEdvb2dsZSBNYXBzIGxpYnJhcmllcyBzaG91bGQgZ2V0IGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbGlicmFyaWVzPzogc3RyaW5nW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBiaWFzIGZvciB0aGUgbWFwIGJlaGF2aW9yIGlzIFVTLlxyXG4gICAgICogSWYgeW91IHdpc2ggdG8gYWx0ZXIgeW91ciBhcHBsaWNhdGlvbiB0byBzZXJ2ZSBkaWZmZXJlbnQgbWFwIHRpbGVzIG9yIGJpYXMgdGhlXHJcbiAgICAgKiBhcHBsaWNhdGlvbiwgeW91IGNhbiBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgKFVTKSBieSBkZWZpbmluZyBhIGByZWdpb25gLlxyXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2Jhc2ljcyNSZWdpb25cclxuICAgICAqL1xyXG4gICAgcmVnaW9uPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSB1c2VzIHRoZSBicm93c2VyJ3MgcHJlZmVycmVkIGxhbmd1YWdlIHdoZW4gZGlzcGxheWluZ1xyXG4gICAgICogdGV4dHVhbCBpbmZvcm1hdGlvbi4gSWYgeW91IHdpc2ggdG8gb3ZlcndyaXRlIHRoaXMgYmVoYXZpb3IgYW5kIGZvcmNlIHRoZSBBUElcclxuICAgICAqIHRvIHVzZSBhIGdpdmVuIGxhbmd1YWdlLCB5b3UgY2FuIHVzZSB0aGlzIHNldHRpbmcuXHJcbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvYmFzaWNzI0xhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIGxhbmd1YWdlPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSByZXF1aXJlcyBhIHNlcGFyYXRlIGxpYnJhcnkgZm9yIGNsdXN0ZXJpbmcuIFNldCB0aGUgcHJvcGVydHlcclxuICAgICAqIHRvIHRydWUgaW4gb3JkZXIgdG8gbG9hZCB0aGlzIGxpYnJhcnkuXHJcbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvbWFya2VyLWNsdXN0ZXJpbmdcclxuICAgICAqL1xyXG4gICAgZW5hYmxlQ2x1c3RlcmluZz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBjbHVzdGVyIGxpYnJhcnkgYDxzY3JpcHQ+YCB0YWcuXHJcbiAgICAgKi9cclxuICAgIGNsdXN0ZXJIb3N0QW5kUGF0aD86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUX0NPTkZJR1VSQVRJT04gPSBuZXcgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnKCk7XHJcblxyXG4vKipcclxuICogQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uIGZvciB0aGUge0BsaW5rIE1hcEFQSUxvYWRlcn0gc2VydmljZS5cclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwQVBJTG9hZGVyIGV4dGVuZHMgTWFwQVBJTG9hZGVyIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWZpbnRpdGlvbnMuXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX3NjcmlwdExvYWRpbmdQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9ucy5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgQ29uZmlnKCk6IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB7IHJldHVybiB0aGlzLl9jb25maWc7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFwQVBJTG9hZGVyLlxyXG4gICAgICogQHBhcmFtIF9jb25maWcgLSBUaGUgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gX3dpbmRvd1JlZiAtIEFuIGluc3RhbmNlIG9mIHtAbGluayBXaW5kb3dSZWZ9LiBOZWNlc3NhcnkgYmVjYXVzZSBCaW5nIE1hcCBWOCBpbnRlcmFjdHMgd2l0aCB0aGUgd2luZG93IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBfZG9jdW1lbnRSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgRG9jdW1lbnRSZWZ9LlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmVjZXNzYXJ5IGJlY2F1c2UgQmluZyBNYXAgVjggaW50ZXJhY3RzIHdpdGggdGhlIGRvY3VtZW50IG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIHByaXZhdGUgX2NvbmZpZzogR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnLCBwcml2YXRlIF93aW5kb3dSZWY6IFdpbmRvd1JlZiwgcHJpdmF0ZSBfZG9jdW1lbnRSZWY6IERvY3VtZW50UmVmKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnID09PSBudWxsIHx8IHRoaXMuX2NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IERFRkFVTFRfQ09ORklHVVJBVElPTjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcEFQSUxvYWRlciBpbXBsZW1lbnRhdGlvbi5cclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIG5lY2Vzc2FyeSByZXNvdXJjZXMgZm9yIEJpbmcgTWFwcyBWOC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBMb2FkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrTmFtZSA9IGBDcmVhdGVgO1xyXG4gICAgICAgIHNjcmlwdC5zcmMgPSB0aGlzLkdldE1hcHNTY3JpcHRTcmMoY2FsbGJhY2tOYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgKDxhbnk+dGhpcy5fd2luZG93UmVmLkdldE5hdGl2ZVdpbmRvdygpKVtjYWxsYmFja05hbWVdID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5lbmFibGVDbHVzdGVyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgY2x1c3RlcmluZyBpcyBlbmFibGVkIHRoZW4gZGVsYXkgdGhlIGxvYWRpbmcgdW50aWwgYWZ0ZXIgdGhlIGNsdXN0ZXIgbGlicmFyeSBpcyBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbHVzdGVyU2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyU2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyU2NyaXB0LnNyYyA9IHRoaXMuR2V0Q2x1c3RlclNjcmlwdFNyYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJTY3JpcHQub25sb2FkID0gY2x1c3RlclNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuaGVhZC5hcHBlbmRDaGlsZChjbHVzdGVyU2NyaXB0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcjogRXZlbnQpID0+IHsgcmVqZWN0KGVycm9yKTsgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBHb29nbGUgTWFwcyBzY3JpcHRzIHVybCBmb3IgaW5qZWN0aW9ucyBpbnRvIHRoZSBoZWFkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrTmFtZSAtIE5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBHb29nbGUgTWFwcyBzY3JpcHRzIGFyZSBsb2FkZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB1cmwgdG8gYmUgdXNlZCB0byBsb2FkIHRoZSBHb29nbGUgTWFwIHNjcmlwdHMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEdldE1hcHNTY3JpcHRTcmMoY2FsbGJhY2tOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBob3N0QW5kUGF0aDogc3RyaW5nID0gdGhpcy5fY29uZmlnLmhvc3RBbmRQYXRoIHx8ICdtYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzJztcclxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+IH0gPSB7XHJcbiAgICAgICAgICAgIHY6IHRoaXMuX2NvbmZpZy5hcGlWZXJzaW9uLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tOYW1lLFxyXG4gICAgICAgICAgICBrZXk6IHRoaXMuX2NvbmZpZy5hcGlLZXksXHJcbiAgICAgICAgICAgIGNsaWVudDogdGhpcy5fY29uZmlnLmNsaWVudElkLFxyXG4gICAgICAgICAgICBjaGFubmVsOiB0aGlzLl9jb25maWcuY2hhbm5lbCxcclxuICAgICAgICAgICAgbGlicmFyaWVzOiB0aGlzLl9jb25maWcubGlicmFyaWVzLFxyXG4gICAgICAgICAgICByZWdpb246IHRoaXMuX2NvbmZpZy5yZWdpb24sXHJcbiAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLl9jb25maWcubGFuZ3VhZ2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldFNjcmlwdFNyYyhob3N0QW5kUGF0aCwgcXVlcnlQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIE1hcHMgQ2x1c3RlciBsaWJyYXJ5IHVybCBmb3IgaW5qZWN0aW9ucyBpbnRvIHRoZSBoZWFkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgdXJsIHRvIGJlIHVzZWQgdG8gbG9hZCB0aGUgR29vZ2xlIE1hcCBDbHVzdGVyIGxpYnJhcnkuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEdldENsdXN0ZXJTY3JpcHRTcmMoKSB7XHJcbiAgICAgICAgY29uc3QgaG9zdEFuZFBhdGg6IHN0cmluZyA9IHRoaXMuX2NvbmZpZy5jbHVzdGVySG9zdEFuZFBhdGggfHxcclxuICAgICAgICAgICAgJ2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9leGFtcGxlcy9tYXJrZXJjbHVzdGVyZXIvbWFya2VyY2x1c3RlcmVyLmpzJztcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRTY3JpcHRTcmMoaG9zdEFuZFBhdGgsIHt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBzY3JpcHRzIHVybCBmb3IgaW5qZWN0aW9ucyBpbnRvIHRoZSBoZWFkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGhvc3RBbmRQYXRoIC0gSG9zdCBhbmQgcGF0aCBuYW1lIG9mIHRoZSBzY3JpcHQgdG8gbG9hZC5cclxuICAgICAqIEBwYXJhbSBxdWVyeVBhcmFtcyAtIFVybCBxdWVyeSBwYXJhbWV0ZXJzLlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgdXJsIHdpdGggY29ycmVjdCBwcm90b2NvbCwgcGF0aCwgYW5kIHF1ZXJ5IHBhcmFtZXRlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEdldFNjcmlwdFNyYyhob3N0QW5kUGF0aDogc3RyaW5nLCBxdWVyeVBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+IH0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHByb3RvY29sVHlwZTogU2NyaXB0UHJvdG9jb2wgPVxyXG4gICAgICAgICAgICA8U2NyaXB0UHJvdG9jb2w+KCh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBTY3JpcHRQcm90b2NvbC5IVFRQUyk7XHJcbiAgICAgICAgbGV0IHByb3RvY29sOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHN3aXRjaCAocHJvdG9jb2xUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuQVVUTzpcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5IVFRQOlxyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cDonO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuSFRUUFM6XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwczonO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoazogc3RyaW5nKSA9PiBxdWVyeVBhcmFtc1trXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoazogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVtcHR5IGFycmF5c1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkocXVlcnlQYXJhbXNba10pICYmIHF1ZXJ5UGFyYW1zW2tdLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKGs6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHF1ZXJ5UGFyYW1zW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleTogaywgdmFsdWU6IGkuam9pbignLCcpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleTogaywgdmFsdWU6IHF1ZXJ5UGFyYW1zW2tdIH07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoZW50cnk6IHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfSkgPT4geyByZXR1cm4gYCR7ZW50cnkua2V5fT0ke2VudHJ5LnZhbHVlfWA7IH0pXHJcbiAgICAgICAgICAgICAgICAuam9pbignJicpO1xyXG4gICAgICAgIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdEFuZFBhdGh9PyR7cGFyYW1zfWA7XHJcbiAgICB9XHJcbn1cclxuIl19