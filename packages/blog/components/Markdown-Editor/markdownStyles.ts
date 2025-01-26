export const markdownHeaderStyles = {
  '& h1': {
    marginTop: '30px',
    marginBottom: '25px',
    lineHeight: '1.2',
    wordBreak: 'break-word',
  },
  '& h2': { marginTop: '24px', marginBottom: '18px' },
  '& h3': { marginTop: '20px', marginBottom: '16px' },
  '& h4': { marginTop: '14px', marginBottom: '14px' },
  '& h5': { marginTop: '12px', marginBottom: '12px' },
  '& h6': { marginTop: '10px', marginBottom: '10px' },
  '& p': { marginTop: '24px', marginBottom: '24px', color: '#434C58' },
  '& strong': {
    fontWeight: 'bold', // 기본적으로 strong 태그는 굵게 표시
    color: '#black', // strong 태그의 텍스트 색상 설정
  },
  '& hr': {
    margin: '20px 0',
    border: 'none',
    borderTop: '1px solid #e0e0e0',
  },
  '& blockquote': {
    borderLeft: '4px solid #e0e0e0',
    paddingLeft: 2,
    color: '#6a737d',
    marginTop: '16px',
    marginBottom: '16px',
    backgroundColor: '#f6f8fa',
    whiteSpace: 'pre-wrap',
  },
  '& blockquote p': {
    marginTop: '4px', // blockquote 안의 p 태그 마진
    marginBottom: '4px',
  },
  '& code': {
    color: '#yellow',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '0.9em',
  },
  '& pre': {
    backgroundColor: '#282c34',
    color: '#ffffff',
    padding: '16px',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.85em',
    margin: '20px 0',
  },
  '& a': {
    color: '#1e90ff',
    textDecoration: 'underline',
    '&:hover': {
      color: '#ff4500',
    },
  },
  '& ol': {
    paddingLeft: '20px', // 리스트 항목에 왼쪽 여백을 줍니다.
    marginTop: '10px',
    marginBottom: '10px',
    listStyleType: 'decimal', // 불릿 스타일 (기본적으로 disc, circle 등 가능)
  },
  '& ul': {
    paddingLeft: '20px', // 리스트 항목에 왼쪽 여백을 줍니다.
    marginTop: '10px',
    marginBottom: '10px',
    listStyleType: 'disc', // 불릿 스타일 (기본적으로 disc, circle 등 가능)
  },
  '& li': {
    marginBottom: '8px', // 리스트 항목 간 간격
    color: '#434C58', // 텍스트 색상 설정
  },
};
