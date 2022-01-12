import React from 'react';
import {ViewContainer} from "@milkscout/react";
import {Tag} from "./components/Tag";
import {Grid} from "@material-ui/core";
import {MdiIcon} from "./MdiIcon";
import { TAG_ARRAY_MAP } from './generated/iconMap';
import { TAG_VALUES } from './generated/iconMap';
import {makeStyles, Theme} from "@material-ui/core/styles";
import { useStore } from '@nanostores/react';
import {searchStore } from './store/searchStore';

const getClasses = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        paddingLeft: 15,
        paddingRight: 15
    }
}));

export const GroupView = () => {
    const classes = getClasses();
    const searchResult = useStore(searchStore)
    return ( <ViewContainer show={searchResult.status === 'NONE'}>
      {TAG_VALUES.filter(tag => !!TAG_ARRAY_MAP[tag]).map((tag) => {
          return <div key={'tag-' + tag}>
              <Tag name={tag}/>
              <div style={{height: 30}}/>
              <Grid container spacing={3} className={classes.root}>
                  {TAG_ARRAY_MAP[tag].map((icon) => <React.Fragment key={icon.id}>
                      <MdiIcon icon={icon} />
                  </React.Fragment>)}
              </Grid>
              <div id={tag} style={{height: 70}}/>
          </div>
      })}
  </ViewContainer>);
};
