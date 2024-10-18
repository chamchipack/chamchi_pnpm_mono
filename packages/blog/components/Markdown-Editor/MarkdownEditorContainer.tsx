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

interface Props {
  contentId: string;
  markdown_contents: string;
  markdown_title: string;
  markdown_tag: string[];
  setEditPage?: React.Dispatch<React.SetStateAction<boolean>>;
  path: Schema;
  category: string;
}

export default function MarkdownEditorContainer({ ...props }: Props) {
  const isMobile = useClientSize('sm');
  const router = useRouter();
  const { data } = useSession();

  const [title, setTitle] = useState<string>(props?.markdown_title || '');
  const [markdownText, setMarkdownText] = useState<string>(
    props?.markdown_contents || '',
  );
  const [_category, setCategory] = useState(props?.category);
  const [tags, setTags] = useState<string[]>(props?.markdown_tag || []);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractSummary = (str: string) => {
    const splitByHr = str.split('\n---')[0];
    const splitByBlockquote = splitByHr.split('\n>')[0];
    const trimmedSummary = splitByBlockquote.trim();

    if (trimmedSummary.length > 50) {
      return trimmedSummary.slice(0, 100) + '...';
    }

    return trimmedSummary;
  };

  const onClickSave = async () => {
    setLoading(true);
    const form = {
      userName: data?.user?.name,
      userId: data?.user?.username,
      markdown_title: title,
      markdown_contents: markdownText,
      category: _category,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      tag: tags,
      summary: extractSummary(markdownText),
    };

    if (props?.contentId) Object.assign(form, { id: props?.contentId });

    try {
      let result;
      if (props?.contentId) result = await db.update(props?.path, form);
      else result = await db.create(props?.path, form);

      if (props?.contentId) {
        router.refresh();
        if (props?.setEditPage) props?.setEditPage(false);
        setLoading(false);
      } else {
        router.push(`/pinetree/${props?.path}/${result?.data?.id}`);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
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
          height: 'calc(85vh)',
          py: 2,
          overflowY: 'auto',
          overflowX: 'hidden',
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
    </>
  );
}
