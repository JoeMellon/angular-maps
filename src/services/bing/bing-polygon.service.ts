import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { ILatLong } from '../../interfaces/ilatlong';
import { IPolygonOptions } from '../../interfaces/ipolygon-options';
import { Polygon } from '../../models/polygon';
import { MapPolygonDirective } from '../../components/map-polygon';
import { PolygonService } from '../polygon.service';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';

/**
 * Concrete implementation of the Polygon Service abstract class for Bing Maps V8.
 *
 * @export
 */
@Injectable()
export class BingPolygonService implements PolygonService {

    ///
    /// Field declarations
    ///
    private _polygons: Map<MapPolygonDirective, Promise<Polygon>> = new Map<MapPolygonDirective, Promise<Polygon>>();

    ///
    /// Constructor
    ///

    /**
     * Creates an instance of BingPolygonService.
     * @param _mapService - {@link MapService} instance. The concrete {@link BingMapService} implementation is expected.
     * @param _layerService - {@link BingLayerService} instance.
     * The concrete {@link BingLayerService} implementation is expected.
     * @param _zone - NgZone instance to support zone aware promises.
     *
     * @memberof BingPolygonService
     */
    constructor(private _mapService: MapService,
        private _layerService: LayerService,
        private _zone: NgZone) {
    }

    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * @param polygon - The {@link MapPolygonDirective} to be added.
     *
     * @memberof BingPolygonService
     */
    public AddPolygon(polygon: MapPolygonDirective): void {
        const o: IPolygonOptions = {
            id: polygon.Id,
            clickable: polygon.Clickable,
            draggable: polygon.Draggable,
            editable: polygon.Editable,
            fillColor: polygon.FillColor,
            fillOpacity: polygon.FillOpacity,
            geodesic: polygon.Geodesic,
            labelMaxZoom: polygon.LabelMaxZoom,
            labelMinZoom: polygon.LabelMinZoom,
            paths: polygon.Paths,
            showLabel: polygon.ShowLabel,
            showTooltip: polygon.ShowTooltip,
            strokeColor: polygon.StrokeColor,
            strokeOpacity: polygon.StrokeOpacity,
            strokeWeight: polygon.StrokeWeight,
            title: polygon.Title,
            visible: polygon.Visible,
            zIndex: polygon.zIndex,
        };
        let polygonPromise: Promise<Polygon>;
        if (polygon.InCustomLayer) {
            polygonPromise = this._layerService.CreatePolygon(polygon.LayerId, o);
        }
        else {
            polygonPromise = this._mapService.CreatePolygon(o);
        }
        this._polygons.set(polygon, polygonPromise);
    }

    /**
      * Registers an event delegate for a polygon.
      *
      * @param eventName - The name of the event to register (e.g. 'click')
      * @param polygon - The {@link MapPolygonDirective} for which to register the event.
      * @returns - Observable emiting an instance of T each time the event occurs.
      *
      * @memberof BingPolygonService
      */
    public CreateEventObservable<T>(eventName: string, polygon: MapPolygonDirective): Observable<T> {
        const b: Subject<T> = new Subject<T>();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        ///
        /// mousemove and rightclick are not supported by bing polygons.
        ///

        return Observable.create((observer: Observer<T>) => {
            this._polygons.get(polygon).then((p: Polygon) => {
                p.AddListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
            });
        });
    }

    /**
      * Deletes a polygon.
      *
      * @param polygon - {@link MapPolygonDirective} to be deleted.
      * @returns - A promise fullfilled once the polygon has been deleted.
      *
      * @memberof BingPolygonService
      */
    public DeletePolygon(polygon: MapPolygonDirective): Promise<void> {
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l: Polygon) => {
            return this._zone.run(() => {
                l.Delete();
                this._polygons.delete(polygon);
            });
        });

    }

    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * @param e - The mouse event. Expected to implement {@link Microsoft.Maps.IMouseEventArgs}.
     * @returns - {@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     * @memberof BingPolygonService
     */
    public GetCoordinatesFromClick(e: MouseEvent | any): ILatLong {
        const x: Microsoft.Maps.IMouseEventArgs = <Microsoft.Maps.IMouseEventArgs>e;
        return { latitude: x.location.latitude, longitude: x.location.longitude };
    }

    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * @param polygon - The {@link MapPolygonDirective} for which to obtain the polygon model.
     * @returns - A promise that when fullfilled contains the {@link Polygon} implementation of the underlying platform.
     *
     * @memberof BingPolygonService
     */
    public GetNativePolygon(polygon: MapPolygonDirective): Promise<Polygon> {
        return this._polygons.get(polygon);
    }

    /**
     * Set the polygon options.
     *
     * @param polygon - {@link MapPolygonDirective} to be updated.
     * @param options - {@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @returns - A promise fullfilled once the polygon options have been set.
     *
     * @memberof BingPolygonService
     */
    public SetOptions(polygon: MapPolygonDirective, options: IPolygonOptions): Promise<void> {
        return this._polygons.get(polygon).then((l: Polygon) => { l.SetOptions(options); });
    }

    /**
     * Updates the Polygon path
     *
     * @param polygon - {@link MapPolygonDirective} to be updated.
     * @returns - A promise fullfilled once the polygon has been updated.
     *
     * @memberof BingPolygonService
     */
    public UpdatePolygon(polygon: MapPolygonDirective): Promise<void> {
        const m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then((l: Polygon) =>  {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(<Array<ILatLong>>polygon.Paths);
            }
        });
    }

}
