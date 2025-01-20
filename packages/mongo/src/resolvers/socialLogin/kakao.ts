import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import client from "../../config/mongo";
import { Auth } from "../../schema/socialLogin/type";

dotenv.config();

const database = process.env.DATABASE;

/**
 * @description 카카오 로그인 최초 진입 지점
 * 클라이언트로부터 수신된 것 하나 없이 여기서 카카오 서버로 송신
 */
export const kakaoLogin = async (_: undefined, {input}: { input: Auth} ) => {
  const db = client.db(database);
  const authCollection = db.collection<Auth>("auth");

  // 현재 시간
  const now = new Date().toISOString();

  try {
    // `social_id`와 `provider`로 유저 찾기
    const existingUser = await authCollection.findOne({
      social_id: input.social_id,
      provider: input.provider,
    });


    if (existingUser) {
      // 1. 유저가 이미 존재할 경우, `last_login_at` 업데이트
      await authCollection.updateOne(
        { _id: existingUser._id },
        { $set: { last_login_at: now, updated_at: now } }
      );

      const form = {
        _id: existingUser._id,
        social_id: existingUser.social_id,
        name: existingUser.name,
        provider: existingUser.provider
      }
      return { status: 200, message: '', data: form };
    } else {
      // 2. 유저가 없을 경우, 새로운 문서 생성
      const newUser: Auth = {
        _id: new ObjectId(), // MongoDB ID 생성
        provider: input.provider,
        social_id: input.social_id,
        email: input.email ?? null,
        password: input.password ?? null,
        name: input.name,
        profile_image: input.profile_image,
        refresh_token: input.refresh_token,
        refresh_expires_at: input.refresh_expires_at,
        created_at: now,
        updated_at: now,
        last_login_at: now,
        is_active: true,
        roles: input.roles || ["user"], // 기본 역할을 "user"로 설정
        metadata: input.metadata || {},
      };

      const result = await authCollection.insertOne(newUser);

      const form = {
        _id: result.insertedId,
        social_id: input.social_id,
        name: input.name,
        provider: input.provider
      }
      return { status: 201, message: '', data: form  };
    }
  } catch (error) {
    console.log(error)
    // MongoDB 연결 문제
    if (error instanceof Error) {
      console.error("MongoDB Error:", error.message);
      return { status: 500, _id: null, message: "Database error occurred", error: error.message };
    }

    // 예상치 못한 에러 처리
    console.error("Unexpected Error:", error);
    return { status: 500, _id: null, message: "Unexpected server error" };
  }
};
