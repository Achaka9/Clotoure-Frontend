import React from "react";

import { Card, CardContent, Checkbox, Grid, ListItemButton, ListItemText } from "@mui/material";





const ClothingList = ({items}) => {
    const itemList = items.length ? (
        items.map((item) => {
            return(
            <Grid key={item}>
                <Card style={{marginTop:10}}>
                {/* Remember, we set the local state of this todo item when the user submits the form in 
                AddTodo.js. All we need to do is return the todo list item {todo.content} */}
                <ListItemButton component="a" href="#simple-list">
                    <Checkbox style={{paddingLeft:0}} color="primary"/>
                    <ListItemText primary={item}/>
                </ListItemButton>
                </Card>
            </Grid>
            );
        })
        ) : (
        <br></br>
        );
    return (
        <div className="itemList" style={{ padding: "10px" }}>
            {itemList}
        </div>
    )
}

export default ClothingList;