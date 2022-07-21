
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
}

/**
 * Change the item position to a new position
 * @param {*} items The array with the items
 * @param {*} fromPosition The index of the item you want to change the position
 * @param {*} toPosition The index of the item you want to change the position too
 * @returns items
 */
export const updatePosition = (items, fromPosition, toPosition) => {
    const temp = {...items[fromPosition]};
    items[fromPosition].position = items[toPosition].position;
    items[toPosition].position = temp.position;
    return items;
}