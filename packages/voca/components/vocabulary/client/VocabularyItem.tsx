import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerbFormTransformer from '@/components/word/verb/VerbFormTransformer';
import { motion } from 'framer-motion';
import { Word, WordBase } from '@/config/defaultType';
import AdjectiveTransformer from '@/components/word/adj/AdjectiveTransformer';
import { useClientSize } from 'package/src/hooks/useMediaQuery';

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
  isMemorized: boolean;
  setMemorized: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckboxChange: (value: string) => void;
}

const VocabularyItem = ({
  item,
  hiddenState,
  toggleVisibility,
  editmode,
  onDelete,
  isMemorized,
  setMemorized,
  handleCheckboxChange,
}: VocabularyItemProps) => {
  const isMobile = useClientSize('sm');
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
          background: (theme) => (isMemorized ? theme.palette.brown.main : ''),
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
        <FormControlLabel
          sx={{ mx: 1, height: 10 }}
          key={item.id}
          control={
            <Checkbox
              checked={isMemorized}
              onChange={() => handleCheckboxChange(item.id)}
              sx={{
                color: isMemorized ? 'info.main' : 'default',
                '&.Mui-checked': {
                  color: 'info.main', // 클릭 시 색상 변경
                },
              }}
            />
          }
          label={
            isMemorized ? (
              <Typography variant="caption" color="text.secondary">
                외웠어요!
              </Typography>
            ) : (
              <Typography variant="caption" color="text.secondary">
                아직 안외웠어요!
              </Typography>
            )
          } // 체크박스 오른쪽에 표시할 텍스트
        />

        <AccordionDetails
          sx={{
            borderTop: 'none',
          }}
        >
          {item?.desc ? (
            <Typography color="text.primary" variant="body2" mt={2}>
              {item?.desc}
            </Typography>
          ) : null}

          {item?.type === 'noun' ? null : item?.type === 'verb' ? (
            <VerbFormTransformer data={item} />
          ) : item?.type === 'adj' ? (
            <AdjectiveTransformer data={item} />
          ) : null}
        </AccordionDetails>
      </Accordion>
      {editmode && (
        <Box component={motion.div} variants={isMobile ? {} : ssBoxVariants}>
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
