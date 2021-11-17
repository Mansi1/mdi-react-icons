import React from 'react';
import {Button, Modal} from "@material-ui/core";
import {Code} from "../Code";
import {ShowCase} from "../ShowCase";
import {downloadImage} from "../../functions/downloadUrl";
import {useStore} from '@nanostores/react'
import {iconStore} from "../../store/iconStore";
import {ModalLayout} from "./ModalLayout";
import {Icon} from "../../interfaces/Icon";

export const IconModal = () => {
    const selectedIcon = useStore(iconStore)
    const handleClose = () => {
        iconStore.set(undefined)
    }
    const handleDownload = (icon: Icon) => {
        return downloadImage(icon.name + '.svg', icon.assetsUrl)
    }
    return (<>
        {selectedIcon && <Modal
            open
            onClick={(evt) => evt.stopPropagation()}
            onClose={handleClose}
        >
            <ModalLayout title={selectedIcon.name} onClose={handleClose}>
                <div>{selectedIcon.author}</div>
                <Code>{'import ' + selectedIcon.componentFileName + ' form "@material-ui-extra/icons/' + selectedIcon.componentFileName + '";'}</Code>
                <ShowCase icon={selectedIcon}/>
                <div>alias: {selectedIcon.aliases.join(' ')}</div>
                <div>tags: {selectedIcon.tags.join(' ')}</div>
                <Button variant="text" color="primary" onClick={() => handleDownload(selectedIcon)}>Download
                    svg</Button>
            </ModalLayout>
        </Modal>} 
    </>);
};
