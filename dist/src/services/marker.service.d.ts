import { Observable } from 'rxjs';
import { IPoint } from '../interfaces/ipoint';
import { ILatLong } from '../interfaces/ilatlong';
import { Marker } from '../models/marker';
import { MapMarkerDirective } from '../components/map-marker';
/**
 * The abstract class represents the contract defintions for a marker service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 */
export declare abstract class MarkerService {
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * @abstract
     * @param marker - The {@link MapMarkerDirective} to be added.
     *
     * @memberof MarkerService
     */
    abstract AddMarker(marker: MapMarkerDirective): void;
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * @param eventName - The name of the event to register (e.g. 'click')
     * @param marker - The {@link MapMarker} for which to register the event.
     * @returns - Observable emiting an instance of T each time the event occurs.
     *
     * @memberof MarkerService
     */
    abstract CreateEventObservable<T>(eventName: string, marker: MapMarkerDirective): Observable<T>;
    /**
     * Deletes a marker.
     *
     * @abstract
     * @param marker - {@link MapMarkerDirective} to be deleted.
     * @returns - A promise fullfilled once the marker has been deleted.
     *
     * @memberof MarkerService
     */
    abstract DeleteMarker(marker: MapMarkerDirective): Promise<void>;
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * @param e - The mouse event.
     * @returns - {@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     * @memberof MarkerService
     */
    abstract GetCoordinatesFromClick(e: MouseEvent | any): ILatLong;
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * @abstract
     * @param marker - The {@link MapMarkerDirective} for which to obtain the marker model.
     * @returns - A promise that when fullfilled contains the {@link Marker} implementation of the underlying platform.
     *
     * @memberof MarkerService
     */
    abstract GetNativeMarker(marker: MapMarkerDirective): Promise<Marker>;
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * @abstract
     * @param e - The mouse event.
     * @returns - {@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     * @memberof MarkerService
     */
    abstract GetPixelsFromClick(e: MouseEvent | any): IPoint;
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * @abstract
     * @param target - Either a {@link MapMarkerDirective} or a {@link ILatLong}
     * for the basis of translation.
     * @returns - A promise that when fullfilled contains a {@link IPoint}
     * with the pixel coordinates of the MapMarkerDirective or ILatLong relative to the map canvas.
     *
     * @memberof MarkerService
     */
    abstract LocationToPoint(target: MapMarkerDirective | ILatLong): Promise<IPoint>;
    /**
     * Updates the anchor position for the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the anchor.
     * Anchor information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the anchor position has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateAnchor(maker: MapMarkerDirective): Promise<void>;
    /**
     * Updates whether the marker is draggable.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate dragability.
     * Dragability information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the marker has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateDraggable(marker: MapMarkerDirective): Promise<void>;
    /**
     * Updates the Icon on the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the icon.
     * Icon information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the icon information has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateIcon(marker: MapMarkerDirective): Promise<void>;
    /**
     * Updates the label on the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the label.
     * Label information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the label has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateLabel(marker: MapMarkerDirective): Promise<void>;
    /**
     * Updates the geo coordinates for the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the coordinates.
     * Coordinate information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the position has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateMarkerPosition(marker: MapMarkerDirective): Promise<void>;
    /**
     * Updates the title on the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the title.
     * Title information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the title has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateTitle(marker: MapMarkerDirective): Promise<void>;
    /**
     * Updates the visibility on the marker.
     *
     * @abstract
     * @param - The {@link MapMarkerDirective} object for which to upate the visibility.
     * Visibility information is present in the underlying {@link Marker} model object.
     * @returns - A promise that is fullfilled when the visibility has been updated.
     *
     * @memberof MarkerService
     */
    abstract UpdateVisible(marker: MapMarkerDirective): Promise<void>;
}
