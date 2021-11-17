import React from 'react';
import {Icon} from "./interfaces/Icon";
import {Grid, Tooltip} from "@material-ui/core";

import {makeStyles, Theme} from '@material-ui/core/styles';
import {joinClasses} from "@milkscout/react";
import {iconStore} from "./store/iconStore";

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        cursor: 'pointer',
        '& svg': {
            fontSize: '80px !important',
        }
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
    iconWrapper: {
        height: 150,
        width: 150,
        display: "flex",
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid black'
    },
    text: {
        width: 140,
        textAlign: 'center',
        marginTop: -22,
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingLeft: 7,
        textOverflow: 'ellipsis'
}
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
        <Grid item
              className={joinClasses({
                  [classes.root]: true,
                  [classes.community]: icon.author === 'Google'
              })}
              onClick={handleClick}>
            <div className={classes.iconWrapper}>{icon.cmp}
            </div>
            <div className={classes.text}>{icon.name}</div>
        </Grid></Tooltip>);
})
