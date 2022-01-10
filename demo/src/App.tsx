import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {IconModal} from "./components/modal/IconModal";
import tagsMap from "./generated/tagsMap.json"
import {ICON_MAP, TAG_VALUES} from "./generated/iconMap"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Tag} from "./components/Tag";
import IconButton from "@material-ui/core/IconButton";
import NpmIcon from "@material-ui-extra/icons/NpmIcon";
import {openUrlInNewTab} from "@milkscout/react";

const getClasses = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        paddingLeft: 15,
        paddingRight: 15
    },
}));
export const App = () => {
    const classes = getClasses();
    return (<>
        <AppBar position="fixed">
            <Container maxWidth={"lg"}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    @material-ui-extra/icons
                </Typography>
                <IconButton size={"medium"} color="inherit" onClick={()=>openUrlInNewTab('https://www.npmjs.com/package/@material-ui-extra/icons')}>
                    <NpmIcon />
                </IconButton>
            </Toolbar></Container>
        </AppBar>
        <div style={{height: 70}}/>    
        <Container maxWidth={"lg"}>
            {TAG_VALUES.map((tag) => {
                return <div key={'tag-'+tag}>
                    <Tag name={tag} />
                    <div style={{height: 30}}/>
                    <Grid container spacing={3}  className={classes.root}>
                        {tagsMap[tag].map((iconId) => <React.Fragment key={iconId}>
                            {ICON_MAP[iconId]}
                        </React.Fragment>)}
                    </Grid>
                    <div id={tag} style={{height: 70}}/>
                </div>
            })}
            <IconModal/>
        </Container>
    </>
    )
};
