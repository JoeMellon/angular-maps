import { ILatLong } from '../../interfaces/ilatlong';
import { IPolygonOptions } from '../../interfaces/ipolygon-options';
import { Polygon } from '../polygon';
import * as GoogleMapTypes from '../../services/google/google-map-types';
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export declare class GooglePolygon extends Polygon implements Polygon {
    private _polygon;
    private _title;
    private _showLabel;
    private _showTooltip;
    private _maxZoom;
    private _minZoom;
    private _label;
    private _tooltip;
    private _tooltipVisible;
    private _hasToolTipReceiver;
    private _originalPath;
    private _mouseOverListener;
    private _mouseOutListener;
    private _mouseMoveListener;
    private _metadata;
    private _editingCompleteEmitter;
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @memberof GooglePolygon
     * @property
     */
    LabelMaxZoom: number;
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @memberof GooglePolygon
     * @property
     */
    LabelMinZoom: number;
    /**
     * Gets the polygon metadata.
     *
     * @readonly
     * @memberof GoolePolygon
     */
    readonly Metadata: Map<string, any>;
    /**
     * Gets the native primitve implementing the polygon, in this case {@link GoogleMapTypes.Polygon}
     *
     * @readonly
     * @memberof GooglePolygon
     */
    readonly NativePrimitve: GoogleMapTypes.Polygon;
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    ShowLabel: boolean;
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    ShowTooltip: boolean;
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    Title: string;
    /**
     * Creates an instance of GooglePolygon.
     * @param _polygon - The {@link GoogleMapTypes.Polygon} underlying the model.
     *
     * @memberof GooglePolygon
     */
    constructor(_polygon: GoogleMapTypes.Polygon);
    /**
     * Adds a delegate for an event.
     *
     * @param eventType - String containing the event name.
     * @param fn - Delegate function to execute when the event occurs.

     * @memberof GooglePolygon
     */
    AddListener(eventType: string, fn: Function): void;
    /**
     * Deleted the polygon.
     *
     * @memberof GooglePolygon
     */
    Delete(): void;
    /**
     * Gets whether the polygon is draggable.
     *
     * @returns - True if the polygon is dragable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    GetDraggable(): boolean;
    /**
     * Gets whether the polygon path can be edited.
     *
     * @returns - True if the path can be edited, false otherwise.
     *
     * @memberof GooglePolygon
     */
    GetEditable(): boolean;
    /**
     * Gets the polygon path.
     *
     * @returns - Array of {@link ILatLong} objects describing the polygon path.
     *
     * @memberof GooglePolygon
     */
    GetPath(): Array<ILatLong>;
    /**
     * Gets the polygon paths.
     *
     * @returns - Array of Array of {@link ILatLong} objects describing multiple polygon paths.
     *
     * @memberof GooglePolygon
     */
    GetPaths(): Array<Array<ILatLong>>;
    /**
     * Gets whether the polygon is visible.
     *
     * @returns - True if the polygon is visible, false otherwise.
     *
     * @memberof GooglePolygon
     */
    GetVisible(): boolean;
    /**
     * Sets whether the polygon is dragable.
     *
     * @param draggable - True to make the polygon dragable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    SetDraggable(draggable: boolean): void;
    /**
     * Sets wether the polygon path is editable.
     *
     * @param editable - True to make polygon path editable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    SetEditable(editable: boolean): void;
    /**
     * Sets the polygon options
     *
     * @param options - {@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @memberof GooglePolygon
     */
    SetOptions(options: IPolygonOptions): void;
    /**
     * Sets the polygon path.
     *
     * @param path - An Array of {@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @memberof GooglePolygon
     */
    SetPath(path: Array<ILatLong>): void;
    /**
     * Set the polygon path or paths.
     *
     * @param paths An Array of {@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @memberof GooglePolygon
     */
    SetPaths(paths: Array<Array<ILatLong>> | Array<ILatLong>): void;
    /**
     * Sets whether the polygon is visible.
     *
     * @param visible - True to set the polygon visible, false otherwise.
     *
     * @memberof GooglePolygon
     */
    SetVisible(visible: boolean): void;
    /**
     * Configures the label for the polygon
     * @memberof GooglePolygon
     */
    private ManageLabel();
    /**
     * Configures the tooltip for the polygon
     * @memberof GooglePolygon
     */
    private ManageTooltip();
}
