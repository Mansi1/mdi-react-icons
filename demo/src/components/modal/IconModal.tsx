import React from 'react';
import {Button, Modal} from "@material-ui/core";
import {Code} from "../Code";
import {ShowCase} from "../ShowCase";
import {downloadImage} from "../../functions/downloadUrl";
import {useStore} from '@nanostores/react'
import {iconStore} from "../../store/iconStore";
import {ModalLayout} from "./ModalLayout";
import {Icon} from "../../interfaces/Icon";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export const getDefaultArray = (arr: Array<any>, defaultElement: any) => {
    if (!arr || arr.length === 0) {
        return [defaultElement]
    }
    return arr;
}
const getImport = (importName: string) => {
    return 'import { ' + importName + ' } from "@material-ui-extra/icons/' + importName + '";'
}

const getAllImports= (icon: Icon): string => {
    const lines: Array<string> = [];
    lines.push('// standard import');
    lines.push(getImport(icon.componentFileName));
    lines.push('\n');
    if (icon.componentAliasFileNames.length > 0) {
        lines.push('// alias import')
        icon.componentAliasFileNames.forEach((alias) => {
                lines.push(getImport(alias));
            }
        )
    }
    return lines.join('\n')
}

export const IconModal = () => {
    const selectedIcon = useStore(iconStore)
    const handleClose = () => {
        iconStore.set(undefined)
    }
    const handleDownload = (icon: Icon) => {
        return downloadImage(icon.name + '.svg', window.location.origin +'/mdi-react-icons/'+icon.assetsUrl)
    }
    return (<>
        {selectedIcon && <Modal
            open
            onClick={(evt) => evt.stopPropagation()}
            onClose={handleClose}
        >
            <>
            <ModalLayout title={selectedIcon.name} onClose={handleClose}>
                <Code>
                    {getAllImports(selectedIcon)}
                </Code>
                <ShowCase icon={selectedIcon}/>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Author
                                </TableCell>
                                <TableCell>{selectedIcon.author}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Alias
                                </TableCell>
                                <TableCell>{getDefaultArray(selectedIcon.aliases, '-').join(' ')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Tags
                                </TableCell>
                                <TableCell>{getDefaultArray(selectedIcon.tags, '-').join(' ')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{margin: 10, textAlign: 'center'}}>
                    <Button variant="contained" color="primary" onClick={() => handleDownload(selectedIcon)}>
                        Download svg</Button>
                </div>
            </ModalLayout>
            </>
        </Modal>}
    </>);
};