import React from 'react';
import { Container } from '@material-ui/core';
import { IconModal } from './components/modal/IconModal';
import { TopBar } from './TopBar';
import { GroupView } from './GroupView';
import { SearchView } from './SearchView';
import { useEffectOnce } from '@milkscout/react';
import { versionStore } from './store/versionStore';

export const App = () => {
  useEffectOnce(() => {
    if (window.location.pathname.indexOf('/mui') > -1) {
      versionStore.set({ version: 'V5' });
    } else if (window.location.pathname.indexOf('/material-ui') > -1) {
      versionStore.set({ version: 'V4' });
    } else {
      versionStore.set({ version: 'V5' });
    }
  });
  return (
    <>
      <TopBar />
      <div style={{ height: 70 }} />
      <Container maxWidth={'lg'}>
        <SearchView />
        <GroupView />
        <IconModal />
      </Container>
    </>
  );
};
