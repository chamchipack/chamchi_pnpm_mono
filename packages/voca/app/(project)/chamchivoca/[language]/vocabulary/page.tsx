'use client';
import React from 'react';
import VocabularyContents from '../../../../../components/vocabulary/server/VocabularyContents';
import ServerClientAdapter from './ServerClientAdapter';

const page = () => {
  return (
    <div style={{ padding: 10 }}>
      <ServerClientAdapter>
        <VocabularyContents perPage={10} clickable={true} />
      </ServerClientAdapter>
    </div>
  );
};

export default page;
