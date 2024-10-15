import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../academy.module.css';

export default function List() {
  console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
  const items = Array(6).fill({
    title: '토스 피플 #2: UX 라이팅의 새로운 기준',
    description:
      '오늘은 토스에서 UX Writing Team Leader로 근무하고 있는 김자유님의 인터뷰를 공유드려요. 자유님은 푸시 알림을 포함해 토스 앱 안에 보이는 모든 메시지의 보이스톤을 일관되게 통일하는 업무를 하고 있어요.',
    date: '2024-10-15',
  });

  return (
    <div className={styles['responsive-container']}>
      <div className={styles['reponsive-content']}>
        {items.map((item, index) => (
          <Box sx={{ width: '100%', minHeight: 140, mt: 4 }} key={index}>
            <Box
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'flex-start',
                height: '140px',
              }}
            >
              <Box
                sx={{
                  width: '70%',
                  pr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <Box>
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    sx={{ '&:hover': { color: 'info.dark' } }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <Box sx={{ mt: 1, flexGrow: 1, width: '100%' }}>
                  <Typography
                    fontSize={12}
                    color="text.secondary"
                    lineHeight={1.3}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                <Box>
                  <Typography fontSize={12} color="text.secondary">
                    날짜: {item.date}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: '30%', maxWidth: 220, height: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography fontSize={12} color="white">
                    이미지 자리
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </div>

      <div className={styles['responsive-side']} style={{}}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Divider orientation="vertical" flexItem sx={{ mr: 3 }} />
          <Box>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                width: '100%',
                padding: '1px 2px',
                height: 40,
              }}
            >
              <InputBase
                // inputRef={searchKeywordRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="이름을 입력해주세요."
                inputProps={{ 'aria-label': 'search' }}
                // onKeyDown={handleKeyDownSearch}
              />
              <IconButton
                sx={{ p: '4px' }}
                aria-label="search"
                // onClick={() =>
                //   setDatagridStudentState({
                //     ...datagridStudentState,
                //     "name.like": searchKeywordRef.current?.value,
                //   })
                // }
                // onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
                //   e.preventDefault()
                // }
              >
                <SearchIcon sx={{ color: 'text.primary' }} />{' '}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}
