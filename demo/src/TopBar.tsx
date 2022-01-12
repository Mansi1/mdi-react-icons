import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Container, InputAdornment, InputBase} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {openUrlInNewTab} from "@milkscout/react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {SearchIcon} from "@material-ui-extra/icons/SearchIcon";
import {CloseIcon} from "@material-ui-extra/icons/CloseIcon";
import IconButton from "@material-ui/core/IconButton";
import {searchStore, searchTextStore} from "./store/searchStore";
import {useStore} from "@nanostores/react";

const getClasses = makeStyles((theme: Theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'rgba(255,255,255, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255, 0.25)',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        paddingRight: 5,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        paddingRight: 0,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const TopBar = () => {
    const classes = getClasses();
    const searchValue = useStore(searchTextStore)

    return (<AppBar position="fixed">
            <Container maxWidth={"lg"}>
                <Toolbar>
                    <Typography variant="h6" noWrap
                                onClick={() => openUrlInNewTab('https://www.npmjs.com/package/@material-ui-extra/icons')}>
                        @material-ui-extra/icons
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <div className={classes.searchIcon}>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <IconButton size={"small"} color={'inherit'} onClick={() => {
                                        searchTextStore.set('');
                                        searchStore.set({status: 'NONE'})
                                    }}>
                                        <CloseIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={searchValue} onChange={(evt) => {
                            searchTextStore.set(evt.target.value)
                        }}
                        />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
