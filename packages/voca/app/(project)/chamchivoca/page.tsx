'use client';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const languages = ['japanese', 'english'];

  const handleNavigation = (language: string) => {
    router.push(`/chamchivoca/${language}`);
  };

  return (
    <>
      <div>
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => handleNavigation(language)}
            style={{ margin: '10px', padding: '10px' }}
          >
            {language}
          </button>
        ))}
      </div>
    </>
  );
};

export default page;
