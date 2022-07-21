import { useEffect } from "react";
import "./App.css";

import { photos } from "./data";

import Gallery from "./component/Gallery";

import { SortableContainer } from "react-sortable-hoc";
import { compareObjects, swapElement, updatePosition } from "./utils/appUtils";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useFetch from "./hooks/useFetch";

function App() {

  const {data, isPending, error} = useFetch('/userData');

  useEffect(() => {
    
    // Cleanup function to clear the timeout interval
    return () => {
      clearInterval(intervalId);
    }
  })

  /**
   * Below state will hold the list of photos
   */
  const [items, setItems] = useLocalStorage("data", photos);

  /**
  * Below function will run in every 5 seconds
  * and save the data to localStorage only if the
  * data is changed
  */
  const intervalId = setInterval(() => {
    const lsData = JSON.parse(localStorage.getItem('data'));
    if (!compareObjects(items, lsData)) {
      // Update the localstorage
    }
  }, 5000);

  /**
   * Return the gallery component wrapped under the sortable container
   */
  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery items={items} />
  ));

  /**
   * This method will rearrage the items after changing the photos order 
   */
  const onChangeOrder = ({ oldIndex, newIndex }) =>
    setItems(swapElement(items, oldIndex, newIndex), updatePosition(items, oldIndex, newIndex));

  return (
    <div className="App">
      <h1>Sortable gallery</h1>
      <div className="sortable-gallery">
        {isPending ? "Loading..." :
          <div className="serv">
            <SortableGallery items={items} onSortEnd={onChangeOrder} axis={"xy"} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
