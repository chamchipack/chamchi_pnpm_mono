import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    socialId: { type: String, required: true }, // 소셜 아이디
    provider: { type: String, required: true }, // 소셜 타입
    name: { type: String, default: '' }, // 이름
    nickname: { type: String, required: true, unique: true }, // 닉네임
    isDeleted: { type: Boolean, default: false }, // 삭제 여부
  },
  {
    timestamps: true,
  },
);

export const User = model('User', UserSchema, 'User');
