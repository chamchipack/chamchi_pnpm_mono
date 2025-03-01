import { Box } from '@mui/material';

type SellerImageProps = {
  images: string[]; // ✅ images를 선택적(`?`)으로 변경
};

export default function SellerMainImage({ images = [] }: SellerImageProps) {
  const [image = '/cake1.png'] = images;

  return (
    <Box
      component="img"
      src={image}
      alt="Seller Image"
      sx={{
        width: '100%',
        height: 250,
        objectFit: 'cover',
      }}
    />
  );
}
