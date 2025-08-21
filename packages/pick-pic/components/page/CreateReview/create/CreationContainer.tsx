'use client';

import { useCreateReview } from '@/api/client/review';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { handleNavigation } from '@/config/navigation';
import { useAlert } from '@/config/utils/hooks/alert/useAlert';
import { formDataTools } from '@/config/utils/hooks/formDataTools';
import { AlertCircle, ImagePlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  marketName: string;
  productName: string;
  orderId: string;
  userId: string;
  isDeleted: boolean;
}

function StarRating({
  max = 5,
  value,
  onChange,
}: {
  max?: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        return (
          <svg
            key={index}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 cursor-pointer transition-colors"
            fill={(hover ?? value) >= index ? '#FFD700' : '#E5E7EB'} // gold or gray-200
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.751l-6 5.849L19.335 24 12 20.01 4.665 24 6 15.6 0 9.75l8.332-1.733z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function CreationContainer({
  marketName,
  productName,
  orderId,
  userId,
  isDeleted = false,
}: Props) {
  const alert = useAlert();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createReview = async () => {
    setLoading(true);
    const form = {
      images: file,
      rating: String(rating),
      comment: reviewText,
      userId,
      orderId,
    };

    const validateForm = () => {
      if (isDeleted) {
        return '현재 운영이 종료된 가게입니다.';
      }
      if (!form.orderId) {
        return '주문자 정보가 누락되었습니다. 이전화면으로 돌아가주세요!';
      }
      if (!form.comment || rating <= 0) {
        return '평가와 내용이 입력되지 않았어요!';
      }
      if (!userId) {
        return '로그인 후 이용할 수 있어요!';
      }
      return null;
    };

    const errorMessage = validateForm();

    if (errorMessage) {
      return alert({
        message: errorMessage,
        type: 'warning',
      });
    }

    const formData = formDataTools(form, {
      imageKeys: ['images'],
      jsonKeys: [],
      ignoreKeys: [],
    });

    const { message, status } = await useCreateReview(formData);
    alert({
      message: message,
      type: status,
    });
    setLoading(false);

    if (status === 'error') return;

    handleRouter();
  };

  const handleRouter = () => {
    setTimeout(() => {
      const isWebView = handleNavigation({ path: 'home', status: 'replace' });
      if (!isWebView) return router.replace('/');
      setLoading(false);
    }, 1000);
  };

  const handleClose = () => setOpen(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
    setFile(null);

    const input = document.getElementById('image-input') as HTMLInputElement;
    if (input) {
      input.value = ''; // ✅ 파일 인풋 초기화
    }
  };

  return (
    <>
      <div className="px-2">
        <div className="flex items-center bg-gray-100 rounded px-3 py-1">
          <AlertCircle className="text-blue-500 mr-2" fontSize="small" />
          <span className="text-xs text-gray-600">
            사진입력은 필수가 아닙니다
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4 px-2">
        <div className="flex gap-4 items-center">
          <div
            className="w-28 h-28 border border-gray-300 rounded relative flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() =>
              !selectedImage && document.getElementById('image-input')?.click()
            }
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">사진을 선택해주세요</span>
            )}
            <button
              className="absolute top-0 right-0 p-1"
              onClick={(e) => {
                e.stopPropagation();
                selectedImage
                  ? handleImageReset()
                  : document.getElementById('image-input')?.click();
              }}
            >
              {selectedImage ? (
                <X fontSize="small" className="text-red-500" />
              ) : (
                <ImagePlus fontSize="small" />
              )}
            </button>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="h-28 flex flex-col items-start">
            <span className="text-base font-bold">{productName}</span>
            <span className="text-sm text-gray-500">{marketName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">평점</span>
          {/* <CustomRating value={rating} onChange={(val) => setRating(val)} /> */}
          {/* <Rating
            name="review-rating"
            value={rating}
            precision={0.5}
            onChange={(_, newValue) => setRating(newValue || 0)}
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'gold',
              },
              '& .MuiRating-iconEmpty': {
                color: 'gray',
              },
            }}
          /> */}

          <StarRating value={rating} onChange={setRating} />
        </div>

        <div>
          <p className="text-sm font-bold">내용</p>
          <textarea
            className="w-full border border-gray-300 rounded mt-1 p-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={4}
            maxLength={150}
            placeholder="리뷰를 작성해주세요."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <p className="text-xs text-right text-gray-400 mt-1">
            {reviewText.length}/150
          </p>
        </div>

        <button
          className={`w-full h-10 font-semibold rounded transition-colors duration-200 ${
            loading || !reviewText
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-main text-white hover:bg-main/90'
          }`}
          disabled={loading || (!reviewText && !rating)}
          onClick={() => setOpen(true)}
        >
          리뷰 작성하기
        </button>
      </div>

      <ActionConfirmationModal
        open={open}
        handleClose={handleClose}
        title={marketName || '리뷰 등록'}
        content="리뷰를 등록하시겠어요?"
        processing={loading}
        onClickCheck={createReview}
      />
    </>
  );
}
