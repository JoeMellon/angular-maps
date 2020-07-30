/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'bingmaps';
import { InfoWindow } from './src/models/info-window';
import { Marker } from './src/models/marker';
import { MarkerTypeId } from './src/models/marker-type-id';
import { MapTypeId } from './src/models/map-type-id';
import { Layer } from './src/models/layer';
import { Polygon } from './src/models/polygon';
import { Polyline } from './src/models/polyline';
import { SpiderClusterMarker } from './src/models/spider-cluster-marker';
import { ClusterPlacementMode } from './src/models/cluster-placement-mode';
import { ClusterClickAction } from './src/models/cluster-click-action';
import { CanvasOverlay } from './src/models/canvas-overlay';
import { BingLayer } from './src/models/bing/bing-layer';
import { BingClusterLayer } from './src/models/bing/bing-cluster-layer';
import { BingSpiderClusterMarker } from './src/models/bing/bing-spider-cluster-marker';
import { BingInfoWindow } from './src/models/bing/bing-info-window';
import { BingMarker } from './src/models/bing/bing-marker';
import { BingPolygon } from './src/models/bing/bing-polygon';
import { BingPolyline } from './src/models/bing/bing-polyline';
import { BingMapEventsLookup } from './src/models/bing/bing-events-lookup';
import { BingCanvasOverlay } from './src/models/bing/bing-canvas-overlay';
import { GoogleInfoWindow } from './src/models/google/google-info-window';
import { GoogleMarker } from './src/models/google/google-marker';
import { GooglePolygon } from './src/models/google/google-polygon';
import { GooglePolyline } from './src/models/google/google-polyline';
import { GoogleMapEventsLookup } from './src/models/google/google-events-lookup';
import { GoogleCanvasOverlay } from './src/models/google/google-canvas-overlay';
import { MapComponent } from './src/components/map';
import { MapMarkerDirective } from './src/components/map-marker';
import { InfoBoxComponent } from './src/components/infobox';
import { InfoBoxActionDirective } from './src/components/infobox-action';
import { MapLayerDirective } from './src/components/map-layer';
import { ClusterLayerDirective } from './src/components/cluster-layer';
import { MapPolygonDirective } from './src/components/map-polygon';
import { MapPolylineDirective } from './src/components/map-polyline';
import { MapMarkerLayerDirective } from './src/components/map-marker-layer';
import { MapPolygonLayerDirective } from './src/components/map-polygon-layer';
import { MapPolylineLayerDirective } from './src/components/map-polyline-layer';
import { MapServiceFactory } from './src/services/mapservicefactory';
import { MapService } from './src/services/map.service';
import { MapAPILoader, WindowRef, DocumentRef } from './src/services/mapapiloader';
import { InfoBoxService } from './src/services/infobox.service';
import { LayerService } from './src/services/layer.service';
import { MarkerService } from './src/services/marker.service';
import { ClusterService } from './src/services/cluster.service';
import { PolygonService } from './src/services/polygon.service';
import { PolylineService } from './src/services/polyline.service';
import { BingMapServiceFactory, BingMapServiceFactoryFactory, BingMapLoaderFactory } from './src/services/bing/bing-map.service.factory';
import { BingMapService } from './src/services/bing/bing-map.service';
import { BingMapAPILoader, BingMapAPILoaderConfig } from './src/services/bing/bing-map.api-loader.service';
import { BingInfoBoxService } from './src/services/bing/bing-infobox.service';
import { BingMarkerService } from './src/services/bing/bing-marker.service';
import { BingLayerService } from './src/services/bing/bing-layer.service';
import { BingClusterService } from './src/services/bing/bing-cluster.service';
import { BingPolygonService } from './src/services/bing/bing-polygon.service';
import { BingPolylineService } from './src/services/bing/bing-polyline.service';
import { GoogleClusterService } from './src/services/google/google-cluster.service';
import { GoogleInfoBoxService } from './src/services/google/google-infobox.service';
import { GoogleLayerService } from './src/services/google/google-layer.service';
import { GoogleMapAPILoader, GoogleMapAPILoaderConfig } from './src/services/google/google-map-api-loader.service';
import { GoogleMapServiceFactory, GoogleMapServiceFactoryFactory, GoogleMapLoaderFactory } from './src/services/google/google-map.service.factory';
import { GoogleMapService } from './src/services/google/google-map.service';
import { GoogleMarkerService } from './src/services/google/google-marker.service';
import { GooglePolygonService } from './src/services/google/google-polygon.service';
import { GooglePolylineService } from './src/services/google/google-polyline.service';
export { MapComponent, InfoBoxComponent, MapMarkerDirective, MapPolygonDirective, MapPolylineDirective, InfoBoxActionDirective, MapMarkerLayerDirective, MapPolygonLayerDirective, MapLayerDirective, ClusterLayerDirective, MapPolylineLayerDirective, MapTypeId, Marker, MarkerTypeId, InfoWindow, Layer, ClusterPlacementMode, ClusterClickAction, SpiderClusterMarker, Polygon, Polyline, CanvasOverlay, MapService, MapServiceFactory, MarkerService, InfoBoxService, MapAPILoader, WindowRef, DocumentRef, LayerService, PolygonService, PolylineService, ClusterService };
export { BingMapServiceFactory, BingMapAPILoaderConfig, BingMapService, BingInfoBoxService, BingMarkerService, BingPolygonService, BingPolylineService, BingMapAPILoader, BingLayerService, BingClusterService, BingLayer, BingMarker, BingPolyline, BingMapEventsLookup, BingPolygon, BingInfoWindow, BingClusterLayer, BingSpiderClusterMarker, BingCanvasOverlay };
export { GoogleClusterService, GoogleInfoBoxService, GoogleLayerService, GoogleMapAPILoader, GoogleMapAPILoaderConfig, GoogleMapServiceFactory, GoogleMapService, GoogleMarkerService, GooglePolygonService, GooglePolylineService, GoogleMarker, GoogleInfoWindow, GooglePolygon, GooglePolyline, GoogleMapEventsLookup, GoogleCanvasOverlay };
export class MapModule {
    /**
     * @param {?=} mapServiceFactory
     * @param {?=} loader
     * @return {?}
     */
    static forRoot(mapServiceFactory, loader) {
        return {
            ngModule: MapModule,
            providers: [
                mapServiceFactory ? { provide: MapServiceFactory, useValue: mapServiceFactory } :
                    { provide: MapServiceFactory, deps: [MapAPILoader, NgZone], useFactory: BingMapServiceFactoryFactory },
                loader ? { provide: MapAPILoader, useValue: loader } : { provide: MapAPILoader, useFactory: BingMapLoaderFactory },
                DocumentRef,
                WindowRef
            ]
        };
    }
    /**
     * @return {?}
     */
    static forRootBing() {
        return {
            ngModule: MapModule,
            providers: [
                { provide: MapServiceFactory, deps: [MapAPILoader, NgZone], useFactory: BingMapServiceFactoryFactory },
                { provide: MapAPILoader, useFactory: BingMapLoaderFactory },
                DocumentRef,
                WindowRef
            ]
        };
    }
    /**
     * @return {?}
     */
    static forRootGoogle() {
        return {
            ngModule: MapModule,
            providers: [
                { provide: MapServiceFactory, deps: [MapAPILoader, NgZone], useFactory: GoogleMapServiceFactoryFactory },
                { provide: MapAPILoader, useFactory: GoogleMapLoaderFactory },
                DocumentRef,
                WindowRef
            ]
        };
    }
}
MapModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MapLayerDirective,
                    MapComponent,
                    MapMarkerDirective,
                    InfoBoxComponent,
                    InfoBoxActionDirective,
                    MapPolygonDirective,
                    MapPolylineDirective,
                    ClusterLayerDirective,
                    MapMarkerLayerDirective,
                    MapPolygonLayerDirective,
                    MapPolylineLayerDirective
                ],
                imports: [CommonModule],
                exports: [
                    CommonModule,
                    MapComponent,
                    MapMarkerDirective,
                    MapPolygonDirective,
                    MapPolylineDirective,
                    InfoBoxComponent,
                    InfoBoxActionDirective,
                    MapLayerDirective,
                    ClusterLayerDirective,
                    MapMarkerLayerDirective,
                    MapPolygonLayerDirective,
                    MapPolylineLayerDirective
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLFVBQVUsQ0FBQztBQThCbEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFB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QUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgJ2JpbmdtYXBzJztcclxuXHJcbi8vL1xyXG4vLy8gaW1wb3J0IG1vZHVsZSBpbnRlcmZhY2VzXHJcbi8vL1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcclxuaW1wb3J0IHsgSUluZm9XaW5kb3dBY3Rpb24gfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1hY3Rpb24nO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi9zcmMvaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaXBvaW50JztcclxuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaWJveCc7XHJcbmltcG9ydCB7IElNYXJrZXJFdmVudCB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaW1hcmtlci1ldmVudCc7XHJcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xyXG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9zcmMvaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGluZU9wdGlvbnMgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lsaW5lLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi9zcmMvaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcclxuaW1wb3J0IHsgSVBvbHlsaW5lRXZlbnQgfSBmcm9tICcuL3NyYy9pbnRlcmZhY2VzL2lwb2x5bGluZS1ldmVudCc7XHJcbmltcG9ydCB7IElNYXBFdmVudExvb2t1cCB9IGZyb20gJy4vc3JjL2ludGVyZmFjZXMvaW1hcC1ldmVudC1sb29rdXAnO1xyXG5pbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi9zcmMvaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElDdXN0b21NYXBTdHlsZX0gZnJvbSAnLi9zcmMvaW50ZXJmYWNlcy9pY3VzdG9tLW1hcC1zdHlsZSc7XHJcblxyXG4vLy9cclxuLy8vIGltcG9ydCBtb2R1bGUgbW9kZWxzXHJcbi8vL1xyXG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi9zcmMvbW9kZWxzL2luZm8td2luZG93JztcclxuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL21hcmtlcic7XHJcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4vc3JjL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XHJcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4vc3JjL21vZGVscy9tYXAtdHlwZS1pZCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2xheWVyJztcclxuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4vc3JjL21vZGVscy9wb2x5Z29uJztcclxuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuL3NyYy9tb2RlbHMvcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBTcGlkZXJDbHVzdGVyTWFya2VyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL3NwaWRlci1jbHVzdGVyLW1hcmtlcic7XHJcbmltcG9ydCB7IENsdXN0ZXJQbGFjZW1lbnRNb2RlIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xyXG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuL3NyYy9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xyXG5pbXBvcnQgeyBDYW52YXNPdmVybGF5fSBmcm9tICcuL3NyYy9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5pbXBvcnQgeyBCaW5nTGF5ZXIgfSBmcm9tICcuL3NyYy9tb2RlbHMvYmluZy9iaW5nLWxheWVyJztcclxuaW1wb3J0IHsgQmluZ0NsdXN0ZXJMYXllciB9IGZyb20gJy4vc3JjL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllcic7XHJcbmltcG9ydCB7IEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2JpbmcvYmluZy1zcGlkZXItY2x1c3Rlci1tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nSW5mb1dpbmRvdyB9IGZyb20gJy4vc3JjL21vZGVscy9iaW5nL2JpbmctaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xyXG5pbXBvcnQgeyBCaW5nUG9seWdvbiB9IGZyb20gJy4vc3JjL21vZGVscy9iaW5nL2JpbmctcG9seWdvbic7XHJcbmltcG9ydCB7IEJpbmdQb2x5bGluZSB9IGZyb20gJy4vc3JjL21vZGVscy9iaW5nL2JpbmctcG9seWxpbmUnO1xyXG5pbXBvcnQgeyBCaW5nTWFwRXZlbnRzTG9va3VwIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2JpbmcvYmluZy1ldmVudHMtbG9va3VwJztcclxuaW1wb3J0IHsgQmluZ0NhbnZhc092ZXJsYXkgfSBmcm9tICcuL3NyYy9tb2RlbHMvYmluZy9iaW5nLWNhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgR29vZ2xlSW5mb1dpbmRvdyB9IGZyb20gJy4vc3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93JztcclxuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcclxuaW1wb3J0IHsgR29vZ2xlUG9seWdvbiB9IGZyb20gJy4vc3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5bGluZSB9IGZyb20gJy4vc3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwRXZlbnRzTG9va3VwIH0gZnJvbSAnLi9zcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtZXZlbnRzLWxvb2t1cCc7XHJcbmltcG9ydCB7IEdvb2dsZUNhbnZhc092ZXJsYXkgfSBmcm9tICcuL3NyYy9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1jYW52YXMtb3ZlcmxheSc7XHJcblxyXG4vLy9cclxuLy8vIGltcG9ydCBtb2R1bGUgY29tcG9uZW50c1xyXG4vLy9cclxuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9zcmMvY29tcG9uZW50cy9tYXAnO1xyXG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuL3NyYy9jb21wb25lbnRzL21hcC1tYXJrZXInO1xyXG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi9zcmMvY29tcG9uZW50cy9pbmZvYm94JztcclxuaW1wb3J0IHsgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvaW5mb2JveC1hY3Rpb24nO1xyXG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvbWFwLWxheWVyJztcclxuaW1wb3J0IHsgQ2x1c3RlckxheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi9zcmMvY29tcG9uZW50cy9jbHVzdGVyLWxheWVyJztcclxuaW1wb3J0IHsgTWFwUG9seWdvbkRpcmVjdGl2ZSB9IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvbWFwLXBvbHlnb24nO1xyXG5pbXBvcnQgeyBNYXBQb2x5bGluZURpcmVjdGl2ZSB9IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lJztcclxuaW1wb3J0IHsgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3NyYy9jb21wb25lbnRzL21hcC1tYXJrZXItbGF5ZXInO1xyXG5pbXBvcnQgeyBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3NyYy9jb21wb25lbnRzL21hcC1wb2x5Z29uLWxheWVyJztcclxuaW1wb3J0IHsgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4vc3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLWxheWVyJztcclxuXHJcbi8vL1xyXG4vLy8gaW1wb3J0IG1vZHVsZSBzZXJ2aWNlc1xyXG4vLy9cclxuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9tYXBzZXJ2aWNlZmFjdG9yeSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL21hcGFwaWxvYWRlcic7XHJcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvaW5mb2JveC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9wb2x5bGluZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2VGYWN0b3J5LFxyXG4gICAgQmluZ01hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeSwgQmluZ01hcExvYWRlckZhY3RvcnkgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvYmluZy9iaW5nLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ01hcEFQSUxvYWRlciwgQmluZ01hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0luZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvYmluZy9iaW5nLWluZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvYmluZy9iaW5nLW1hcmtlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0xheWVyU2VydmljZSB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmluZ0NsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvYmluZy9iaW5nLWNsdXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJpbmdQb2x5Z29uU2VydmljZSB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2JpbmcvYmluZy1wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCaW5nUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvYmluZy9iaW5nLXBvbHlsaW5lLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY2x1c3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR29vZ2xlSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWluZm9ib3guc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZUxheWVyU2VydmljZSB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZU1hcEFQSUxvYWRlciwgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICAgIEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5LCBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeUZhY3RvcnksXHJcbiAgICBHb29nbGVNYXBMb2FkZXJGYWN0b3J5XHJcbn0gZnJvbSAnLi9zcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAuc2VydmljZS5mYWN0b3J5JztcclxuaW1wb3J0IHsgR29vZ2xlTWFwU2VydmljZSB9IGZyb20gJy4vc3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXJrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZVBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9zcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1wb2x5Z29uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuL3NyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lLnNlcnZpY2UnO1xyXG5cclxuLy8vXHJcbi8vLyBleHBvcnQgcHVibGljcyBjb21wb25lbnRzLCBtb2RlbHMsIGludGVyZmFjZXMgZXRjIGZvciBleHRlcm5hbCByZXVzZS5cclxuLy8vXHJcbmV4cG9ydCB7XHJcbiAgICBJTGF0TG9uZywgSUluZm9XaW5kb3dPcHRpb25zLCBJSW5mb1dpbmRvd0FjdGlvbiwgSVNpemUsIElNYXJrZXJPcHRpb25zLCBJQm94LCBJTWFwT3B0aW9ucywgSVBvaW50LCBJTWFya2VyRXZlbnQsIElQb2x5Z29uRXZlbnQsXHJcbiAgICBJUG9seWxpbmVFdmVudCwgSU1hcEV2ZW50TG9va3VwLCBJTWFya2VySWNvbkluZm8sIElMYXllck9wdGlvbnMsIElDbHVzdGVyT3B0aW9ucywgSVNwaWRlckNsdXN0ZXJPcHRpb25zLCBJTGluZU9wdGlvbnMsXHJcbiAgICBJUG9seWdvbk9wdGlvbnMsIElQb2x5bGluZU9wdGlvbnMsIElMYWJlbE9wdGlvbnMsIElDdXN0b21NYXBTdHlsZSwgTWFwQ29tcG9uZW50LCBJbmZvQm94Q29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmUsIE1hcFBvbHlnb25EaXJlY3RpdmUsXHJcbiAgICBNYXBQb2x5bGluZURpcmVjdGl2ZSwgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSwgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUsIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZSwgTWFwTGF5ZXJEaXJlY3RpdmUsXHJcbiAgICBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUsIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmUsIE1hcFR5cGVJZCwgTWFya2VyLCBNYXJrZXJUeXBlSWQsIEluZm9XaW5kb3csIExheWVyLCBDbHVzdGVyUGxhY2VtZW50TW9kZSxcclxuICAgIENsdXN0ZXJDbGlja0FjdGlvbiwgU3BpZGVyQ2x1c3Rlck1hcmtlciwgUG9seWdvbiwgUG9seWxpbmUsIENhbnZhc092ZXJsYXksIE1hcFNlcnZpY2UsIE1hcFNlcnZpY2VGYWN0b3J5LCBNYXJrZXJTZXJ2aWNlLFxyXG4gICAgSW5mb0JveFNlcnZpY2UsIE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiwgTGF5ZXJTZXJ2aWNlLCBQb2x5Z29uU2VydmljZSwgUG9seWxpbmVTZXJ2aWNlLCBDbHVzdGVyU2VydmljZVxyXG59O1xyXG5leHBvcnQge1xyXG4gICAgQmluZ01hcFNlcnZpY2VGYWN0b3J5LCBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnLCBCaW5nTWFwU2VydmljZSwgQmluZ0luZm9Cb3hTZXJ2aWNlLFxyXG4gICAgQmluZ01hcmtlclNlcnZpY2UsIEJpbmdQb2x5Z29uU2VydmljZSwgQmluZ1BvbHlsaW5lU2VydmljZSwgQmluZ01hcEFQSUxvYWRlcixcclxuICAgIEJpbmdMYXllclNlcnZpY2UsIEJpbmdDbHVzdGVyU2VydmljZSwgQmluZ0xheWVyLCBCaW5nTWFya2VyLCBCaW5nUG9seWxpbmUsIEJpbmdNYXBFdmVudHNMb29rdXAsIEJpbmdQb2x5Z29uLFxyXG4gICAgQmluZ0luZm9XaW5kb3csIEJpbmdDbHVzdGVyTGF5ZXIsIEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyLCBCaW5nQ2FudmFzT3ZlcmxheVxyXG59O1xyXG5leHBvcnQge1xyXG4gICAgR29vZ2xlQ2x1c3RlclNlcnZpY2UsIEdvb2dsZUluZm9Cb3hTZXJ2aWNlLCBHb29nbGVMYXllclNlcnZpY2UsIEdvb2dsZU1hcEFQSUxvYWRlciwgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnLFxyXG4gICAgR29vZ2xlTWFwU2VydmljZUZhY3RvcnksIEdvb2dsZU1hcFNlcnZpY2UsIEdvb2dsZU1hcmtlclNlcnZpY2UsIEdvb2dsZVBvbHlnb25TZXJ2aWNlLCBHb29nbGVQb2x5bGluZVNlcnZpY2UsXHJcbiAgICBHb29nbGVNYXJrZXIsIEdvb2dsZUluZm9XaW5kb3csIEdvb2dsZVBvbHlnb24sIEdvb2dsZVBvbHlsaW5lLCBHb29nbGVNYXBFdmVudHNMb29rdXAsIEdvb2dsZUNhbnZhc092ZXJsYXlcclxufTtcclxuXHJcbi8vL1xyXG4vLy8gZGVmaW5lIG1vZHVsZVxyXG4vLy9cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE1hcExheWVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcENvbXBvbmVudCxcclxuICAgICAgICBNYXBNYXJrZXJEaXJlY3RpdmUsXHJcbiAgICAgICAgSW5mb0JveENvbXBvbmVudCxcclxuICAgICAgICBJbmZvQm94QWN0aW9uRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcFBvbHlnb25EaXJlY3RpdmUsXHJcbiAgICAgICAgTWFwUG9seWxpbmVEaXJlY3RpdmUsXHJcbiAgICAgICAgQ2x1c3RlckxheWVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZSxcclxuICAgICAgICBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hcENvbXBvbmVudCxcclxuICAgICAgICBNYXBNYXJrZXJEaXJlY3RpdmUsXHJcbiAgICAgICAgTWFwUG9seWdvbkRpcmVjdGl2ZSxcclxuICAgICAgICBNYXBQb2x5bGluZURpcmVjdGl2ZSxcclxuICAgICAgICBJbmZvQm94Q29tcG9uZW50LFxyXG4gICAgICAgIEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUsXHJcbiAgICAgICAgTWFwTGF5ZXJEaXJlY3RpdmUsXHJcbiAgICAgICAgQ2x1c3RlckxheWVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZSxcclxuICAgICAgICBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBNb2R1bGUge1xyXG5cclxuICAgIHN0YXRpYyBmb3JSb290KG1hcFNlcnZpY2VGYWN0b3J5PzogTWFwU2VydmljZUZhY3RvcnksIGxvYWRlcj86IE1hcEFQSUxvYWRlcik6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBNYXBNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgbWFwU2VydmljZUZhY3RvcnkgPyB7IHByb3ZpZGU6IE1hcFNlcnZpY2VGYWN0b3J5LCB1c2VWYWx1ZTogbWFwU2VydmljZUZhY3RvcnkgfSA6XHJcbiAgICAgICAgICAgICAgICAgICAgeyBwcm92aWRlOiBNYXBTZXJ2aWNlRmFjdG9yeSwgZGVwczogW01hcEFQSUxvYWRlciwgTmdab25lXSwgdXNlRmFjdG9yeTogQmluZ01hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeSB9LFxyXG4gICAgICAgICAgICAgICAgbG9hZGVyID8geyBwcm92aWRlOiBNYXBBUElMb2FkZXIsIHVzZVZhbHVlOiBsb2FkZXIgfSA6IHsgcHJvdmlkZTogTWFwQVBJTG9hZGVyLCB1c2VGYWN0b3J5OiBCaW5nTWFwTG9hZGVyRmFjdG9yeSB9LFxyXG4gICAgICAgICAgICAgICAgRG9jdW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgICBXaW5kb3dSZWZcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvclJvb3RCaW5nKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBNYXBNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBNYXBTZXJ2aWNlRmFjdG9yeSwgZGVwczogW01hcEFQSUxvYWRlciwgTmdab25lXSwgdXNlRmFjdG9yeTogQmluZ01hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBNYXBBUElMb2FkZXIsIHVzZUZhY3Rvcnk6IEJpbmdNYXBMb2FkZXJGYWN0b3J5IH0sXHJcbiAgICAgICAgICAgICAgICBEb2N1bWVudFJlZixcclxuICAgICAgICAgICAgICAgIFdpbmRvd1JlZlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZm9yUm9vdEdvb2dsZSgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTWFwTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogTWFwU2VydmljZUZhY3RvcnksIGRlcHM6IFtNYXBBUElMb2FkZXIsIE5nWm9uZV0sIHVzZUZhY3Rvcnk6IEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBNYXBBUElMb2FkZXIsIHVzZUZhY3Rvcnk6IEdvb2dsZU1hcExvYWRlckZhY3RvcnkgfSxcclxuICAgICAgICAgICAgICAgIERvY3VtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgV2luZG93UmVmXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==