import { ResponseStatus, Status } from '@/types/enums/enums';
import {
  DataStructureKey,
  SchemaTransform,
  StructuredDataSchemas,
} from '@/types/schema/default';
import useSWR from 'swr';

interface ClientResponse<T> {
  message: string;
  data: boolean;
}

interface FetchResponse {
  message: string;
  status: Status;
}

export const useCheckAlarm = <
  T extends DataStructureKey,
  Op extends 'none' | 'Omit' | 'Pick' | 'Partial' | 'Readonly' = 'none',
  F extends keyof StructuredDataSchemas[T] = never,
>(
  userId: string,
) => {
  if (!userId) return { data: { data: false } };
  return useSWR<ClientResponse<SchemaTransform<T, Op, F>>>(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/isRead/${userId}`,
  );
};

export async function deleteAccount(id: string): Promise<FetchResponse> {
  if (!id)
    return {
      message: '계정 정보가 없습니다!',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/admin/user/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    // return await response.json(); // 또는 response.text() 등 응답 형태에 따라 변경
    return {
      message: '정상적으로 처리되었습니다',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return { message: '오류가 발생했어요!', status: ResponseStatus.error };
  }
}

export async function updateNickname(
  id: string,
  nickname: string,
): Promise<FetchResponse> {
  if (!id || !nickname)
    return {
      message: '아이디나 닉네임이 없어요!',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/admin/user/nickname/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '닉네임이 변경되었어요!',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return { message: '오류가 발생했어요!', status: ResponseStatus.error };
  }
}

export async function updateAlarms(
  id: string,
  alarms: { isMarketingAlarm?: boolean; isAlarm?: boolean },
): Promise<FetchResponse> {
  if (!id || !alarms)
    return { message: '아이디나 값이 없어요!', status: ResponseStatus.error };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/alarm/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alarms),
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return { message: '변경되었어요!', status: ResponseStatus.success };
  } catch (err) {
    return { message: '오류가 발생했어요!', status: ResponseStatus.error };
  }
}

type Update = {
  userId: string;
  phoneNumber: string;
};

export const updatePhoneNumber = (form: any) =>
  fetchAPI('/api/auth/identify/mobile', form);

export async function updateProfileImage(
  image: FormData,
  userId: string,
): Promise<FetchResponse> {
  if (!image || !userId)
    return {
      message: '유저 정보가 잘못되었어요!',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/user/profile/${userId}`,
      {
        method: 'PUT',
        body: image, // ✅ FormData 그대로 전송
        // headers 생략: fetch가 multipart/form-data를 자동 설정함
      },
    );

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '이미지가 변경되었어요!',
      status: ResponseStatus.success,
    };
  } catch (err) {
    return { message: '오류가 발생했어요!', status: ResponseStatus.error };
  }
}

const fetchAPI = async (url: string, data: Update) => {
  if (!data.phoneNumber || !data.userId)
    return {
      message: '전화번호 혹은 유저 정보가 없습니다!',
      status: ResponseStatus.error,
    };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { message = '' } = await response.json();
      return { message, status: ResponseStatus.error };
    }

    return {
      message: '변경 되었습니다!',
      status: ResponseStatus.success,
    };
  } catch (error) {
    return { message: '오류가 발생했어요!', status: ResponseStatus.error };
  }
};
