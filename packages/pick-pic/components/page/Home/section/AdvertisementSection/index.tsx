import HomeBanner from './Banner/HomeBanner';
import useGetEvents from './hooks/useGetEvents';
import AdvertisementContainer from './Popup/AdvertisementContainer';

const AdvertisementSection = async () => {
  const { imageArray, items } = await useGetEvents();

  return (
    <>
      <HomeBanner images={imageArray} />
      <AdvertisementContainer items={items} />
    </>
  );
};

export default AdvertisementSection;
