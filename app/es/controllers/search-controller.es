import {SelectedStations} from "../models/selected-stations.es";
import {SearchView} from "../views/search.es";
import {MapView} from "../views/map.es";

/** Simple controller for displaying search/filter results */
export class SearchController {
  constructor() {
    this.models = {
      selected: new SelectedStations()
    };

    this.views = {
      searchView: new SearchView( this.models.selected ),
      mapView: new MapView()
    };
  }
}
