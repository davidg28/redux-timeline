import { SET_TIMELINE_DATA } from "../Actions/TimelineActions";

const initState = {}

export default function TimelineReducer(state = initState, actions) {
    switch (actions.type) {
        case SET_TIMELINE_DATA:
            return actions.timeline
        default:
            return state
    }
}