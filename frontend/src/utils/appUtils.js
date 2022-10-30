/**
 * Moves the item to a new position in the new array
 * @param {*} items The array with the item to move
 * @param {*} from The index of item to move
 * @param {*} to The index of where to move the item
 * @returns items
 */
 export const swapElement = (items, from, to) => {
  const temp = items[from];
  items[from] = items[to];
  items[to] = temp;
  return items;
};

/**
 * Change the item position to a new position
 * @param {*} items The array with the items
 * @param {*} fromPosition The index of the item you want to change the position
 * @param {*} toPosition The index of the item you want to change the position too
 * @returns items
 */
export const updatePosition = (items, fromPosition, toPosition) => {
  const temp = { ...items[fromPosition] };
  items[fromPosition].position = items[toPosition].position;
  items[toPosition].position = temp.position;
  return items;
};

/**
 * Compare two objects and return boolean
 * @param {*} obj1 object you want to compare
 * @param {*} obj2 object you want to compare with
 * @returns {boolean} true if the objects are not equal
 */
export const compareObjects = (obj1, obj2) => {
  if (obj1 && obj1.length && obj2 && obj2.length) {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
  }
  return;
};

/**
 * Async function to post data
 * @param {string} url url you want to send request to
 * @param {object} data object you want to send with the req
 * @param {string} method by default it will be POST  
 * @returns {JSON} object with response from the server
 */
export async function postData(url = "", data = {}, method = "POST") {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

/**
 * Below function will return current time in hours and minutes
 *  @returns {string} current time string
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};
