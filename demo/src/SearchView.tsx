import React, {useCallback, useEffect} from 'react';
import {Tag} from "./components/Tag";
import {Grid} from "@material-ui/core";
import {MdiIcon} from "./MdiIcon";
import {useDebounceFunction, ViewContainer} from "@milkscout/react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useStore} from "@nanostores/react";
import {searchStore, searchTextStore} from "./store/searchStore";
import {searchIndex} from "./search/search";
import { ICON_MAP } from './generated/iconMap';

const getClasses = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        paddingLeft: 15,
        paddingRight: 15
    }
}));

export const SearchView = () => {
    const classes = getClasses();
    const searchResult = useStore(searchStore)
    const searchValue = useStore(searchTextStore)

    const triggerSearch = useDebounceFunction(useCallback(() => {
        const result = searchIndex.search(searchValue, {
            fields: {
                name: {boost: 2},
                aliases: {boost: 2},
                tags: {boost: 1},
            },
            expand: true,
        });
        searchStore.set({search: searchValue, data: result})
    }, [searchValue]), 500, useCallback(() => {
    }, []))

    useEffect(() => {
        if (!!searchValue) {
            triggerSearch();
        } else {
            searchStore.set(undefined)
        }
    }, [searchValue, triggerSearch])

    return (<ViewContainer show={typeof searchResult !== 'undefined'} key={'search-result'}>
      <Tag name={"Search result for '" + searchResult?.search + "'"} addLink={false}/>
      <div style={{height: 30}}/>
      <Grid container spacing={3} className={classes.root}>
          {(searchResult?.data || []).map(({ref}) => <React.Fragment key={'search-icon-' + ref}>
              <MdiIcon icon={ICON_MAP[ref]}/>
          </React.Fragment>)}
      </Grid>
      <div style={{height: 70}}/>
  </ViewContainer>);
};
