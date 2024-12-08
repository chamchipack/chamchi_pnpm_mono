import SearchInput from '@/components/language/SearchInput';
import { Language } from '@/config/defaultType';
import { Divider } from '@mui/material';
import React from 'react';

interface Props {
  params: {
    language: string;
  };
  children: React.ReactNode;
}

const Layout = ({ children, params }: Props) => {
  const { language } = params;
  return (
    <div style={{ padding: 10 }}>
      <SearchInput language={language as Language} routingStatus={true} />

      <Divider sx={{ my: 3 }} />

      {children}
    </div>
  );
};

export default Layout;
