import { BingMarker } from './bing-marker';
import { SpiderClusterMarker } from '../spider-cluster-marker';
export declare class BingSpiderClusterMarker extends BingMarker implements SpiderClusterMarker {
    /** The parent pushpin in which the spider pushpin is derived from. */
    ParentMarker: BingMarker;
    /** The stick that connects the spider pushpin to the cluster. */
    Stick: Microsoft.Maps.Polyline;
}
