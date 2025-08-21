/**
 *
 * usePOSTSearchKeyword 키워드로 검색시 서버에 누적 데이터 쌓기
 *
 */
export async function usePOSTSearchKeyword(keyword: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      },
    );

    return await res.json();
  } catch (err) {}
}
