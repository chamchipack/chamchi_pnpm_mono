import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../academy.module.css';
import pb from '@/api/server/db/pocketbase';
import Title from '../client/Title';

export default async function List({ path }: { path: string }) {
  const resultList = await pb.collection(path).getList(1, 20); // 페이지 1, 20개의 아이템 가져오기
  const list = resultList?.items || [];

  return (
    <div className={styles['responsive-container']}>
      <div className={styles['reponsive-content']} style={{ width: '100%' }}>
        {list.length ? (
          <>
            {list.map((item, index) => (
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
                    <Title item={item} path={path} />

                    <Box sx={{ mt: 1, flexGrow: 1, width: '100%' }}>
                      <Typography
                        fontSize={12}
                        color="text.secondary"
                        lineHeight={1.3}
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {item.summary}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography fontSize={12} color="text.secondary">
                        날짜: {item.timestamp}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: '30%', maxWidth: 200, height: '100%' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: '#e2e2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        borderRadius: 3,
                      }}
                    >
                      <Typography fontSize={12} color="text.primary">
                        저장된 이미지가 <br />
                        없습니다
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 50,
              background: '#e2e2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 4,
              borderRadius: 3,
            }}
          >
            <Typography color="text.secondary">
              조회된 데이터가 없어요!
            </Typography>
          </Box>
        )}
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
