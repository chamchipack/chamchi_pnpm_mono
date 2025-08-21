import { UserSchema } from '@/types/schema/UserSchema';
import { CompanyInfoSection } from '../Home/section';
import {
  HeaderSection,
  MobileAuthentificationSection,
  ProfileImageSection,
  ProfileNameSection,
  ProviderSection,
  UserAssetsSection,
} from './section';

type User = Omit<
  UserSchema,
  'isDeleted' | 'socialId' | 'createdAt' | 'updatedAt'
>;

export default function UserLayout(user: User) {
  return (
    <div className="flex flex-col min-h-screen pb-0 justify-between">
      <div className="mb-10">
        <div className="relative h-[60px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full px-4 pt-4">
            <HeaderSection />
          </div>
        </div>

        <div className="mt-6">
          <ProfileImageSection profile={user?.profile} userId={user?._id} />
          <ProfileNameSection nickname={user?.nickname} userId={user?._id} />
          <div className="flex justify-center gap-2 my-4">
            <MobileAuthentificationSection phoneNumber={user?.phoneNumber} />
            <ProviderSection provider={user?.provider} />
          </div>
        </div>

        <UserAssetsSection />
      </div>

      <CompanyInfoSection />
    </div>
  );
}
