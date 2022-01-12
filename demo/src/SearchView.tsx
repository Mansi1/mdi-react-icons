import React, {useCallback, useEffect} from 'react';
import {Tag} from "./components/Tag";
import {CircularProgress, Grid} from "@material-ui/core";
import {MdiIcon} from "./MdiIcon";
import {useDebounceFunction, ViewContainer} from "@milkscout/react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useStore} from "@nanostores/react";
import {searchStore, searchTextStore} from "./store/searchStore";
import {searchIndex} from "./search/search";
import {ICON_MAP} from './generated/iconMap';

const getClasses = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        paddingLeft: 15,
        paddingRight: 15
    },
    loader: {
        marginTop: 30,
        textAlign: 'center'
    },
    loadingText: {
        marginTop: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: theme.palette.primary.main,
    }
}));

export const SearchView = () => {
    const classes = getClasses();
    const searchResult = useStore(searchStore)
    const searchValue = useStore(searchTextStore)

    const triggerSearch = useDebounceFunction(useCallback(() => {
        if(!!searchValue) {
            const result = searchIndex.search(searchValue, {
                fields: {
                    name: {boost: 2},
                    aliases: {boost: 2},
                    tags: {boost: 1},
                },
                expand: true,
            });
            searchStore.set({status: "DONE", search: searchValue, data: result})
        }else{
            searchStore.set({status: "NONE"})
        }
    }, [searchValue]), 500, useCallback(() => {
        if (searchStore.get().status !== "LOADING" && !!searchValue  ) {
            searchStore.set({status: "LOADING"})
        }
    }, [searchValue]))

    useEffect(() => {
            triggerSearch();
    }, [searchValue, triggerSearch])

    return (<>
        {searchResult.status === 'DONE' && (
            <div>
                <Tag name={"Search result for '" + searchResult.search + "'"} addLink={false}/>
                <div style={{height: 30}}/>
                <Grid container spacing={3} className={classes.root}>
                    {(searchResult.data || []).map(({ref}) => <React.Fragment key={'search-icon-' + ref}>
                        <MdiIcon icon={ICON_MAP[ref]}/>
                    </React.Fragment>)}
                </Grid>
                {searchResult.data.length === 0 && <div style={{textAlign: 'center'}}>
                    <div className={classes.loadingText}>
                        Sorry, no results ...
                        <div style={{fontSize: 80}}>:(</div>
                    </div>
                </div>}
                <div style={{height: 70}}/>
            </div>
        )}
        <ViewContainer show={searchResult.status === 'LOADING'} wrapperEl={<div className={classes.loader}/>}>
            <CircularProgress/>
            <div className={classes.loadingText}>Loading ...</div>
        </ViewContainer>
    </>);
};
