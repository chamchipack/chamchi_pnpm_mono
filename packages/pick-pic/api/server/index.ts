import z from 'zod';

export interface ClientResponseById<T> {
  message: string;
  data: T | null;
}

export interface ClientResponseGetItemsArray<T> {
  status: number;
  message: string;
  result: 'OK' | 'failed';
  data: {
    items: T[];
    totalCount: number;
  };
}

export const fetchGetItemsArray = async <T>(
  url: string,
  cacheStableTime: number,
): Promise<ClientResponseGetItemsArray<T>> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(cacheStableTime === 0
        ? { cache: 'no-store' }
        : {
            next: { revalidate: cacheStableTime ?? 10 },
          }),
    });

    if (!response.ok) {
      return {
        status: response.status,
        message: `요청 실패: 서버에서 오류가 발생했습니다. (코드: ${response.status})`,
        result: 'failed',
        data: { items: [], totalCount: 0 },
      };
    }

    const data = await response.json();
    return { ...data, result: 'OK', message: 'success' };
  } catch (error) {
    return {
      status: 500,
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      result: 'failed',
      data: { items: [], totalCount: 0 },
    };
  }
};

export async function fetchAllAliases(): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/seller/seo/alias`,
      {
        next: { revalidate: 60 * 60 }, // 1시간 캐싱 (선택)
      },
    );

    if (!res.ok) throw new Error('Failed to fetch aliases');

    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error('Alias fetch error:', error);
    return [];
  }
}

// 단일 데이터 받음
export interface ClientResponseGetItem<T> {
  status: number;
  message: string;
  result: 'OK' | 'failed';
  vacationDates?: string[];
  data: T | null;
}

export const fetchGetItem = async <T>(
  url: string,
  cacheStableTime: number,
): Promise<ClientResponseGetItem<T>> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(cacheStableTime === 0
        ? { cache: 'no-store' }
        : {
            next: { revalidate: cacheStableTime ?? 10 },
          }),
    });

    if (!response.ok) {
      return {
        status: response.status,
        message: `요청 실패: 서버에서 오류가 발생했습니다. (코드: ${response.status})`,
        result: 'failed',
        data: null,
      };
    }

    const data = await response.json();

    return { ...data, result: 'OK' };
  } catch (error) {
    return {
      status: 500,
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      result: 'failed',
      data: null,
    };
  }
};

///

type ApiResponse<T> = {
  status: number;
  message: string;
  result: 'success' | 'failed';
  data: { items: T[]; totalCount: number };
};

export const fetchGetItemsArrayForZod = async <T>(
  url: string,
  cacheStableTime: number,
  parseWithZod?: z.ZodArray<z.ZodType<T>>,
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ...(cacheStableTime === 0
        ? { cache: 'no-store' }
        : { next: { revalidate: cacheStableTime } }),
    });

    if (!response.ok) {
      return {
        status: response.status,
        message: `요청 실패: 서버에서 오류가 발생했습니다. (코드: ${response.status})`,
        result: 'failed',
        data: { items: [], totalCount: 0 },
      };
    }

    const json = await response.json();
    const arr = json?.data?.items ?? [];

    if (parseWithZod) {
      const result = parseWithZod.safeParse(arr);
      if (!result.success) {
        console.error('❌ Zod validation error:', result.error);
        return {
          status: 400,
          message: '데이터 형식이 올바르지 않습니다.',
          result: 'failed',
          data: { items: [], totalCount: 0 },
        };
      }

      return {
        status: 200,
        message: 'success',
        result: 'success',
        data: {
          items: result.data,
          totalCount: json?.data?.totalCount ?? 0,
        },
      };
    }

    return {
      status: 200,
      message: 'success',
      result: 'success',
      data: {
        items: arr,
        totalCount: json?.data?.totalCount ?? 0,
      },
    };
  } catch (error) {
    console.error('❌ fetch error:', error);
    return {
      status: 500,
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      result: 'failed',
      data: { items: [], totalCount: 0 },
    };
  }
};
