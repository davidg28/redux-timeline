export const SET_TIMELINE_DATA = 'SET_TIMELINE_DATA'

export const setTimelineData = (timeline) => {
    return {
        type: SET_TIMELINE_DATA,
        timeline: timeline
    }
}