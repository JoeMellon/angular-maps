/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
/** *
 * internal counter to use as ids for polygons.
  @type {?} */
var layerId = 1000000;
/**
 * MapPolygonLayerDirective performantly renders a large set of polygons on a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polygon-layer [PolygonOptions]="_polygons"></x-map-polygon-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolygonLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolygonLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolygonLayerDirective
     */
    function MapPolygonLayerDirective(_layerService, _mapService, _zone) {
        this._layerService = _layerService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._labels = new Array();
        this._tooltipSubscriptions = new Array();
        this._tooltipVisible = false;
        this._defaultOptions = {
            fontSize: 11,
            fontFamily: 'sans-serif',
            strokeWeight: 2,
            strokeColor: '#000000',
            fontColor: '#ffffff'
        };
        this._streaming = false;
        this._polygons = new Array();
        this._polygonsLast = new Array();
        /**
         * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polygon titles as the labels on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polygosn as the tooltips on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polygon in a layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolygonLayerDirective.prototype, "PolygonOptions", {
        /**
         * An array of polygon options representing the polygons in the layer.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * An array of polygon options representing the polygons in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._polygons; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polygonsLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polygons).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polygons = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonLayerDirective.prototype, "TreatNewPolygonOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._streaming; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._streaming = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the marker layer.
         *
         * \@readonly
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(function () {
            /** @type {?} */
            var fakeLayerDirective = {
                Id: _this._id,
                Visible: _this.Visible,
                LayerOffset: _this.LayerOffset,
                ZIndex: _this.ZIndex
            };
            _this._layerService.AddLayer(fakeLayerDirective);
            _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
            Promise.all([
                _this._layerPromise,
                _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
            ]).then(function (values) {
                values[0].SetVisible(_this.Visible);
                _this._canvas = values[1];
                _this._canvas._canvasReady.then(function (b) {
                    _this._tooltip = _this._canvas.GetToolTipOverlay();
                    _this.ManageTooltip(_this.ShowTooltips);
                });
                if (_this.PolygonOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolygons(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    function () {
        this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._layerPromise.then(function (l) {
            l.Delete();
        });
        if (this._canvas) {
            this._canvas.Delete();
        }
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolygonOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolygons();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
            (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
            (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
            if (this._canvas) {
                this._canvas.Redraw(true);
            }
        }
        if (changes['ShowTooltips'] && this._tooltip) {
            this.ManageTooltip(changes['ShowTooltips'].currentValue);
        }
    };
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    MapPolygonLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    function () { return 'MapPolygonLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.PolygonClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolygonDblClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolygonMouseMove.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolygonMouseOut.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolygonMouseOver.emit({ Polygon: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.DrawLabels = /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    function (el) {
        var _this = this;
        if (this.ShowLabels) {
            this._mapService.GetZoom().then(function (z) {
                if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                    /** @type {?} */
                    var ctx_1 = el.getContext('2d');
                    /** @type {?} */
                    var labels_1 = _this._labels.map(function (x) { return x.title; });
                    _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                        /** @type {?} */
                        var size = _this._mapService.MapSize;
                        for (var i = 0, len = locs.length; i < len; i++) {
                            // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                            if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                _this.DrawText(ctx_1, locs[i], labels_1[i]);
                            }
                        }
                    });
                }
            });
        }
    };
    /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.DrawText = /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    function (ctx, loc, text) {
        /** @type {?} */
        var lo = this.LabelOptions;
        if (lo == null && this._tooltip) {
            lo = this._tooltip.DefaultLabelStyle;
        }
        if (lo == null) {
            lo = this._defaultOptions;
        }
        ctx.strokeStyle = lo.strokeColor;
        ctx.font = lo.fontSize + "px " + lo.fontFamily;
        ctx.textAlign = 'center';
        /** @type {?} */
        var strokeWeight = lo.strokeWeight;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, loc.x, loc.y);
        }
        ctx.fillStyle = lo.fontColor;
        ctx.fillText(text, loc.x, loc.y);
    };
    /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ManageTooltip = /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    function (show) {
        var _this = this;
        if (show && this._canvas) {
            // add tooltip subscriptions
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
            this._tooltipSubscriptions.push(this.PolygonMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOver.asObservable().subscribe(function (e) {
                if (e.Polygon.Title && e.Polygon.Title.length > 0) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polygon.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOut.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    _this._tooltip.Set('hidden', true);
                    _this._tooltipVisible = false;
                }
            }));
        }
        else {
            // remove tooltip subscriptions
            this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            this._tooltipSubscriptions.splice(0);
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
        }
    };
    /**
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * \@method
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.UpdatePolygons = /**
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            /** @type {?} */
            var polygons = _this._streaming ? _this._polygonsLast.splice(0) : _this._polygons;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            /** @type {?} */
            var lp = _this._service.CreatePolygons(l.GetOptions().id, polygons);
            // set markers once promises are fullfilled.
            lp.then(function (p) {
                p.forEach(function (poly) {
                    if (poly.Title != null && poly.Title.length > 0) {
                        _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                    }
                    _this.AddEventListeners(poly);
                });
                _this._streaming ? l.AddEntities(p) : l.SetEntities(p);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolygonLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polygon-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolygonLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolygonLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolygonOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolygonOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolygonClick: [{ type: Output }],
        PolygonDblClick: [{ type: Output }],
        PolygonMouseMove: [{ type: Output }],
        PolygonMouseOut: [{ type: Output }],
        PolygonMouseOver: [{ type: Output }]
    };
    return MapPolygonLayerDirective;
}());
export { MapPolygonLayerDirective };
if (false) {
    /** @type {?} */
    MapPolygonLayerDirective.prototype._id;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._service;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygons;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygonsLast;
    /**
     * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polygon labels.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polygon titles as the labels on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polygosn as the tooltips on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseMove;
    /**
     * This event is fired on mouseout on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOut;
    /**
     * This event is fired on mouseover on a polygon in a layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOver;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24tbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBb0QsTUFBTSxFQUV6RSxNQUFNLGVBQWUsQ0FBQztBQVN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBU3JELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNExsQixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxrQ0FDWSxlQUNBLGFBQ0E7UUFGQSxrQkFBYSxHQUFiLGFBQWE7UUFDYixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzt1QkFuS3dDLElBQUksS0FBSyxFQUFrQztxQ0FFL0MsSUFBSSxLQUFLLEVBQWdCOytCQUMzQyxLQUFLOytCQUNDO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLFlBQVk7WUFDeEIsWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsU0FBUztTQUN2QjswQkFDNkIsS0FBSzt5QkFDUyxJQUFJLEtBQUssRUFBbUI7NkJBQ3hCLElBQUksS0FBSyxFQUFtQjs7Ozs7NEJBTXJDLE1BQU0sQ0FBQyxnQkFBZ0I7Ozs7OzRCQU12QixDQUFDLENBQUM7Ozs7OzsyQkFjSCxJQUFJOzs7Ozs7MEJBd0JKLEtBQUs7Ozs7Ozs0QkFPSCxJQUFJOzs7Ozs7c0JBd0JYLENBQUM7Ozs7Ozs0QkFXMkIsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7K0JBT3JD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QVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQUU7YUFDL0QsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Z0JBL1pWLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO2lCQUNsQzs7OztnQkF2Q1EsWUFBWTtnQkFDWixVQUFVO2dCQVppRCxNQUFNOzs7K0JBK0VyRSxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzs4QkFPTCxLQUFLO2lDQU9MLEtBQUs7NkJBaUJMLEtBQUs7K0JBT0wsS0FBSztpREFRTCxLQUFLOzBCQVNMLEtBQUs7eUJBT0wsS0FBSzsrQkFXTCxNQUFNO2tDQU9OLE1BQU07bUNBT04sTUFBTTtrQ0FPTixNQUFNO21DQU9OLE1BQU07O21DQW5NWDs7U0FxRGEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgU2ltcGxlQ2hhbmdlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyxcclxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsXHJcbiAgICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XHJcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XHJcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XHJcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcclxuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XHJcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9tb2RlbHMvcG9seWdvbic7XHJcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbW9kZWxzL21hcC1sYWJlbCc7XHJcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xyXG5cclxuLyoqXHJcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgcG9seWdvbnMuXHJcbiAqL1xyXG5sZXQgbGF5ZXJJZCA9IDEwMDAwMDA7XHJcblxyXG4vKipcclxuICogTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlIHBlcmZvcm1hbnRseSByZW5kZXJzIGEgbGFyZ2Ugc2V0IG9mIHBvbHlnb25zIG9uIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcclxuICogICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgfVxyXG4gKiBgXSxcclxuICogdGVtcGxhdGU6IGBcclxuICogICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDx4LW1hcC1wb2x5Z29uLWxheWVyIFtQb2x5Z29uT3B0aW9uc109XCJfcG9seWdvbnNcIj48L3gtbWFwLXBvbHlnb24tbGF5ZXI+XHJcbiAqICAgPC94LW1hcD5cclxuICogYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICpcclxuICogQGV4cG9ydFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ3gtbWFwLXBvbHlnb24tbGF5ZXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sYXllclByb21pc2U6IFByb21pc2U8TGF5ZXI+O1xyXG4gICAgcHJpdmF0ZSBfc2VydmljZTogTGF5ZXJTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfY2FudmFzOiBDYW52YXNPdmVybGF5O1xyXG4gICAgcHJpdmF0ZSBfbGFiZWxzOiBBcnJheTx7bG9jOiBJTGF0TG9uZywgdGl0bGU6IHN0cmluZ30+ID0gbmV3IEFycmF5PHtsb2M6IElMYXRMb25nLCB0aXRsZTogc3RyaW5nfT4oKTtcclxuICAgIHByaXZhdGUgX3Rvb2x0aXA6IE1hcExhYmVsO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFN1YnNjcmlwdGlvbnM6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBuZXcgQXJyYXk8U3Vic2NyaXB0aW9uPigpO1xyXG4gICAgcHJpdmF0ZSBfdG9vbHRpcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBJTGFiZWxPcHRpb25zID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAxMSxcclxuICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZm9udENvbG9yOiAnI2ZmZmZmZidcclxuICAgIH07XHJcbiAgICBwcml2YXRlIF9zdHJlYW1pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3BvbHlnb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+ID0gbmV3IEFycmF5PElQb2x5Z29uT3B0aW9ucz4oKTtcclxuICAgIHByaXZhdGUgX3BvbHlnb25zTGFzdDogQXJyYXk8SVBvbHlnb25PcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWdvbk9wdGlvbnM+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJlbHMgYXJlIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNYXhab29tOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5Z29uIGxhYmVscyBhcmUgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1pblpvb206IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VwY2lmaWVzIHN0eWxlaW5nIG9wdGlvbnMgZm9yIG9uLW1hcCBwb2x5Z29uIGxhYmVscy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE9wdGlvbnM6IElMYWJlbE9wdGlvbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIG9yIHNldHMgQW4gb2Zmc2V0IGFwcGxpZWQgdG8gdGhlIHBvc2l0aW9uaW5nIG9mIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXllck9mZnNldDogSVBvaW50ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IG9mIHBvbHlnb24gb3B0aW9ucyByZXByZXNlbnRpbmcgdGhlIHBvbHlnb25zIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICAgICAgcHVibGljIGdldCBQb2x5Z29uT3B0aW9ucygpOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+IHsgcmV0dXJuIHRoaXMuX3BvbHlnb25zOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBQb2x5Z29uT3B0aW9ucyh2YWw6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cmVhbWluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbnNMYXN0LnB1c2goLi4udmFsLnNsaWNlKDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLnB1c2goLi4udmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zID0gdmFsLnNsaWNlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBwb2x5Z29uIHRpdGxlcyBhcyB0aGUgbGFiZWxzIG9uIHRoZSBwb2x5Z29ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93TGFiZWxzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHRpdGxlcyBvZiB0aGUgcG9seWdvc24gYXMgdGhlIHRvb2x0aXBzIG9uIHRoZSBwb2x5Z29ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93VG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB3aGV0aGVyIHRvIHRyZWF0IGNoYW5nZXMgaW4gdGhlIFBvbHlnb25PcHRpb25zIGFzIHN0cmVhbXMgb2YgbmV3IG1hcmtlcnMuIEluIHRoaXMgbW9kZSwgY2hhbmdpbmcgdGhlXHJcbiAgICAgKiBBcnJheSBzdXBwbGllZCBpbiBQb2x5Z29uT3B0aW9ucyB3aWxsIGJlIGluY3JlbWVudGFsbHkgZHJhd24gb24gdGhlIG1hcCBhcyBvcHBvc2VkIHRvIHJlcGxhY2UgdGhlIHBvbHlnb25zIG9uIHRoZSBtYXAuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVHJlYXROZXdQb2x5Z29uT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XHJcbiAgICAgICAgcHVibGljIHNldCBUcmVhdE5ld1BvbHlnb25PcHRpb25zQXNTdHJlYW0odmFsOiBib29sZWFuKSB7IHRoaXMuX3N0cmVhbWluZyA9IHZhbDsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWFya2VyIGxheWVyXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIERlbGVnYXRlc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIGEgcG9seWdvbiBpbiB0aGUgbGF5ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIFBvbHlnb25DbGljazogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gYSBwb2x5Z29uIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5Z29uRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiBhIHBvbHlnb24gaW4gdGhlIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlnb25Nb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gbW91c2VvdXQgb24gYSBwb2x5Z29uIGluIHRoZSBsYXllci5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBQb2x5Z29uTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gbW91c2VvdmVyIG9uIGEgcG9seWdvbiBpbiBhIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIFBvbHlnb25Nb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcclxuXHJcblxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgbWFya2VyIGxheWVyLlxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlLlxyXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBNYXBTZXJ2aWNlfS5cclxuICAgICAqIEBwYXJhbSBfem9uZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBOZ1pvbmV9IHNlcnZpY2UuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBsYXllcklkKys7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBsYXllck9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgSWQgOiB0aGlzLl9pZCxcclxuICAgICAgICAgICAgICAgIFZpc2libGU6IHRoaXMuVmlzaWJsZSxcclxuICAgICAgICAgICAgICAgIExheWVyT2Zmc2V0OiB0aGlzLkxheWVyT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgWkluZGV4OiB0aGlzLlpJbmRleFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XHJcblxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUNhbnZhc092ZXJsYXkoZWwgPT4gdGhpcy5EcmF3TGFiZWxzKGVsKSlcclxuICAgICAgICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzWzBdLlNldFZpc2libGUodGhpcy5WaXNpYmxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcyA9IHZhbHVlc1sxXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5fY2FudmFzUmVhZHkudGhlbihiID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5fY2FudmFzLkdldFRvb2xUaXBPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKHRoaXMuU2hvd1Rvb2x0aXBzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUG9seWdvbk9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuVXBkYXRlUG9seWdvbnMoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xyXG4gICAgICAgICAgICBsLkRlbGV0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLkRlbGV0ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdHMgdG8gY2hhbmdlcyBpbiBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudCBhbmQgYWN0dWF0ZXMgcHJvcGVydHkgY2hhbmdlcyBpbiB0aGUgdW5kZXJsaW5nIGxheWVyIG1vZGVsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydQb2x5Z29uT3B0aW9ucyddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVQb2x5Z29ucygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSAmJiAhY2hhbmdlc1snVmlzaWJsZSddLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1pJbmRleCddICYmICFjaGFuZ2VzWydaSW5kZXgnXS5maXJzdENoYW5nZSkgfHxcclxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10gJiYgIWNoYW5nZXNbJ0xheWVyT2Zmc2V0J10uZmlyc3RDaGFuZ2UpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIFpJbmRleCBvciBMYXllck9mZnNldCBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gY3JlYXRlZC4nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY2hhbmdlc1snU2hvd0xhYmVscyddICYmICFjaGFuZ2VzWydTaG93TGFiZWxzJ10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYWJlbE1pblpvb20nXSAmJiAhY2hhbmdlc1snTGFiZWxNaW5ab29tJ10uZmlyc3RDaGFuZ2UpIHx8XHJcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYWJlbE1heFpvb20nXSAmJiAhY2hhbmdlc1snTGFiZWxNYXhab29tJ10uZmlyc3RDaGFuZ2UpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5SZWRyYXcodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dUb29sdGlwcyddICYmIHRoaXMuX3Rvb2x0aXApIHtcclxuICAgICAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKGNoYW5nZXNbJ1Nob3dUb29sdGlwcyddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2J0YWlucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTWFya2VyIElkLlxyXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hcmtlciBpZC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwUG9seWdvbkxheWVyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBtYXJrZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHAgLSB0aGUgcG9seWdvbiBmb3Igd2hpY2ggdG8gYWRkIHRoZSBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWRkRXZlbnRMaXN0ZW5lcnMocDogUG9seWdvbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5Z29uQ2xpY2suZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWdvbkRibENsaWNrLmVtaXQoe1BvbHlnb246IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5Z29uTW91c2VNb3ZlLmVtaXQoe1BvbHlnb246IHAsIENsaWNrOiBldn0pIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25Nb3VzZU91dC5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWdvbk1vdXNlT3Zlci5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHAuQWRkTGlzdGVuZXIob2JqLm5hbWUsIG9iai5oYW5kbGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgcG9seWdvbiBsYWJlbHMuIENhbGxlZCBieSB0aGUgQ2FudmFzIG92ZXJsYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsIC0gVGhlIGNhbnZhcyBvbiB3aGljaCB0byBkcmF3IHRoZSBsYWJlbHMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRHJhd0xhYmVscyhlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5TaG93TGFiZWxzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Wm9vbSgpLnRoZW4oeiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYWJlbE1pblpvb20gPD0geiAmJiB0aGlzLkxhYmVsTWF4Wm9vbSA+PSB6KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBlbC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IHRoaXMuX2xhYmVscy5tYXAoeCA9PiB4LnRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uc1RvUG9pbnRzKHRoaXMuX2xhYmVscy5tYXAoeCA9PiB4LmxvYykpLnRoZW4obG9jcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemU6IElTaXplID0gdGhpcy5fbWFwU2VydmljZS5NYXBTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbG9jcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZHJhdyB0aGUgcG9pbnQgaWYgaXQgaXMgbm90IGluIHZpZXcuIFRoaXMgZ3JlYXRseSBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aGVuIHpvb21lZCBpbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NzW2ldLnggPj0gMCAmJiBsb2NzW2ldLnkgPj0gMCAmJiBsb2NzW2ldLnggPD0gc2l6ZS53aWR0aCAmJiBsb2NzW2ldLnkgPD0gc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRyYXdUZXh0KGN0eCwgbG9jc1tpXSwgbGFiZWxzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgdGV4dCBhdCB0aGUgYXBwcm9wcmlhdGUgcGxhY2Ugb24gdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjdHggLSBDYW52YXMgZHJhd2luZyBjb250ZXh0LlxyXG4gICAgICogQHBhcmFtIGxvYyAtIFBpeGVsIGxvY2F0aW9uIG9uIHRoZSBjYW52YXMgd2hlcmUgdG8gY2VudGVyIHRoZSB0ZXh0LlxyXG4gICAgICogQHBhcmFtIHRleHQgLSBUZXh0IHRvIGRyYXcuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRHJhd1RleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGxvYzogSVBvaW50LCB0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbG86IElMYWJlbE9wdGlvbnMgPSB0aGlzLkxhYmVsT3B0aW9ucztcclxuICAgICAgICBpZiAobG8gPT0gbnVsbCAmJiB0aGlzLl90b29sdGlwKSB7IGxvID0gdGhpcy5fdG9vbHRpcC5EZWZhdWx0TGFiZWxTdHlsZTsgfVxyXG4gICAgICAgIGlmIChsbyA9PSBudWxsKSB7IGxvID0gdGhpcy5fZGVmYXVsdE9wdGlvbnM7IH1cclxuXHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbG8uc3Ryb2tlQ29sb3I7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBgJHtsby5mb250U2l6ZX1weCAke2xvLmZvbnRGYW1pbHl9YDtcclxuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgY29uc3Qgc3Ryb2tlV2VpZ2h0OiBudW1iZXIgPSBsby5zdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRleHQgJiYgc3Ryb2tlV2VpZ2h0ICYmIHN0cm9rZVdlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gbG8uZm9udENvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFuYWdlcyB0aGUgdG9vbHRpcCBhbmQgdGhlIGF0dGFjaG1lbnQgb2YgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzaG93IC0gVHJ1ZSB0byBlbmFibGUgdGhlIHRvb2x0aXAsIGZhbHNlIHRvIGRpc2FibGUuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcChzaG93OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNob3cgJiYgdGhpcy5fY2FudmFzKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0b29sdGlwIHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWdvbk1vdXNlTW92ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2M6IElMYXRMb25nID0gdGhpcy5fY2FudmFzLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGUuQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlnb25Nb3VzZU92ZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuUG9seWdvbi5UaXRsZSAmJiBlLlBvbHlnb24uVGl0bGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLl9jYW52YXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZS5DbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3RleHQnLCBlLlBvbHlnb24uVGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5Z29uTW91c2VPdXQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0b29sdGlwIHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnNwbGljZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgb3IgdXBkYXRlcyB0aGUgcG9seWdvbnMgYmFzZWQgb24gdGhlIHBvbHlnb24gb3B0aW9ucy4gVGhpcyB3aWxsIHBsYWNlIHRoZSBwb2x5Z29ucyBvbiB0aGUgbWFwXHJcbiAgICAgKiBhbmQgcmVnaXN0ZXIgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBVcGRhdGVQb2x5Z29ucygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbGF5ZXJQcm9taXNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9seWdvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4gPSB0aGlzLl9zdHJlYW1pbmcgPyB0aGlzLl9wb2x5Z29uc0xhc3Quc3BsaWNlKDApIDogdGhpcy5fcG9seWdvbnM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3RyZWFtaW5nKSB7IHRoaXMuX2xhYmVscy5zcGxpY2UoMCk7IH1cclxuXHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgbWFya2Vyc1xyXG4gICAgICAgICAgICBjb25zdCBscDogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4gPSB0aGlzLl9zZXJ2aWNlLkNyZWF0ZVBvbHlnb25zKGwuR2V0T3B0aW9ucygpLmlkLCBwb2x5Z29ucyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgbWFya2VycyBvbmNlIHByb21pc2VzIGFyZSBmdWxsZmlsbGVkLlxyXG4gICAgICAgICAgICBscC50aGVuKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgcC5mb3JFYWNoKHBvbHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2x5LlRpdGxlICE9IG51bGwgJiYgcG9seS5UaXRsZS5sZW5ndGggPiAwKSB7IHRoaXMuX2xhYmVscy5wdXNoKHtsb2M6IHBvbHkuQ2VudHJvaWQsIHRpdGxlOiBwb2x5LlRpdGxlfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKHBvbHkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJlYW1pbmcgPyBsLkFkZEVudGl0aWVzKHApIDogbC5TZXRFbnRpdGllcyhwKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLlJlZHJhdyghdGhpcy5fc3RyZWFtaW5nKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19