import React from 'react';
import {Icon} from "./interfaces/Icon";
import {Grid} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {joinClasses} from "@milkscout/react";
import {iconStore} from "./store/iconStore";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        '& svg': {
            fontSize: '90px !important',
        },
    },
    arrow: {
        color: palette.common.black,
    },
    tooltip: {
        fontSize: 14,
        backgroundColor: palette.common.black,
    },
    iconName: {width: 90, margin: "auto", color: '#000'}
}));

export interface MdiIconProps {
    icon: Icon
}

export const MdiIcon = React.memo(({icon}: MdiIconProps) => {
    const classes = getClasses();
    const handleClick = () => {
        iconStore.set(icon)
    }
    return (<Grid item xs={4} sm={3} md={2} lg={1}
              className={joinClasses({
                  [classes.root]: true,
              })}
              onClick={handleClick}>
            <LazyLoadImage
                alt={icon.name}
                src={window.location.origin + '/mdi-react-icons/' + icon.assetsUrl}
                effect={'blur'}
                height={90}
                width={90}
            />
            <div className={classes.iconName}>{icon.name}</div>
        </Grid>
    );
})
