import { useEffect, useState } from "react";
import "./App.css";

import { Gallery, Modal, Toast } from "./components";
import { useFetch, useInterval } from "./hooks";

import { SortableContainer } from "react-sortable-hoc";
import {
  compareObjects,
  swapElement,
  updatePosition,
  postData,
  getCurrentTime,
} from "./utils/appUtils";

function App() {
  // Fetching the data from REST API
  const { data, isPending } = useFetch("/api/entries");

  // Below state will hold the data
  const [items, setItems] = useState([]);

  // Below state will hold initial data
  const [initialData, setInitialData] = useState([]);

  /**
   * Below state will hold the selected photo for modal
   */
  const [selectedImage, setSelectedImage] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const [lastSaved, setLastSaved] = useState("");

  /**
   * Variable to store setTimeout ID so, that we can
   * clear it at the time of unmounting
   */
  let toastTimeoutId = null;

  useEffect(() => {
    setItems(structuredClone(data));
    setInitialData(data);
    setLastSaved(getCurrentTime);
    // Cleanup function to clear the timeout interval
    return () => {
      // clearInterval(intervalId);
      clearTimeout(toastTimeoutId);
    };
  }, [data]);

  /**
   * Below function will hide the toast in 2s
   * and update the last saved time
   */
  const hideToast = () => {
    toastTimeoutId = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(getCurrentTime);
    }, 2000);
  };

  /**
   * Below function will run in every 5 seconds
   * and send request to setData REST API with the
   * updated data only if the data is changed
   */
  useInterval(() => {
    if(items && initialData) {

      /* if both the data i.e, local storage data and
      state data are not equal then it will send the request 
      to the API
      */
     if (compareObjects(items, initialData)) {
        setIsSaving(true);
        setInitialData(structuredClone(items));
        postData("/api/update", items, "PUT").then((data) => {
          if (data.status === "Success") {
            hideToast();
          }
        });
      }
    }
  }, 5000);

  /**
   * Return the gallery component wrapped under the sortable container
   */
  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery items={items} setSelectedImage={setSelectedImage} />
  ));

  /**
   * This method will rearrange the items after changing the photos order
   */
  const onChangeOrder = ({ oldIndex, newIndex }) =>
    setItems(
      swapElement(items, oldIndex, newIndex),
      updatePosition(items, oldIndex, newIndex)
    );

  return (
    <div className="App">
      <h1>Sortable gallery</h1>
      <div className="sortable-gallery">
        {isPending ? (
          "Loading..."
        ) : (
          <div className="gallery-container">
            <SortableGallery
              pressDelay={100}
              items={items}
              onSortEnd={onChangeOrder}
              axis={"xy"}
            />
          </div>
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
        {isSaving && <Toast toastMsg="Saving..." lastSaved={lastSaved} />}
      </div>
    </div>
  );
}

export default App;
