import { Box, Typography } from '@mui/material';

interface Props {
  tag: string[];
  created: string;
  category: string;
}

const TagDateComponent = ({ tag = [], created = '', category = '' }: Props) => {
  // const path = usePathname();
  // const buttons =
  // menuItems.find(({ path: _path = '' }) => path.includes(_path))?.category ||
  // [];

  // const result = buttons.find(({ label = "" }) => category === label)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {/* <Typography
            component="span"
            variant="subtitle2"
            color="secondary.dark"
            sx={{ mr: 1}}
          >
            #{result?.name}
        </Typography> */}

        {Array.isArray(tag) && tag.length ? (
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
          {/* {new Date(Number(created)).toISOString() || ''} */}
        </Typography>
      </Box>
    </Box>
  );
};

export default TagDateComponent;
