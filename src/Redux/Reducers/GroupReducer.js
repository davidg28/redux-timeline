import { SET_GROUP_DATA } from "../Actions/GroupActions";

const initState = []

export default function GroupsReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_GROUP_DATA:
            return actions.groups
        default:
            return state
    }
}