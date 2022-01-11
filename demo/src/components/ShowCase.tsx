import React from 'react';
import {Icon} from "../interfaces/Icon";
import {makeStyles, Theme} from '@material-ui/core/styles';
import {joinClasses} from "@milkscout/react";
import {Style} from "./Style";
import {LazyLoadImage} from "react-lazy-load-image-component";

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
            {[48, 72,96].map(size => (<Style style={{flex: 1, textAlign: 'center'}}>
                <LazyLoadImage
                    alt={icon.name}
                    src={'mdi-react-icons/'+icon.assetsUrl}
                    effect={'blur'}
                    height={size}
                    width={size}
                />
            </Style>))}
        </div>
    );
};
