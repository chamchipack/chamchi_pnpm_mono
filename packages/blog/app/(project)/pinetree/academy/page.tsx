import { useClientSize } from 'package/src/hooks/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@/components/academy/server/Container';

export default function Page() {
  const items = Array(6).fill({
    title: '토스 피플 #2: UX 라이팅의 새로운 기준',
    description:
      '오늘은 토스에서 UX Writing Team Leader로 근무하고 있는 김자유님의 인터뷰를 공유드려요. 자유님은 푸시 알림을 포함해 토스 앱 안에 보이는 모든 메시지의 보이스톤을 일관되게 통일하는 업무를 하고 있어요.',
    date: '2024-10-15',
  });

  return (
    <Container />
    // <>
    //   <Box
    //     sx={{
    //       width: '100%',
    //       height: 100,
    //       background: (theme) => theme.palette.info.light,
    //       borderRadius: 4,
    //       mt: 2,
    //     }}
    //   />

    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'end',
    //       mt: 3,
    //     }}
    //   >
    //     <Button
    //       variant="outlined"
    //       size="medium"
    //       sx={{
    //         px: 1,
    //         py: 0.5,
    //         mr: 2,
    //         borderRadius: 1,
    //         background: (theme) => `${theme.palette.primary.main}`,
    //         borderColor: 'primary.main',
    //         color: 'background.paper',
    //         '&:hover': {
    //           borderColor: 'primary.dark',
    //           background: (theme) => `${theme.palette.primary.dark}`,
    //         },
    //       }}
    //     >
    //       글 수정하기
    //     </Button>

    //     <Button
    //       variant="outlined"
    //       size="medium"
    //       sx={{
    //         px: 1,
    //         py: 0.5,
    //         mr: 2,
    //         borderRadius: 1,
    //         background: (theme) => `${theme.palette.info.main}`,
    //         borderColor: 'info.main',
    //         color: 'background.paper',
    //         '&:hover': {
    //           borderColor: 'info.dark',
    //           background: (theme) => `${theme.palette.info.dark}`,
    //         },
    //       }}
    //     >
    //       새로운 글 등록
    //     </Button>
    //   </Box>

    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: isMobile ? 'column' : 'row',
    //       mt: 0,
    //     }}
    //   >
    //     <Box sx={{ width: isMobile ? '100%' : '70%' }}>
    //       {items.map((item, index) => (
    //         <Box sx={{ width: '100%', minHeight: 140, mt: 4 }} key={index}>
    //           <Box
    //             sx={{
    //               p: 1,
    //               display: 'flex',
    //               flexDirection: 'row',
    //               width: '100%',
    //               alignItems: 'flex-start',
    //               height: '140px',
    //             }}
    //           >
    //             <Box
    //               sx={{
    //                 width: '70%',
    //                 pr: 2,
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 justifyContent: 'space-between',
    //                 height: '100%',
    //               }}
    //             >
    //               <Box>
    //                 <Typography
    //                   fontSize={18}
    //                   fontWeight={500}
    //                   sx={{ '&:hover': { color: 'info.dark' } }}
    //                 >
    //                   {item.title}
    //                 </Typography>
    //               </Box>

    //               <Box sx={{ mt: 1, flexGrow: 1, width: '100%' }}>
    //                 <Typography
    //                   fontSize={12}
    //                   color="text.secondary"
    //                   lineHeight={1.3}
    //                   sx={{ wordBreak: 'break-word' }}
    //                 >
    //                   {item.description}
    //                 </Typography>
    //               </Box>

    //               <Box>
    //                 <Typography fontSize={12} color="text.secondary">
    //                   날짜: {item.date}
    //                 </Typography>
    //               </Box>
    //             </Box>

    //             <Box sx={{ width: '30%', maxWidth: 220, height: '100%' }}>
    //               <Box
    //                 sx={{
    //                   width: '100%',
    //                   height: '100%',
    //                   background: 'gray',
    //                   display: 'flex',
    //                   alignItems: 'center',
    //                   justifyContent: 'center',
    //                 }}
    //               >
    //                 <Typography fontSize={12} color="white">
    //                   이미지 자리
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Box>
    //         </Box>
    //       ))}
    //     </Box>

    //     {!isMobile && (
    //       <Box sx={{ width: '30%' }}>
    //         <Box
    //           sx={{
    //             borderLeft: (theme) => `1px solid ${theme.palette.grey[200]}`,
    //             width: '100%',
    //             height: '100%',
    //             p: 3,
    //           }}
    //         >
    //           <Box
    //             sx={{
    //               mt: 1,
    //               display: 'flex',
    //               alignItems: 'center',
    //               backgroundColor: '#f0f0f0',
    //               borderRadius: '8px',
    //               width: '100%',
    //               padding: '1px 2px',
    //             }}
    //           >
    //             <InputBase
    //               // inputRef={searchKeywordRef}
    //               sx={{ ml: 1, flex: 1 }}
    //               placeholder="이름을 입력해주세요."
    //               inputProps={{ 'aria-label': 'search' }}
    //               // onKeyDown={handleKeyDownSearch}
    //             />
    //             <IconButton
    //               sx={{ p: '4px' }}
    //               aria-label="search"
    //               // onClick={() =>
    //               //   setDatagridStudentState({
    //               //     ...datagridStudentState,
    //               //     "name.like": searchKeywordRef.current?.value,
    //               //   })
    //               // }
    //               onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
    //                 e.preventDefault()
    //               }
    //             >
    //               <SearchIcon sx={{ color: 'text.primary' }} />{' '}
    //               {/* 돋보기 아이콘 */}
    //             </IconButton>
    //           </Box>
    //         </Box>
    //       </Box>
    //     )}
    //   </Box>
    // </>
  );
}
