import db from '@/api/module/index';
import { Schema } from '@/config/schema';
import { Box, Divider } from '@mui/material';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import ProgressDialog from 'package/src/Modal/ProgressModal';
import { useState } from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownPreview from './MarkdownPreview';
import SettingButton from './SettingButton';
import pb from '@/api/server/db/pocketbase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { kboFont } from 'package/styles/fonts/module';
import { useMutation } from '@apollo/client';
import {
  createArticleMutation,
  updateArticleMutation,
} from '@/config/apollo-client/mutation';

interface Props {
  contentId: string;
  markdown_contents: string;
  markdown_title: string;
  markdown_tag: string[];
  setEditPage?: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
  category: string;
}

export default function MarkdownEditorContainer({ ...props }: Props) {
  const isMobile = useClientSize('sm');
  const router = useRouter();
  const { data } = useSession();
  const [createArticle] = useMutation(createArticleMutation([]));
  const [updateArticle] = useMutation(updateArticleMutation([]));

  const [title, setTitle] = useState<string>(props?.markdown_title || '');
  const [previewImage, setPreviewImage] = useState<string>(''); // 이미지 미리보기 URL 상태

  const [markdownText, setMarkdownText] = useState<string>(
    props?.markdown_contents || '',
  );
  const [_category, setCategory] = useState(props?.category);
  const [tags, setTags] = useState<string[]>(props?.markdown_tag || []);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const extractSummary = (str: string) => {
    // 이미지 태그를 제거하는 정규식 (이미지 태그는 '![alt](url)' 형식)
    const withoutImages = str.replace(/!\[.*?\]\(.*?\)/g, '');

    // 헤더 (#, ##, ###) 문법 제거
    const withoutHeaders = withoutImages.replace(/^#{1,6}\s+/gm, '');

    // 링크 문법 제거 (예: [링크 텍스트](URL))
    const withoutLinks = withoutHeaders.replace(/\[.*?\]\(.*?\)/g, '');

    // 강조 문법 제거 (예: **bold**, *italic*, ~~strikethrough~~)
    const withoutEmphasis = withoutLinks
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1');

    // 나머지 마크다운 요소들 제거 (예: 리스트, 구분선 등)
    const withoutMarkdown = withoutEmphasis
      .replace(/^-{3,}/gm, '') // 구분선
      .replace(/^\s*[-*+]\s+/gm, '') // 리스트
      .replace(/`{1,3}[^`]*`{1,3}/g, ''); // 코드 블럭 제거

    // 다른 처리 (예: 구분선을 기준으로 나누기)

    const splitByHr = withoutMarkdown.split('\n---')[0];
    const splitByBlockquote = splitByHr.split('\n>')[0];
    const trimmedSummary = splitByBlockquote.trim();

    // 요약 길이 조절
    if (trimmedSummary.length > 30) {
      return trimmedSummary.slice(0, 100) + '...';
    }

    return trimmedSummary;
  };

  const processMarkdownImages = async (markdownText: string) => {
    // 1. blob URL 찾기 (정규식 사용)
    const blobUrlRegex = /!\[.*?\]\((blob:[^)]+)\)/g;
    // const blobUrlRegex = /!\[.*?\]\((blob:[^)]+|http:\/\/127\.0\.0\.1:8090\/api\/files\/[^)]+)\)/g;

    let match;
    const blobUrls: string[] = [];

    while ((match = blobUrlRegex.exec(markdownText)) !== null) {
      blobUrls.push(match[1]);
    }

    let updatedMarkdown = markdownText;
    if (!blobUrls.length)
      return { recordIds: [], updatedMarkdown, thumbnail: null };

    const recordIds: string[] = [];
    let thumbnail = null;
    let thumbnailAddress = '';

    const MAX_SIZE = 2 * 1024 * 1024;

    // 2. blob URL을 PocketBase URL로 교체
    for (const blobUrl of blobUrls) {
      const file = await fetch(blobUrl).then((res) => res.blob());
      thumbnail = thumbnail ? thumbnail : file;

      if (file.size > MAX_SIZE) {
        toast.error(
          <p style={{ ...kboFont }}>
            업로드하려는 이미지의 크기는 2MB를 초과할 수 없습니다.
          </p>,
        );
        // 이미지 크기가 2MB를 초과하는 경우 업로드 중단 및 에러 메시지 반환
        throw new Error(
          '업로드하려는 이미지의 크기는 2MB를 초과할 수 없습니다.',
        );
      }

      // 3. PocketBase에 파일 업로드 (이미지를 업로드하고 URL 받기)
      const formData = new FormData();
      formData.append('image', file);
      formData.append('route', props?.path); // route 추가

      try {
        const record = await pb.collection('images').create(formData);
        recordIds.push(record?.id);
        const pocketBaseImageUrl = pb.files.getUrl(record, record.image); // PocketBase URL 가져오기
        console.log(pocketBaseImageUrl);
        if (!thumbnailAddress) thumbnailAddress = pocketBaseImageUrl;

        console.log({ thumbnail, pocketBaseImageUrl, blobUrl });
        updatedMarkdown = updatedMarkdown.replace(blobUrl, pocketBaseImageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }

    return { recordIds, updatedMarkdown, thumbnail, thumbnailAddress };
  };

  const onClickSave = async () => {
    if (!title)
      return toast.error(<p style={{ ...kboFont }}>제목을 입력해주세요</p>);

    if (!markdownText)
      return toast.error(<p style={{ ...kboFont }}>글을 입력해주세요</p>);

    setLoading(true);
    const {
      recordIds = [],
      updatedMarkdown = '',
      thumbnail,
      thumbnailAddress = '',
    } = await processMarkdownImages(markdownText);

    const formData = new FormData();

    const test: any = {
      userName: data?.user?.name,
      userId: data?.user?.username,
      markdown_title: title,
      markdown_contents: updatedMarkdown,
      category: _category,
      // timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      tag: tags || [],
      summary: extractSummary(markdownText),
      theme: props?.path,
      imageId: recordIds,
      isPublic: true,
      log: 0,
    };
    if (thumbnailAddress) test.thumbnail = thumbnailAddress;

    const form = {
      userName: data?.user?.name,
      userId: data?.user?.username,
      markdown_title: title,
      markdown_contents: updatedMarkdown,
      category: _category,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      tag: JSON.stringify(tags || []),
      summary: extractSummary(markdownText),
      theme: props?.path,
      imageId: recordIds,
    };
    if (thumbnail) Object.assign(form, { thumbnail });

    if (props?.contentId) Object.assign(form, { id: props?.contentId });

    Object.entries(form).forEach(([key, value]) => {
      const isArray = Array.isArray(value);
      const appendValue = isArray ? value : [value];

      appendValue.forEach((item: any, index) => {
        const keyName = isArray ? `${key}[${index}]` : key;
        formData.append(keyName, item);
      });
    });

    // thumbnail && formData.append('thumbnail', thumbnail);

    try {
      let result;
      // if (props?.contentId) result = await db.update('library', form);
      // else result = await db.create('library', form);

      if (props?.contentId) {
        // result = await pb
        //   .collection('library')
        //   .update(props?.contentId, formData);

        const { data } = await updateArticle({
          variables: {
            _id: props?.contentId,
            input: test,
          },
        });
        result = data?.createArticle;
      } else {
        const { data } = await createArticle({
          variables: {
            input: test,
          },
        });
        result = data?.createArticle;
        // result = await pb.collection('library').create(formData);
      }

      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: props?.contentId || result?._id,
          path: props?.path, // 예: 'academy'
        }),
      });

      if (props?.contentId) {
        router.refresh();
        if (props?.setEditPage) props?.setEditPage(false);
        setLoading(false);
      } else {
        router.push(`/pinetree/${props?.path}/${result?._id}`);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    } finally {
    }
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ProgressDialog open={loading} onClose={() => setLoading(false)} />

      <SettingButton
        setPreview={setPreview}
        onClickSave={onClickSave}
        id={props?.contentId}
        setEditPage={props?.setEditPage ? props?.setEditPage : () => {}}
        loading={loading}
      />

      <Box
        sx={{
          display: 'flex',
          py: 2,
          overflowX: 'hidden',
          // height: 'calc(85vh)',
          // overflowY: 'auto',
        }}
      >
        {/* 웹 사이즈일때 Preview & Divider 출력 */}
        {!isMobile && (
          <>
            <MarkdownPreview
              title={title}
              markdownText={markdownText}
              path={props?.path}
              isEditon={true}
            />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                position: 'sticky',
                top: 0,
                height: 'auto',
                alignSelf: 'stretch',
                mr: 3,
              }}
            />
          </>
        )}

        {/* 입력하는 컴포넌트 */}
        <MarkdownInput
          title={title}
          setTitle={setTitle}
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
          category={_category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </Box>

      {isMobile && (
        <ModalWrapper open={preview} onClose={() => setPreview(false)}>
          <>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                height: '70vh',
                bgcolor: 'background.default',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                overflowY: 'auto',
              }}
            >
              <MarkdownPreview
                title={title}
                markdownText={markdownText}
                path={props?.path}
                isEditon={true}
              />
            </Box>
          </>
        </ModalWrapper>
      )}
    </Box>
  );
}
