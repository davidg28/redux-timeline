import { combineReducers } from 'redux';
import UserDataReducer from "./UserDataReducer";
import GroupReducer from "./GroupReducer";
import ItemsReducer from "./ItemReducer";
import OptionsReducer from "./OptionsReducer";
import TimelineReducer from "./TimelineReducer";

export default combineReducers({
    UserData: UserDataReducer,
    Groups: GroupReducer,
    Items: ItemsReducer,
    Options: OptionsReducer,
    Timeline: TimelineReducer
})