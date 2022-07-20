
/**
 * Moves the item to a new position in the new array
 * @param {*} items The array with the item to move
 * @param {*} from The index of item to move
 * @param {*} to The index of where to move the item
 * @returns 
 */
 export const swapElement = (items, from, to) => {
    const b = items[from];
    items[from] = items[to];
    items[from] = b;
    console.log(items)
    return items;
}