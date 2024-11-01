'use client';
import { Button } from '@mui/material';
import db from '@/api/module';
import { good } from '@/config/default';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CreateButton = async () => {
  const onClickCreate = async () => {
    for (const item of good) {
      await db.create('japanese', item);
      await sleep(500); // 0.5초 딜레이
    }
  };
  return (
    <Button
      onClick={() => {
        onClickCreate();
      }}
    >
      일괄등록
    </Button>
  );
};

export default CreateButton;
