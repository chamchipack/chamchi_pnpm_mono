export const withRetryTransaction = async (session: any, txnFunc: any) => {
  const maxRetries = 3;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await txnFunc(); // 트랜잭션 함수 실행
      break; // 성공 시 종료
    } catch (error: any) {
      if (error.hasErrorLabel('TransientTransactionError')) {
        retries++;
        console.log(`Retrying transaction... (${retries}/${maxRetries})`);
        await session.abortTransaction();
        await session.startTransaction();
      } else {
        throw error; // 재시도할 수 없는 오류 발생 시
      }
    }
  }
};
