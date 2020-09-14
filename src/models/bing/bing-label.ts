import { BingMapService } from '../../services/bing/bing-map.service';
import { BingConversions } from '../../services/bing/bing-conversions';
import { ILabelOptions } from '../../interfaces/ilabel-options';
import { MapLabel } from '../map-label';
import { Extender } from '../extender';

let id: number = 0;

/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export class BingMapLabel extends MapLabel {

    /**
     * Returns the default label style for the platform
     *
     * @readonly
     * @abstract
     * @memberof BingMapLabel
     */
    public get DefaultLabelStyle(): ILabelOptions {
        return {
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            strokeWeight: 2,
            strokeColor: '#000000'
        };
    }

    ///
    /// Constructor
    ///

    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    constructor(options: { [key: string]: any }) {
        options.fontSize = options.fontSize || 12;
        options.fontColor = options.fontColor || '#ffffff';
        options.strokeWeight = options.strokeWeight || 2;
        options.strokeColor = options.strokeColor || '#000000';
        super(options);
        (<any>this)._options.beneathLabels = false;
    }

    ///
    /// Public methods
    ///

    /**
     * Gets the value of a setting.
     *
     * @param key - Key specifying the setting.
     * @returns - The value of the setting.
     * @memberof BingMapLabel
     * @method
     */
    public Get(key: string): any {
        return (<any>this)[key];
    }

    /**
     * Gets the map associted with the label.
     *
     * @memberof BingMapLabel
     * @method
     */
    public GetMap(): Microsoft.Maps.Map {
        return (<any>this).getMap();
    }

    /**
     * Set the value for a setting.
     *
     * @param key - Key specifying the setting.
     * @param val - The value to set.
     * @memberof BingMapLabel
     * @method
     */
    public Set(key: string, val: any): void {
        if (key === 'position' && !val.hasOwnProperty('altitude') && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new Microsoft.Maps.Location(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (<any>this)[key] = val;
            this.Changed(key);
        }
    }

    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * @param map - Map to associated with the label.
     * @memberof BingMapLabel
     * @method
     */
    public SetMap(map: Microsoft.Maps.Map): void {
        const m: Microsoft.Maps.Map = this.GetMap();
        if (map === m) { return; }
        if (m) {
            m.layers.remove(this);
        }
        if (map != null) {
            map.layers.insert(this);
        }
    }

    /**
     * Applies settings to the object
     *
     * @param options - An object containing the settings key value pairs.
     * @memberof BingMapLabel
     * @method
     */
    public SetValues(options: { [key: string]: any }): void {
        const p: Array<string> = new Array<string>();
        for (const key in options) {
            if (key !== '') {
                if (key === 'position' && !options[key].hasOwnProperty('altitude') &&
                    options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new Microsoft.Maps.Location(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) !== options[key]) {
                    (<any>this)[key] = options[key];
                    p.push(key);
                }
            }
        }
        if (p.length > 0) { this.Changed(p); }
    }

    ///
    /// Protected methods
    ///

    /**
     * Draws the label on the map.
     * @memberof BingMapLabel
     * @method
     * @protected
     */
    protected Draw(): void {
        const visibility: string = this.GetVisible();
        const m: Microsoft.Maps.Map = this.GetMap();
        if (!this._canvas) { return; }
        if (!m) { return; }
        const style: CSSStyleDeclaration = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }

        let offset: Microsoft.Maps.Point = this.Get('offset');
        const latLng: Microsoft.Maps.Location = this.Get('position');
        if (!latLng) { return; }
        if (!offset) { offset = new Microsoft.Maps.Point(0, 0); }

        const pos: Microsoft.Maps.Point = <Microsoft.Maps.Point>m.tryLocationToPixel(
            latLng,
            Microsoft.Maps.PixelReference.control);
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    }

    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * @memberof BingMapLabel
     * @method
     * @protected
     */
    protected OnAdd() {
        this._canvas = document.createElement('canvas');
        this._canvas.id = `xMapLabel${id++}`;
        const style: CSSStyleDeclaration = this._canvas.style;
        style.position = 'absolute';

        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';

        (<any>this).setHtmlElement(this._canvas);
    }

    ///
    /// Private methods
    ///

    /**
     * Delegate callled when the label is loaded
     * @memberof BingMapLabel
     * @method
     */
    private OnLoad() {
        Microsoft.Maps.Events.addHandler(this.GetMap(), 'viewchange', () => {
            this.Changed('position');
        });
        this.DrawCanvas();
        this.Draw();
    }
}

/**
 * Helper function to extend the CustomOverlay into the MapLabel
 *
 * @export
 * @method
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(BingMapLabel)
    .Extend(new Microsoft.Maps.CustomOverlay())
    .Map('onAdd', 'OnAdd')
    .Map('onLoad', 'OnLoad')
    .Map('onRemove', 'OnRemove');
}
