'use client';
import React from 'react';
import { useRecentViewedProducts } from './hooks/useRecentViewedProducts';
import RecentViewedList from './RecentViewedList';

const RecentViewedSection = () => {
  const { sortedRecentViews, isLoading } = useRecentViewedProducts();

  if (!isLoading && sortedRecentViews.length === 0) return null;

  return <RecentViewedList items={sortedRecentViews} isLoading={isLoading} />;
};

export default React.memo(RecentViewedSection);
