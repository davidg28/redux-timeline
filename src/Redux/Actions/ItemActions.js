export const SET_ITEMS_DATA = 'SET_ITEMS_DATA'

export const setItemsData = (items) => {
    return {
        type: SET_ITEMS_DATA,
        items: items
    }
}