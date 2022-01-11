import React, {useCallback, useEffect} from 'react';
import {ViewContainer} from "@milkscout/react";
import {Container, Grid, InputAdornment, InputBase} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {IconModal} from "./components/modal/IconModal";
import tagsMap from "./generated/tagsMap.json"
import {ICON_MAP, TAG_VALUES} from "./generated/iconMap"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Tag} from "./components/Tag";
import {openUrlInNewTab, useDebounceFunction, useMountedState} from "@milkscout/react";
import {searchIndex} from "./search/search";
import {MagnifyIcon} from "@material-ui-extra/icons/MagnifyIcon";
import {CloseIcon} from "@material-ui-extra/icons/CloseIcon";
import IconButton from "@material-ui/core/IconButton";

const getClasses = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        paddingLeft: 15,
        paddingRight: 15
    },
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
export const App = () => {
    const classes = getClasses();
    const [searchValue, setSearchValue] = useMountedState<string>('')
    const [searchResult, setSearchResult] = useMountedState<Array<{ ref: string, score: number }> | undefined>(undefined)

    const triggerSearch = useDebounceFunction(useCallback(() => {
        const result = searchIndex.search(searchValue);
        setSearchResult(result)
    }, [searchValue, setSearchResult]))

    useEffect(() => {
        if (!!searchValue) {
            triggerSearch();
        } else {
            setSearchResult(undefined)
        }
    }, [searchValue, triggerSearch, setSearchResult])
    return (<>
            <AppBar position="fixed">
                <Container maxWidth={"lg"}>
                    <Toolbar>
                        <Typography variant="h6" noWrap
                                    onClick={() => openUrlInNewTab('https://www.npmjs.com/package/@material-ui-extra/icons')}>
                            @material-ui-extra/icons
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <MagnifyIcon/>
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
                                            setSearchValue('');
                                            setSearchResult(undefined)
                                        }}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={searchValue} onChange={(evt) => {
                                setSearchValue(evt.target.value)
                            }}
                            />
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <div style={{height: 70}}/>
            <Container maxWidth={"lg"}>
                 <ViewContainer show={typeof searchResult !== 'undefined'} key={'search-result'}>
                    <Tag name={"Search result for '" + searchValue + "'"} addLink={false}/>
                    <div style={{height: 30}}/>
                    <Grid container spacing={3} className={classes.root}>
                        {(searchResult || []).map(({ref, score}) => <React.Fragment key={'search-icon-' + ref}>
                            {ICON_MAP[ref]}
                        </React.Fragment>)}
                    </Grid>
                    <div style={{height: 70}}/>
                </ViewContainer>

                <ViewContainer show={typeof searchResult === 'undefined'}> 
                    {TAG_VALUES.map((tag) => {
                    return <div key={'tag-' + tag}>
                        <Tag name={tag}/>
                        <div style={{height: 30}}/>
                        <Grid container spacing={3} className={classes.root}>
                            {tagsMap[tag].map((iconId) => <React.Fragment key={iconId}>
                                {ICON_MAP[iconId]}
                            </React.Fragment>)}
                        </Grid>
                        <div id={tag} style={{height: 70}}/>
                    </div>
                })}
                </ViewContainer>
                <IconModal/>
            </Container>
        </>
    )
};
