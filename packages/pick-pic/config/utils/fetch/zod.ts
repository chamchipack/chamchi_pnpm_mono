'use client';

import z from 'zod';

export interface SWRResponseSingle<T> {
  message: string;
  status: number;
  result: 'success' | 'failed';
  data: T | null;
}

export const fetchWithZod = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
): Promise<SWRResponseSingle<T>> => {
  if (!url) {
    return {
      status: 400,
      message: `URL을 확인해주세요`,
      result: 'failed',
      data: null,
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: response.status,
        message: `요청 실패: 서버에서 오류가 발생했습니다. (코드: ${response.status})`,
        result: 'failed',
        data: null,
      };
    }

    const json = await response.json();

    if (schema) {
      const parsed = schema.safeParse(json.data);

      if (!parsed.success) {
        console.error('❌ Zod validation error:', parsed.error);
        return {
          status: 400,
          message: `데이터 형식이 올바르지 않습니다. ${parsed.error}`,
          result: 'failed',
          data: null,
        };
      }

      return {
        status: 200,
        message: 'success',
        result: 'success',
        data: parsed.data,
        // data: {
        //   items: result.data,
        //   totalCount: json?.data?.totalCount ?? 0,
        // },
      };
    }

    return {
      status: 200,
      message: 'success',
      result: 'success',
      data: json.data,
    };
  } catch (e) {
    return {
      status: 500,
      message: '네트워크 오류가 발생했습니다. catch를 확인해주세요.',
      result: 'failed',
      data: null,
    };
  }
};

export interface SWRResponseArray<T> {
  message: string;
  status: number;
  result: 'success' | 'failed' | 'pending';
  data: {
    items: T[];
    totalCount: number;
  };
}

export const fetchWithZodArray = async <T>(
  url: string,
  schema: z.ZodSchema<T[]>,
): Promise<SWRResponseArray<T>> => {
  if (!url) {
    return {
      status: 400,
      message: `URL을 확인해주세요`,
      result: 'failed',
      data: { items: [], totalCount: 0 },
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: response.status,
        message: `요청 실패: 서버에서 오류가 발생했습니다. (코드: ${response.status})`,
        result: 'failed',
        data: { items: [], totalCount: 0 },
      };
    }

    const json = await response.json();

    const parsed = schema.safeParse(json.data.items);

    if (!parsed.success) {
      console.error('❌ Zod validation error:', parsed.error);
      return {
        status: 400,
        message: `데이터 형식이 올바르지 않습니다. ${parsed.error}`,
        result: 'failed',
        data: { items: [], totalCount: 0 },
      };
    }

    return {
      status: 200,
      message: 'success',
      result: 'success',
      data: {
        items: parsed.data,
        totalCount: json?.data?.totalCount ?? parsed.data.length,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: '네트워크 오류가 발생했습니다. catch를 확인해주세요.',
      result: 'failed',
      data: { items: [], totalCount: 0 },
    };
  }
};
