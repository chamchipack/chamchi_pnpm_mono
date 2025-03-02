export const formatMoney = (num: number): string => {
  return num.toLocaleString('en-US'); // 1,234,567 형태로 변환
};
