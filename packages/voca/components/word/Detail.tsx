'use client';

import { Box, Chip, Divider, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Detail() {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 60,
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="h3" color="text.primary">
              会う
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              <Typography variant="caption" color="info.main">
                あう
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                만나다
              </Typography>
            </Box>
          </Box>
        </Box>

        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" color="text.primary">
          예문
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography color="text.primary">友達ともだちに会あう</Typography>
          <Typography variant="caption" color="text.secondary">
            친구와 만나다
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography>友達ともだちに会あう</Typography>
          <Typography variant="caption" color="text.secondary">
            친구와 만나다
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" color="text.primary">
          변화형
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row' }}>
          <Chip label={'현재형'} />
          <Chip label={'과거형'} />
          <Chip label={'미래형'} />
        </Box>
      </Box>
    </Box>
  );
}
