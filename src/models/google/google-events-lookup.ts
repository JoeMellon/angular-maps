import { IMapEventLookup } from '../../interfaces/imap-event-lookup';

/**
 * This contstant translates the abstract map events into their corresponding google map
 * equivalents.
 */
export const GoogleMapEventsLookup: IMapEventLookup = {
    click :             'click',
    dblclick :          'dblclick',
    rightclick :        'rightclick',
    resize :            'resize',
    boundschanged :     'bounds_changed',
    centerchanged :     'center_changed',
    zoomchanged :       'zoom_changed',
    mouseover:          'mouseover',
    mouseout :          'mouseout',
    mousemove :         'mousemove',
    infowindowclose:    'closeclick'
};
