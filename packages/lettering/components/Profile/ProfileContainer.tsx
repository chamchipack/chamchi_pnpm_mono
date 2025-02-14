'use client';
import { Box } from '@mui/material';
import ProfileImageSection from './ProfileImageSection';
import ProfileInfoSection from './ProfileInfoSection';
import AccountActions from './AccountActions';

export default function ProfileContainer() {
  return (
    <Box>
      <ProfileImageSection />
      <ProfileInfoSection />
      <AccountActions />
    </Box>
  );
}
