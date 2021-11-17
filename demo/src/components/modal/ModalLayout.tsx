import React, { PropsWithChildren, ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui-extra/icons/CloseIcon';
import DialogContent from '@material-ui/core/DialogContent';
import { joinClasses } from '@milkscout/react';
import { makeStyles } from '@material-ui/core/styles';

export const getClasses = makeStyles(() => ({
  root: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  gridContainer: {
    margin: 'auto',
    overflowY: 'auto',
  },
  grid: {
    backgroundColor: 'white',
    pointerEvents: 'auto',
    overflowY: 'auto',
    height: '100%',
    borderRadius: 5,
    padding: 25,
    paddingTop: 15,
    maxWidth: 500,
  },
  closeButton: {
    padding: 0,
    float: 'right',
    marginTop: -5,
    marginRight: -15,
    cursor: 'pointer',
    fontSize: 28,
  },
  title: { textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' },
}));

export interface IPropsModalLayout {
  onClose: () => void;
  title: ReactNode;
  classes?: { root?: string; content?: string; title?: string };
  hideClose?: boolean;
}

export const ModalLayout = ({
  children,
  onClose,
  title,
  hideClose = false,
  classes = {},
}: PropsWithChildren<IPropsModalLayout>) => {
  const ownClasses = getClasses();
  const { root = '', content = '', title: titleClass } = classes;
  return (
    <div className={ownClasses.root}>
      <Grid container justify="center" className={ownClasses.gridContainer}>
        <Grid item xs={12} sm={10} lg={6} className={joinClasses(ownClasses.grid, root)}>
          {!hideClose && (
            <CloseIcon
              color="primary"
              className={ownClasses.closeButton}
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
          )}
          <h1 className={joinClasses(ownClasses.title, titleClass)}>{title}</h1>
          <DialogContent className={content} style={{padding: 0}}>{children}</DialogContent>
        </Grid>
      </Grid>
    </div>
  );
};
