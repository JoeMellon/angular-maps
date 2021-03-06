import { ILatLong } from '../../interfaces/ilatlong';
import { IPolygonOptions } from '../../interfaces/ipolygon-options';
import { BingMapService } from '../../services/bing/bing-map.service';
import { Polygon } from '../polygon';
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
export declare class BingPolygon extends Polygon implements Polygon {
    private _polygon;
    protected _mapService: BingMapService;
    protected _layer: Microsoft.Maps.Layer;
    private _map;
    private _isEditable;
    private _title;
    private _maxZoom;
    private _minZoom;
    private _showLabel;
    private _showTooltip;
    private _label;
    private _tooltip;
    private _hasToolTipReceiver;
    private _tooltipVisible;
    private _mouseOverListener;
    private _mouseMoveListener;
    private _mouseOutListener;
    private _metadata;
    private _originalPath;
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
     * @memberof BingPolygon
     */
    readonly Metadata: Map<string, any>;
    /**
     * Gets the native primitve implementing the polygon, in this case {@link Microsoft.Maps.Polygon}
     *
     * @readonly
     * @memberof BingPolygon
     */
    readonly NativePrimitve: Microsoft.Maps.Polygon;
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * @memberof BingPolygon
     * @property
     */
    ShowLabel: boolean;
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * @memberof BingPolygon
     * @property
     */
    ShowTooltip: boolean;
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * @memberof BingPolygon
     * @property
     */
    Title: string;
    /**
     * Creates an instance of BingPolygon.
     * @param _polygon - The {@link Microsoft.Maps.Polygon} underlying the model.
     * @param _mapService Instance of the Map Service.
     * @param _layer - The context layer.
     * @memberof BingPolygon
     */
    constructor(_polygon: Microsoft.Maps.Polygon, _mapService: BingMapService, _layer: Microsoft.Maps.Layer);
    /**
     * Adds a delegate for an event.
     *
     * @param eventType - String containing the event name.
     * @param fn - Delegate function to execute when the event occurs.

     * @memberof BingPolygon
     */
    AddListener(eventType: string, fn: Function): void;
    /**
     * Deleted the polygon.
     *
     * @memberof BingPolygon
     */
    Delete(): void;
    /**
     * Gets whether the polygon is draggable.
     *
     * @returns - True if the polygon is dragable, false otherwise.
     *
     * @memberof BingPolygon
     */
    GetDraggable(): boolean;
    /**
     * Gets whether the polygon path can be edited.
     *
     * @returns - True if the path can be edited, false otherwise.
     *
     * @memberof BingPolygon
     */
    GetEditable(): boolean;
    /**
     * Gets the polygon path.
     *
     * @returns - Array of {@link ILatLong} objects describing the polygon path.
     *
     * @memberof BingPolygon
     */
    GetPath(): Array<ILatLong>;
    /**
     * Gets the polygon paths.
     *
     * @returns - Array of Array of {@link ILatLong} objects describing multiple polygon paths.
     *
     * @memberof BingPolygon
     */
    GetPaths(): Array<Array<ILatLong>>;
    /**
     * Gets whether the polygon is visible.
     *
     * @returns - True if the polygon is visible, false otherwise.
     *
     * @memberof BingPolygon
     */
    GetVisible(): boolean;
    /**
     * Sets whether the polygon is dragable.
     *
     * @param draggable - True to make the polygon dragable, false otherwise.
     *
     * @memberof BingPolygon
     */
    SetDraggable(draggable: boolean): void;
    /**
     * Sets wether the polygon path is editable.
     *
     * @param editable - True to make polygon path editable, false otherwise.
     *
     * @memberof BingPolygon
     */
    SetEditable(editable: boolean): void;
    /**
     * Sets the polygon options
     *
     * @param options - {@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @memberof Polygon
     */
    SetOptions(options: IPolygonOptions): void;
    /**
     * Sets the polygon path.
     *
     * @param path - An Array of {@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @memberof BingPolygon
     */
    SetPath(path: Array<ILatLong>): void;
    /**
     * Set the polygon path or paths.
     *
     * @param paths
     * An Array of {@link ILatLong} (or array of arrays) describing the polygons path(s).
     *
     * @memberof BingPolygon
     */
    SetPaths(paths: Array<Array<ILatLong>> | Array<ILatLong>): void;
    /**
     * Sets whether the polygon is visible.
     *
     * @param visible - True to set the polygon visible, false otherwise.
     *
     * @memberof BingPolygon
     */
    SetVisible(visible: boolean): void;
    /**
     * Configures the label for the polygon
     * @memberof Polygon
     */
    private ManageLabel();
    /**
     * Configures the tooltip for the polygon
     * @memberof Polygon
     */
    private ManageTooltip();
}
