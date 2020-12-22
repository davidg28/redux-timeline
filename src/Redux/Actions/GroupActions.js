export const SET_GROUP_DATA = 'SET_GROUP_DATA'

export const setGroupsData = (groups) => {
    return {
        type: SET_GROUP_DATA,
        groups: groups
    }
}