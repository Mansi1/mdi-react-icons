import React from 'react';
import {Icon} from "../interfaces/Icon";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {joinClasses} from "@milkscout/react";
import {Style} from "./Style";

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        color: palette.primary.main,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        backgroundColor: '#fff',
        backgroundImage: 'linear-gradient(45deg, #f4f4f4 25%, transparent 25%, transparent 75%, #f4f4f4 75%, #f4f4f4),\n' +
            'linear-gradient(45deg, #f4f4f4 25%, transparent 25%, transparent 75%, #f4f4f4 75%, #f4f4f4)',
    },
    community: {
        color: '#ff814a',
    }

}));

export interface ShowCaseProps {
    icon: Icon
}

export const ShowCase = ({icon}: ShowCaseProps) => {
    const classes = getClasses();
    return (<div className={joinClasses({[classes.root]: true, [classes.community]: icon.author === 'Google'})}>
            <Style style={{fontSize: 48, flex: 1, textAlign: 'center'}}>{icon.cmp}</Style>
            <Style style={{fontSize: 72, flex: 1, textAlign: 'center'}}>{icon.cmp}</Style>
            <Style style={{fontSize: 96, flex: 1, textAlign: 'center'}}>{icon.cmp}</Style>
        </div>
    );
};
