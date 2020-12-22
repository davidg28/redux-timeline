import React from 'react';
import { Card, CardHeader, CardActions, Avatar, IconButton, Grid, CardMedia } from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { getGroups, getTimeline, getFirebaseGroupsData } from "../Options";

//ID SHOULD BE GREATER THAN ZERO FOR EACH GROUP
export default function GroupTemplate({ group }) {
    const { content, id } = group
    const groups = getGroups()
    const timeline = getTimeline()
    const userData = JSON.parse(content)
    // console.log("Group", content)

    const showGroup = () => {

        groups.forEach(element => {
            if (element.id === id) {
                groups.remove(element.id)

                let new_element = element
                new_element.id = element.id.replace('±', '')
                groups.add(element);


                timeline.setGroups(groups);
            }
        });
    }
    const hideGroup = () => {

        groups.forEach(element => {

            if (element.id === id) {
                groups.remove(element.id);

                let new_element = element
                new_element.id += '±'
                groups.add(new_element);

                timeline.setGroups(groups);

            }
        });
    }
    const removeGroup = () => {
        groups.remove(id);
    }
    return (
        <Grid container lg="12" xs="12">
            <Grid lg="12" xs="12">
                <CardMedia
                    style={{ width: 'auto', height: 200 }}
                    image={userData['imageURL']}
                    title="Live from space album cover"
                />
                <Grid lg="12" style={{ maxWidth: 300, backgroundColor: 'rgb(47,49,47)', color: 'white', border: 'none' }}>
                    <CardHeader
                        title={userData['username']}
                    />

                    <CardActions>
                        <IconButton onClick={() => removeGroup()}>
                            <DeleteIcon style={{ color: 'red' }} />
                        </IconButton>
                        <IconButton onClick={() => showGroup()}>
                            <VisibilityIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton onClick={() => hideGroup()}>
                            <VisibilityOffIcon style={{ color: 'white' }} />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Grid>
    )
}
