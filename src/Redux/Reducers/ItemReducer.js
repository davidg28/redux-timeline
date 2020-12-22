import { SET_ITEMS_DATA } from "../Actions/ItemActions";
const initState = []

export default function ItemsReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_ITEMS_DATA:
            return actions.items
        default:
            return state
    }
}