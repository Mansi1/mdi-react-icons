import React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select} from "@material-ui/core";
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
import {openUrlInNewTab, ViewContainer} from "@milkscout/react";
import {Version, versionStore} from "../../store/versionStore";

export const getDefaultArray = (arr: Array<any>, defaultElement: any) => {
    if (!arr || arr.length === 0) {
        return [defaultElement]
    }
    return arr;
}
const getImport = (importName: string, version: Version) => {
    if (version.version === 'V4') {
        return 'import { ' + importName + ' } from "@material-ui-extra/icons/' + importName + '";'
    } else {
        return 'import { ' + importName + ' } from "@mui-extra/icons/' + importName + '";'
    }
}

const getAllImports = (icon: Icon, version: Version): string => {
    const lines: Array<string> = [];
    lines.push('// standard import');
    lines.push(getImport(icon.componentFileName, version));
    lines.push('\n');
    if (icon.componentAliasFileNames.length > 0) {
        lines.push('// alias import')
        icon.componentAliasFileNames.forEach((alias) => {
                lines.push(getImport(alias, version));
            }
        )
    }
    return lines.join('\n')
}

export const IconModal = () => {
    const selectedIcon = useStore(iconStore)
    const version = useStore(versionStore);
    const handleClose = () => {
        iconStore.set(undefined)
    }
    const handleDownload = (icon: Icon) => {
        return downloadImage(icon.name + '.svg', window.location.origin + '/mdi-react-icons/' + icon.assetsUrl)
    }
    return (<>
        {selectedIcon && <Modal
            open
            onClick={(evt) => evt.stopPropagation()}
            onClose={handleClose}
        >
            <>
                <ModalLayout title={selectedIcon.name} onClose={handleClose}>
                    <FormControl style={{marginBottom: 10}}>
                        <InputLabel id="version-select-label">Selected version</InputLabel>
                        <Select
                            labelId="version-select-label"
                            value={version.version}
                            onChange={(evt) => versionStore.set({version: evt.target.value as any})}
                        >
                            <MenuItem value={'V4'}>MATERIAL-UI V4</MenuItem>
                            <MenuItem value={'V5'}>MATERIAL-UI V5</MenuItem>
                        </Select>
                    </FormControl>
                    <ViewContainer show={version.version === 'V4'}>
                        <div>
                            This library offers <a href="https://v4.mui.com/components/icons/#svgicon">@material-ui
                            SvgIcons</a> for <a href="https://v4.mui.com">material ui v4</a>
                        </div>
                        <div>
                            <Code language={"shell"}>
                                {'#Usage:\n' +
                                    '#with npm\n' +
                                    'npm i @material-ui-extra/icons --save\n' +
                                    '\n' +
                                    '#with yarn\n' +
                                    'yarn add @material-ui-extra/icons'
                                }
                            </Code>
                        </div>
                    </ViewContainer>
                    <ViewContainer show={version.version === 'V5'}>
                        <div>
                            This library offers <a href="https://mui.com/api/svg-icon/#main-content">@mui
                            SvgIcons</a> for <a href="https://mui.com">material ui v5</a>
                        </div>
                        <div>
                            <Code language={"shell"}>
                                {'#Usage:\n' +
                                    '#with npm\n' +
                                    'npm i @mui-extra/icons --save\n' +
                                    '\n' +
                                    '#with yarn\n' +
                                    'yarn add @mui-extra/icons'
                                }
                            </Code>
                        </div>
                    </ViewContainer>
                    <Code>
                        {getAllImports(selectedIcon, version)}
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
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        License
                                    </TableCell>
                                    <TableCell>
                                        <div style={{cursor: 'pointer'}}
                                             onClick={() => openUrlInNewTab('https://github.com/Templarian/MaterialDesign/blob/master/LICENSE')}>click
                                            here
                                        </div>
                                    </TableCell>
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
