
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

export const updatePosition = () => {
    
}