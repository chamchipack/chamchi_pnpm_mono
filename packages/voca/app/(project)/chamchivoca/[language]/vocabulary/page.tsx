'use client';
import React from 'react';
import VocabularyContents from '../../../../../components/vocabulary/server/VocabularyContents';
import ServerClientAdapter from './ServerClientAdapter';
import { Box, Typography } from '@mui/material';
import RouterBack from '@/components/RouterIcon/RouterBack';

const page = () => {
  return (
    <div style={{ padding: 16 }}>
      <ServerClientAdapter>
        <VocabularyContents perPage={10} clickable={true} selectable={false} />
      </ServerClientAdapter>
    </div>
  );
};

export default page;
