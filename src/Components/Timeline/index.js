import React from 'react';
import ReactDOM from 'react-dom';
import { Timeline, DataSet } from "vis-timeline/standalone";

import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";


import GroupTemplate from "./Groups/GroupTemplate";
import ItemTemplate from "./Items/ItemTemplate";

import { setGroups, setItems, setTimeline, getTimeline, getGroups } from "./Options";
import TimelineSlider from "./YearSlider";

// import "../../Styles/Main.css";
import './Timeline.css';
// import "./Items/Item.css";
// class VisibleFrameTemplate extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <div style={{ backgroundColor: 'orange' }}>
//             id: {this.props.item.id}
//             <button onClick={() => { return console.log('aaaaaa') }}>aaaa</button>
//         </div>
//     }
// }


const fetchItems = (groupsData, itemsData) => {
    const timeline_items = new DataSet()
    groupsData.forEach(element => {
        const group_id = element['timeline_id']
        const items = itemsData[group_id]
        items.forEach(item => {
            // const start_date = Date.parse(item['start_date'] + ' ' + item['start_time'])
            // const end_date = Date.parse(item['end_date'] + ' ' + item['end_time'])
            const start_date = Date.parse(item['start_date'])
            const end_date = Date.parse(item['end_date'])
            if (start_date && end_date) {
                timeline_items.add({
                    id: item['id'],
                    group: group_id,
                    start: new Date(start_date),
                    // end: new Date(end_date),
                    content: JSON.stringify(item),
                    title: item['title'],
                    // limitSize: false,
                })
            }
        })
    })
    return timeline_items

    const items = new DataSet()
    const numberOfGroups = 2;
    const numberOfItems = 20;
    const itemsPerGroup = Math.round(numberOfItems / numberOfGroups);


    for (var truck = 0; truck <= numberOfGroups; truck++) {
        var date = new Date();
        for (var order = 0; order < itemsPerGroup; order++) {

            date.setHours(date.getHours() + 4 * (Math.random() < 0.2));

            var start = new Date(date);
            date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));

            var end = new Date(date);

            items.add({
                id: order + itemsPerGroup * truck,
                group: truck,
                start: start,
                end: end,
                content: "Order " + order,
                title: 'JOHN DOE'
            });

        }
    }
    return items
}
const fetchGroups = (groupsData) => {
    const groups = new DataSet()
    groupsData.forEach(element => {
        groups.add({
            order: element['timeline_id'],
            id: element['timeline_id'],
            content: JSON.stringify(element)
        })
    });
    return groups
}
const fetchOptions = (timeline) => {
    return {
        margin: {
            item: 10,
            axis: 10
        },
        groupHeightMode: 'auto',
        orientation: 'top',
        height: '82vh',
        editable: false,
        groupEditable: true,
        multiselect: false,
        moveable: true,
        zoomable: true,
        zoomFriction: 4,
        onInitialDrawComplete: () => {
            //     timeline.setItems(items)
            timeline.redraw()
        },
        template: function (item, element) {
            if (!item) { return }
            return ReactDOM.createPortal(ReactDOM.render(
                <ItemTemplate
                    item={item}
                // itemsData={itemsData}
                />,
                element), element, () => { timeline.redraw() });
        },

        groupTemplate: function (groups, element) {
            if (!groups || !groups.content) { return }
            return ReactDOM.createPortal(ReactDOM.render(
                <GroupTemplate
                    group={groups}
                // groupsData={groupsData}
                />,
                element),
                element);
        },

        // visibleFrameTemplate: function (item, element) {
        //     if (!item || !element) { return }
        //     if (element.className.indexOf('timeline-item-visible-frame') === -1) { return }
        //     return ReactDOM.createPortal( ReactDOM.render( <VisibleFrameTemplate item={item} />, element ), element );

        // },
    }
}


export default function App() {
    const groupsData = useSelector(state => state.Groups)
    const itemsData = useSelector(state => state.Items)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setLoading(true)
        const container = document.getElementById('visualization');
        const timeline = new Timeline(container);
        const options = fetchOptions(timeline)


        const groups = fetchGroups(groupsData)
        const items = fetchItems(groupsData, itemsData)
        timeline.setOptions(options)
        timeline.setGroups(groups)
        timeline.setItems(items)
       
        setTimeline(timeline)
        setGroups(groups)
        setItems(items)
        setLoading(false)
    }, [])

    return (
        <>
            {!isLoading && <TimelineSlider timeline={getTimeline()} groups={getGroups()} />}
            <Grid item lg="12" xs="12" id="visualization" style={{ marginLeft: '20px' }}> </Grid>
        </>
    )

};
