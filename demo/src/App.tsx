import React from 'react';
import {Container} from "@material-ui/core";
import {IconModal} from "./components/modal/IconModal";
import {TopBar} from "./TopBar";
import {GroupView} from "./GroupView";
import {SearchView} from "./SearchView";

export const App = () => {
    return (<>
            <TopBar/>
            <div style={{height: 70}}/>
            <Container maxWidth={"lg"}>
                <SearchView/>
                <GroupView/>
                <IconModal/>
            </Container>
        </>
    )
};
