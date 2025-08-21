type FormDataValue =
  | File
  | string
  | number
  | boolean
  | object
  | null
  | undefined;

interface UseFormDataOptions {
  jsonKeys?: string[]; // JSON.stringify로 처리할 key
  imageKeys?: string[]; // 이미지 업로드용 key
  ignoreKeys?: string[]; // 무시할 key
}

export function formDataTools(
  data: Record<string, FormDataValue>,
  options: UseFormDataOptions = {},
): FormData {
  const formData = new FormData();
  const { jsonKeys = [], imageKeys = [], ignoreKeys = [] } = options;

  Object.entries(data).forEach(([key, value]) => {
    if (ignoreKeys.includes(key)) return;
    if (value === undefined || value === null) return;

    // 이미지 처리
    if (imageKeys.includes(key)) {
      const handleFile = (file: any) => {
        const realFile =
          file?.originFileObj instanceof File ? file.originFileObj : file;
        if (realFile instanceof File) {
          formData.append(key, realFile);
        }
      };

      if (Array.isArray(value)) {
        value.forEach(handleFile);
      } else {
        handleFile(value);
      }

      return;
    }

    // 객체 배열 처리 (JSON 변환)
    if (jsonKeys.includes(key)) {
      try {
        formData.append(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`❗ JSON stringify 실패: ${key}`, e);
      }
      return;
    }

    // 일반 필드 처리
    formData.append(key, String(value));
  });

  return formData;
}

export function base64ToFile(base64: string, filenamePrefix = 'image') {
  // base64 문자열에서 MIME 타입 추출
  const arr = base64.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch?.[1] || 'image/jpeg'; // fallback

  const extension = mime.split('/')[1]; // 예: image/png → png

  const byteString = atob(arr[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const file = new File([ab], `${filenamePrefix}.${extension}`, {
    type: mime,
  });
  return file;
}
