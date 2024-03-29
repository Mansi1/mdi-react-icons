import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import LinkVariantIcon from "@material-ui-extra/icons/LinkVariantIcon";
import IconButton from "@material-ui/core/IconButton";

const getClasses = makeStyles(({palette}: Theme) => ({
    root: {
        borderTop: `2px solid ${palette.primary.main}`,
        borderBottom: `2px solid ${palette.primary.main}`,
    },
    rootWrapper: {
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        padding: 10,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: palette.primary.main
    }
}));

export interface TagProps {
    name: string
    addLink?: boolean
}

export const Tag = ({name, addLink = true}: TagProps) => {
    const classes = getClasses();
    return (<div className={classes.root}>
        <div className={classes.rootWrapper}>
            {name} {addLink && <IconButton style={{color: '#fff'}} onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/mdi-react-icons/#${encodeURIComponent(name)}`);
        }}>
            <LinkVariantIcon/>
        </IconButton>}
        </div>
    </div>);
};
