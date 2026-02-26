'use client';

import { usePaymentHistory } from './hooks/usePaymentHistory';
import PaymentHistoryView from './section/PaymentHistoryView';

export default function Container() {
  const {
    data,
    keyword,
    setKeyword,
    statusFilter,
    setStatusFilter,
    total,
    pagination,
    setPagination,
    isLoading,
    refetch,
  } = usePaymentHistory();

  return (
    <PaymentHistoryView
      data={data}
      keyword={keyword}
      total={total}
      pagination={pagination}
      setPagination={setPagination}
      statusFilter={statusFilter}
      onKeywordChange={setKeyword}
      onStatusChange={setStatusFilter}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}
