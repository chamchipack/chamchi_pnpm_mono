import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerbFormTransformer from '@/components/word/verb/VerbFormTransformer';
import { motion } from 'framer-motion';
import { Word, WordBase } from '@/config/defaultType';

const parentVariants = {
  initial: {},
  hover: {},
};

const accordionVariants = {
  initial: { width: '100%' },
  hover: { width: '95%' },
};

const ssBoxVariants = {
  initial: { width: '0%', display: 'none' },
  hover: { width: '5%', display: 'block' },
};

const accordion = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

interface VocabularyItemProps {
  item: Word<WordBase>;
  hiddenState: {
    titleHidden: boolean;
    kanaHidden: boolean;
    koHidden: boolean;
  };
  toggleVisibility: (
    id: string,
    field: 'titleHidden' | 'kanaHidden' | 'koHidden',
  ) => void;
  editmode: boolean;
  onDelete: (id: string) => void;
}

const VocabularyItem = ({
  item,
  hiddenState,
  toggleVisibility,
  editmode,
  onDelete,
}: VocabularyItemProps) => {
  return (
    <Box
      key={item.id}
      component={editmode ? motion.div : 'div'}
      variants={parentVariants}
      initial="initial"
      whileHover="hover"
      sx={editmode ? accordion : { mb: 1 }}
    >
      <Accordion
        component={editmode ? motion.div : 'div'}
        variants={accordionVariants}
        disabled={editmode}
        sx={{
          boxShadow: 'none',
          borderRadius: 2,
          mb: 1,
          border: 'none',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={!editmode && <ExpandMoreIcon />}
          aria-controls={`panel-${item.id}-content`}
          id={`panel-${item.id}-header`}
          sx={{
            borderBottom: 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ minWidth: 100 }}>
              <Typography
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(item.id, 'titleHidden');
                }}
                variant="h3"
                color="text.primary"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: 'info.main' },
                }}
              >
                {hiddenState.titleHidden ? '****' : item?.jp}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography
                  variant="caption"
                  color={hiddenState.kanaHidden ? 'text.disabled' : 'info.main'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(item.id, 'kanaHidden');
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  {hiddenState.kanaHidden ? '****' : item?.kana}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color={
                    hiddenState.koHidden ? 'text.disabled' : 'text.primary'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(item.id, 'koHidden');
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  {hiddenState.koHidden ? '****' : item?.ko}
                </Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderTop: 'none',
          }}
        >
          {item?.type === 'verb' ? <VerbFormTransformer data={item} /> : null}
        </AccordionDetails>
      </Accordion>
      {editmode && (
        <Box component={motion.div} variants={ssBoxVariants}>
          <IconButton
            onClick={() => {
              onDelete(item.id);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default VocabularyItem;
