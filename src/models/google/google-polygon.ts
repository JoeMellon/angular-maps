import { ILatLong } from '../../interfaces/ilatlong';
import { IPolygonOptions } from '../../interfaces/ipolygon-options';
import { IPolygonEvent } from '../../interfaces/ipolygon-event';
import { GoogleConversions } from '../../services/google/google-conversions';
import { Polygon } from '../polygon';
import { GoogleMapLabel } from './google-label';
import * as GoogleMapTypes from '../../services/google/google-map-types';

declare var google: any;

/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export class GooglePolygon extends Polygon implements Polygon {

    private _title: string = '';
    private _showLabel: boolean = false;
    private _showTooltip: boolean = false;
    private _maxZoom: number = -1;
    private _minZoom: number = -1;
    private _label: GoogleMapLabel = null;
    private _tooltip: GoogleMapLabel = null;
    private _tooltipVisible: boolean = false;
    private _hasToolTipReceiver: boolean = false;
    private _originalPath: Array<Array<ILatLong>>;
    private _mouseOverListener: GoogleMapTypes.MapsEventListener = null;
    private _mouseOutListener: GoogleMapTypes.MapsEventListener = null;
    private _mouseMoveListener: GoogleMapTypes.MapsEventListener = null;
    private _metadata: Map<string, any> = new Map<string, any>();
    private _editingCompleteEmitter: (event: IPolygonEvent) => void = null;

    ///
    /// Property declarations
    ///

    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @memberof GooglePolygon
     * @property
     */
    public get LabelMaxZoom(): number { return this._maxZoom; }
    public set LabelMaxZoom(val: number) {
        this._maxZoom = val;
        this.ManageLabel();
    }

    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @memberof GooglePolygon
     * @property
     */
    public get LabelMinZoom(): number { return this._minZoom; }
    public set LabelMinZoom(val: number) {
        this._minZoom = val;
        this.ManageLabel();
    }

    /**
     * Gets the polygon metadata.
     *
     * @readonly
     * @memberof GoolePolygon
     */
    public get Metadata(): Map<string, any> { return this._metadata; }

    /**
     * Gets the native primitve implementing the polygon, in this case {@link GoogleMapTypes.Polygon}
     *
     * @readonly
     * @memberof GooglePolygon
     */
    public get NativePrimitve(): GoogleMapTypes.Polygon { return this._polygon; }

    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    public get ShowLabel(): boolean { return this._showLabel; }
    public set ShowLabel(val: boolean) {
        this._showLabel = val;
        this.ManageLabel();
    }

    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    public get ShowTooltip(): boolean { return this._showTooltip; }
    public set ShowTooltip(val: boolean) {
        this._showTooltip = val;
        this.ManageTooltip();
    }

    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * @memberof GooglePolygon
     * @property
     */
    public get Title(): string { return this._title; }
    public set Title(val: string) {
        this._title = val;
        this.ManageLabel();
        this.ManageTooltip();
    }

    ///
    /// constructor
    ///

    /**
     * Creates an instance of GooglePolygon.
     * @param _polygon - The {@link GoogleMapTypes.Polygon} underlying the model.
     *
     * @memberof GooglePolygon
     */
    constructor(private _polygon: GoogleMapTypes.Polygon) {
        super();
        this._originalPath = this.GetPaths();
    }

    /**
     * Adds a delegate for an event.
     *
     * @param eventType - String containing the event name.
     * @param fn - Delegate function to execute when the event occurs.

     * @memberof GooglePolygon
     */
    public AddListener(eventType: string, fn: Function): void {
        const supportedEvents = [
            'click',
            'dblclick',
            'drag', 'dragend',
            'dragstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'rightclick'
        ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            this._polygon.addListener(eventType, fn);
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = <(event: IPolygonEvent) => void>fn;
        }
    }

    /**
     * Deleted the polygon.
     *
     * @memberof GooglePolygon
     */
    public Delete(): void {
        this._polygon.setMap(null);
        if (this._label) { this._label.Delete(); }
        if (this._tooltip) { this._tooltip.Delete(); }
    }

    /**
     * Gets whether the polygon is draggable.
     *
     * @returns - True if the polygon is dragable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public GetDraggable(): boolean {
        return this._polygon.getDraggable();
    }

    /**
     * Gets whether the polygon path can be edited.
     *
     * @returns - True if the path can be edited, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public GetEditable(): boolean {
        return this._polygon.getEditable();
    }

    /**
     * Gets the polygon path.
     *
     * @returns - Array of {@link ILatLong} objects describing the polygon path.
     *
     * @memberof GooglePolygon
     */
    public GetPath(): Array<ILatLong> {
        const p: Array<GoogleMapTypes.LatLng> = this._polygon.getPath();
        const path: Array<ILatLong> = new Array<ILatLong>();
        p.forEach(x => path.push({ latitude: x.lat(), longitude: x.lng() }));
        return path;
    }

    /**
     * Gets the polygon paths.
     *
     * @returns - Array of Array of {@link ILatLong} objects describing multiple polygon paths.
     *
     * @memberof GooglePolygon
     */
    public GetPaths(): Array<Array<ILatLong>> {
        const p: Array<Array<GoogleMapTypes.LatLng>> = this._polygon.getPaths();
        const paths: Array<Array<ILatLong>> = new Array<Array<ILatLong>>();
        p.forEach(x => {
            const path: Array<ILatLong> = new Array<ILatLong>();
            x.forEach(y => path.push({ latitude: y.lat(), longitude: y.lng() }));
            paths.push(path);
        });
        return paths;
    }

    /**
     * Gets whether the polygon is visible.
     *
     * @returns - True if the polygon is visible, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public GetVisible(): boolean {
        return this._polygon.getVisible();
    }

    /**
     * Sets whether the polygon is dragable.
     *
     * @param draggable - True to make the polygon dragable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public SetDraggable(draggable: boolean): void {
        this._polygon.setDraggable(draggable);
    }

    /**
     * Sets wether the polygon path is editable.
     *
     * @param editable - True to make polygon path editable, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public SetEditable(editable: boolean): void {
        const previous = this._polygon.getEditable();
        this._polygon.setEditable(editable);
        if (previous && !editable && this._editingCompleteEmitter) {
            this._editingCompleteEmitter({
                Click: null,
                Polygon: this,
                OriginalPath: this._originalPath,
                NewPath: this.GetPaths()
            });
            this._originalPath = this.GetPaths();
        }
    }

    /**
     * Sets the polygon options
     *
     * @param options - {@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @memberof GooglePolygon
     */
    public SetOptions(options: IPolygonOptions): void {
        const o: GoogleMapTypes.PolygonOptions = GoogleConversions.TranslatePolygonOptions(options);

        if (typeof o.editable !== 'undefined') {
            this.SetEditable(o.editable);
            delete o.editable;
        }

        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) { this._label.Set('hidden', !options.visible); }
    }

    /**
     * Sets the polygon path.
     *
     * @param path - An Array of {@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @memberof GooglePolygon
     */
    public SetPath(path: Array<ILatLong>): void {
        const p: Array<GoogleMapTypes.LatLng> = new Array<GoogleMapTypes.LatLng>();
        path.forEach(x => p.push(new google.maps.LatLng(x.latitude, x.longitude)));
        this._polygon.setPath(p);
        this._originalPath = [path];
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    }

    /**
     * Set the polygon path or paths.
     *
     * @param paths An Array of {@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @memberof GooglePolygon
     */
    public SetPaths(paths: Array<Array<ILatLong>> | Array<ILatLong>): void {
        if (paths == null) { return; }
        if (!Array.isArray(paths)) { return; }
        if (paths.length === 0) {
            this._polygon.setPaths(new Array<GoogleMapTypes.LatLng>());
            if (this._label) {
                this._label.Delete();
                this._label = null;
            }
            return;
        }
        if (Array.isArray(paths[0])) {
            // parameter is an array or arrays
            const p: Array<Array<GoogleMapTypes.LatLng>> = new Array<Array<GoogleMapTypes.LatLng>>();
            (<Array<Array<ILatLong>>>paths).forEach(path => {
                const _p: Array<GoogleMapTypes.LatLng> = new Array<GoogleMapTypes.LatLng>();
                path.forEach(x => _p.push(new google.maps.LatLng(x.latitude, x.longitude)));
                p.push(_p);
            });
            this._polygon.setPaths(p);
            this._originalPath = <Array<Array<ILatLong>>>paths;
            if (this._label) {
                this._centroid = null;
                this.ManageLabel();
            }
        } else {
            // parameter is a simple array....
            this.SetPath(<Array<ILatLong>>paths);
        }
    }

    /**
     * Sets whether the polygon is visible.
     *
     * @param visible - True to set the polygon visible, false otherwise.
     *
     * @memberof GooglePolygon
     */
    public SetVisible(visible: boolean): void {
        this._polygon.setVisible(visible);
        if (this._showLabel && this._label) { this._label.Set('hidden', !visible); }
    }

    ///
    /// Private methods
    ///

    /**
     * Configures the label for the polygon
     * @memberof GooglePolygon
     */
    private ManageLabel(): void {
        if (this.GetPath == null || this.GetPath().length === 0) { return; }
        if (this._showLabel && this._title != null && this._title !== '') {
            const o: { [key: string]: any } = {
                text: this._title,
                position: GoogleConversions.TranslateLocationObject(this.Centroid)
            };
            if (o.position == null) { return; }
            if (this._minZoom !== -1) { o.minZoom = this._minZoom; }
            if (this._maxZoom !== -1) { o.maxZoom = this._maxZoom; }
            if (this._label == null) {
                o.map = this.NativePrimitve.getMap();
                o.zIndex = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                this._label = new GoogleMapLabel(o);
            }
            else {
                this._label.SetValues(o);
            }
            this._label.Set('hidden', !this.GetVisible());
        }
        else {
            if (this._label) {
                this._label.SetMap(null);
                this._label = null;
            }
        }
    }

    /**
     * Configures the tooltip for the polygon
     * @memberof GooglePolygon
     */
    private ManageTooltip(): void {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const o: { [key: string]: any } = {
                text: this._title,
                align: 'left',
                offset: new google.maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                o.map = this.NativePrimitve.getMap();
                o.zIndex = 100000;
                this._tooltip = new GoogleMapLabel(o);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', (e: GoogleMapTypes.MouseEvent) => {
                    this._tooltip.Set('position', e.latLng);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', (e: GoogleMapTypes.MouseEvent) => {
                    if (this._tooltipVisible) { this._tooltip.Set('position', e.latLng); }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', (e: GoogleMapTypes.MouseEvent) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) { google.maps.event.removeListener(this._mouseOutListener); }
                if (this._mouseOverListener) { google.maps.event.removeListener(this._mouseOverListener); }
                if (this._mouseMoveListener) { google.maps.event.removeListener(this._mouseMoveListener); }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    }

}
