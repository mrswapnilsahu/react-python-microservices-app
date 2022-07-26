import { useEffect, useState } from "react";
import "./App.css";

import Gallery from "./components/Gallery";
import Modal from './components/Modal';
import Toast from './components/Toast';

import { SortableContainer } from "react-sortable-hoc";
import { compareObjects, swapElement, updatePosition, postData } from "./utils/appUtils";
import { useFetch } from "./hooks/useFetch";


function App() {

  // Fetching the data from REST API
  const { data, isPending } = useFetch('/getData');

  // Below state will hold the data
  const [items, setItems] = useState([]);

  /**
   * Below state will hold the selected photo for modal
   */
  const [selectedImage, setSelectedImage] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const [lastSaved, setLastSaved] = useState();

  /**
   * Variable to store setTimeout ID so, that we can
   * clear it at the time of unmounting 
   */ 
  let toastTimeoutId = null;

  useEffect(() => {
    setItems(data);
    setLastSaved(getCurrentTime);
    // Cleanup function to clear the timeout interval
    return () => {
      clearInterval(intervalId);
      clearTimeout(toastTimeoutId);
    }
  },[data])

  const hideToast = () => {
    toastTimeoutId = setTimeout(() => {
      setIsSaving(false);
    }, 2000)
  }

  /**
   * Below function will return current time in hours and minutes
   *  
   */
  const getCurrentTime = () => {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    return current;
  }

  /**
  * Below function will run in every 5 seconds
  * and send request to setData REST API with the 
  * updated data only if the data is changed
  */
  const intervalId = setInterval(() => {
    const savedData = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data'));
    /* if both the data i.e, local storage data and
     state data are not equal then it will send the request 
     to the API
    */
    if (compareObjects(items, savedData)) {
      setIsSaving(true);
      postData('/setData', items).then((data) => {
        if(data.status === 'Success') {
          hideToast();
          setLastSaved(getCurrentTime);
        }
      })
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
    setItems(swapElement(items, oldIndex, newIndex), updatePosition(items, oldIndex, newIndex));

  return (
    <div className="App">
      <h1>Sortable gallery</h1>
      <div className="sortable-gallery">
        {isPending ? "Loading..." :
          <div className="gallery-container">
            <SortableGallery pressDelay={100} items={items} onSortEnd={onChangeOrder} axis={"xy"} />
          </div>
        }
        {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
        {isSaving && <Toast toastMsg="Saving..." lastSaved={lastSaved}/>}
      </div>
    </div>
  );
}

export default App;
