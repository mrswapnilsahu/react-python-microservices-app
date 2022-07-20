import { useState } from "react";
import "./App.css";

import { photos } from "./data";

import Gallery from "./component/Gallery";

import { SortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

function App() {

  /**
   * Below state will hold the list of photos
   */
  const [items, setItems] = useState(photos);

  /**
   * Return the gallery component wrapped under the sortable container
   */
  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery items={items} />
  ));

  /**
   * This method will rearrage the items after changing the photos order 
   */
  const onChangeOrder = ({ from, to }) =>
    setItems(arrayMoveImmutable(items, from, to));

  return (
    <div className="App">
      <h1>Sortable gallery</h1>
      <div className="sortable-gallery">
        <div className="serv">
          <SortableGallery items={items} onSortEnd={onChangeOrder} axis={"xy"} />
        </div>
      </div>
    </div>
  );
}

export default App;
