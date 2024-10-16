import { Box, Typography } from '@mui/material';

interface Props {
  tag: string[];
  timestamp: string;
}

const TagDateComponent = ({ tag = [], timestamp = '' }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {tag.length ? (
          <Typography
            component="span"
            variant="subtitle2"
            color="secondary.dark"
          >
            {tag.reduce((acc, item) => {
              acc += `#${item} `;
              return acc;
            }, '')}
          </Typography>
        ) : null}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {timestamp || ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default TagDateComponent;
