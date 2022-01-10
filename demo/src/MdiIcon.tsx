import React from 'react';
import {Icon} from "./interfaces/Icon";
import {Grid, Tooltip} from "@material-ui/core";

import {makeStyles, Theme} from '@material-ui/core/styles';
import {joinClasses} from "@milkscout/react";
import {iconStore} from "./store/iconStore";

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        '& svg': {
            fontSize: '90px !important',
        },
    },
    community: {
        color: '#ff814a'
    },
    arrow: {
        color: palette.common.black,
    },
    tooltip: {
        fontSize: 14,
        backgroundColor: palette.common.black,
    },
}));

export interface MdiIconProps {
    icon: Icon
}

export const MdiIcon = React.memo(({icon}: MdiIconProps) => {
    const classes = getClasses();
    const handleClick = () => {
        iconStore.set(icon)
    }
    return (<Tooltip classes={{tooltip: classes.tooltip, arrow: classes.arrow}}
                     title={<div style={{textAlign: 'center'}}>
                         <div>{icon.name}</div>
                         <div style={{borderTop: '1px dotted #fff'}}>{icon.author}</div>
                     </div>} arrow>
        <Grid item xs={4} sm={3} md={2} lg={1}
              className={joinClasses({
                  [classes.root]: true,
                  [classes.community]: icon.author === 'Google'
              })}
              onClick={handleClick}>
           {icon.cmp}
            <div style={{width: 90,margin:"auto"}}>{icon.name}</div>
        </Grid></Tooltip>);
})
