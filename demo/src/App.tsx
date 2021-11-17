import React from 'react';
import { Container, Grid} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {IconModal} from "./components/modal/IconModal";
import {AllIcons} from "./generated/AllIcons";

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        color: palette.primary.main
    }
}));
export const App = () => {
    const classes = getClasses();
    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={2} className={classes.root}>
                <AllIcons />
            </Grid>
           <IconModal />
        </Container>
    )
};
