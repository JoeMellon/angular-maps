import { ILatLong } from '../../interfaces/ilatlong';
import { IPolylineOptions } from '../../interfaces/ipolyline-options';
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polyline } from '../polyline';
import { BingMapLabel } from './bing-label';

/**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
export class BingPolyline extends Polyline implements Polyline {

    ///
    /// Field declarations
    ///
    private _isEditable: boolean = true;

    ///
    /// Property declarations
    ///
    private _title: string = '';
    private _showTooltip: boolean = false;
    private _tooltip: BingMapLabel = null;
    private _hasToolTipReceiver: boolean = false;
    private _tooltipVisible: boolean = false;
    private _mouseOverListener: Microsoft.Maps.IHandlerId;
    private _mouseMoveListener: Microsoft.Maps.IHandlerId;
    private _mouseOutListener: Microsoft.Maps.IHandlerId;
    private _metadata: Map<string, any> = new Map<string, any>();

    /**
     * Gets the polyline metadata.
     *
     * @readonly
     * @memberof BingPolyline
     */
    public get Metadata(): Map<string, any> { return this._metadata; }

    /**
     * Gets the Navitve Polyline underlying the model
     *
     * @readonly
     * @memberof BingPolyline
     */
    public get NativePrimitve(): Microsoft.Maps.Polyline { return this._polyline; }

    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * @memberof BingPolyline
     * @property
     */
    public get ShowTooltip(): boolean { return this._showTooltip; }
    public set ShowTooltip(val: boolean) {
        this._showTooltip = val;
        this.ManageTooltip();
    }

    /**
     * Gets or sets the title off the polyline
     *
     * @abstract
     * @memberof BingPolyline
     * @property
     */
    public get Title(): string { return this._title; }
    public set Title(val: string) {
        this._title = val;
        this.ManageTooltip();
    }

    ///
    /// constructor
    ///

    /**
     * Creates an instance of BingPolygon.
     * @param _polyline - The {@link Microsoft.Maps.Polyline} underlying the model.
     * @param _map - The context map.
     * @param _layer - The context layer.
     * @memberof BingPolyline
     */
    constructor(private _polyline: Microsoft.Maps.Polyline, protected _map: Microsoft.Maps.Map, protected _layer: Microsoft.Maps.Layer) {
        super();
    }

    /**
     * Adds a delegate for an event.
     *
     * @param eventType - String containing the event name.
     * @param fn - Delegate function to execute when the event occurs.
     * @memberof BingPolyline
     */
    public AddListener(eventType: string, fn: Function): void {
        const supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup' ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polyline, eventType, (e) => {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            let handlerId: Microsoft.Maps.IHandlerId;
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', e => {
                handlerId = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', m => fn(m));
            });
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', e => {
                if (handlerId) { Microsoft.Maps.Events.removeHandler(handlerId); }
            });
        }
    }

    /**
     * Deleted the polyline.
     *
     * @memberof BingPolyline
     */
    public Delete(): void {
        if (this._layer) { this._layer.remove(this.NativePrimitve); }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._tooltip) { this._tooltip.Delete(); }
    }

    /**
     * Gets whether the polyline is draggable.
     *
     * @returns - True if the polyline is dragable, false otherwise.
     *
     * @memberof BingPolyline
     */
    public GetDraggable(): boolean {
        ///
        /// Bing polygons are not draggable by default.
        /// See https://social.msdn.microsoft.com/Forums/en-US/
        ///     7aaae748-4d5f-4be5-a7bb-90498e08b41c/how-can-i-make-polygonpolyline-draggable-in-bing-maps-8
        ///     ?forum=bingmaps
        /// for a possible approach to be implemented in the model.
        ///
        return false;
    }

    /**
     * Gets whether the polyline path can be edited.
     *
     * @returns - True if the path can be edited, false otherwise.
     *
     * @memberof BingPolyline
     */
    public GetEditable(): boolean {
        return this._isEditable;
    }

    /**
     * Gets the polyline path.
     *
     * @returns - Array of {@link ILatLong} objects describing the polyline path.
     *
     * @memberof BingPolyline
     */
    public GetPath(): Array<ILatLong> {
        const p: Array<Microsoft.Maps.Location> = this._polyline.getLocations();
        const path: Array<ILatLong> = new Array<ILatLong>();
        p.forEach(l => path.push({ latitude: l.latitude, longitude: l.longitude }));
        return path;
    }

    /**
     * Gets whether the polyline is visible.
     *
     * @returns - True if the polyline is visible, false otherwise.
     *
     * @memberof BingPolyline
     */
    public GetVisible(): boolean {
        return this._polyline.getVisible();
    }

    /**
     * Sets whether the polyline is dragable.
     *
     * @param draggable - True to make the polyline dragable, false otherwise.
     *
     * @memberof BingPolyline
     */
    public SetDraggable(draggable: boolean): void {
        ///
        /// Bing polygons are not draggable by default.
        /// See https://social.msdn.microsoft.com/Forums/en-US/
        ///     7aaae748-4d5f-4be5-a7bb-90498e08b41c/how-can-i-make-polygonpolyline-draggable-in-bing-maps-8
        ///     ?forum=bingmaps
        /// for a possible approach to be implemented in the model.
        ///
        throw(new Error('The bing maps implementation currently does not support draggable polylines.'));
    }

    /**
     * Sets wether the polyline path is editable.
     *
     * @param editable - True to make polyline path editable, false otherwise.
     *
     * @memberof BingPolyline
     */
    public SetEditable(editable: boolean): void {
        this._isEditable = editable;
    }

    /**
     * Sets the polyline options
     *
     * @param options - {@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @memberof BingPolyline
     */
    public SetOptions(options: IPolylineOptions): void {
        const o: Microsoft.Maps.IPolylineOptions = BingConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(<Array<ILatLong>>options.path);
        }
    }

    /**
     * Sets the polyline path.
     *
     * @param path - An Array of {@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @memberof BingPolyline
     */
    public SetPath(path: Array<ILatLong>): void {
        const p: Array<Microsoft.Maps.Location> = new Array<Microsoft.Maps.Location>();
        path.forEach(x => p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
        this._polyline.setLocations(p);
    }

    /**
     * Sets whether the polyline is visible.
     *
     * @param visible - True to set the polyline visible, false otherwise.
     *
     * @memberof BingPolyline
     */
    public SetVisible(visible: boolean): void {
        this._polyline.setOptions(<Microsoft.Maps.IPolylineOptions>{ visible: visible });
    }

    ///
    /// Private methods
    ///

    /**
     * Configures the tooltip for the polygon
     * @memberof Polygon
     */
    private ManageTooltip(): void {
        if (this._showTooltip && this._title != null && this._title !== '') {
            const o: { [key: string]: any } = {
                text: this._title,
                align: 'left',
                offset: new Microsoft.Maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                this._tooltip = new BingMapLabel(o);
                this._tooltip.SetMap(this._map);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(
                        this._polyline, 'mouseover', (e: Microsoft.Maps.IMouseEventArgs) => {
                    this._tooltip.Set('position', e.location);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = Microsoft.Maps.Events.addHandler(
                            this._map, 'mousemove', (e: Microsoft.Maps.IMouseEventArgs) => {
                    if (this._tooltipVisible && e.location && e.primitive === this._polyline) {
                        this._tooltip.Set('position', e.location);
                    }
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(
                            this._polyline, 'mouseout', (e: Microsoft.Maps.IMouseEventArgs) => {
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
                if (this._mouseOutListener) { Microsoft.Maps.Events.removeHandler(this._mouseOutListener) ; }
                if (this._mouseOverListener) { Microsoft.Maps.Events.removeHandler(this._mouseOverListener); }
                if (this._mouseMoveListener) { Microsoft.Maps.Events.removeHandler(this._mouseMoveListener); }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    }
}
