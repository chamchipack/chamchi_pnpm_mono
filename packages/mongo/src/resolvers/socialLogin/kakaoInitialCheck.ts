import dotenv from "dotenv";
import client from "../../config/mongo";
import { Auth } from "../../schema/socialLogin/type";

dotenv.config();

const database = process.env.DATABASE;

export const kakaoInitialCheck = async (_: undefined, {input}: { input: Auth} ) => {
    const db = client.db(database);
    const authCollection = db.collection<Auth>("auth");
  
    // 현재 시간
    const now = new Date().toISOString();

    
    try {
        const existingUser = await authCollection.findOne({
            social_id: input.social_id,
            provider: input.provider,
        });
        
          if (existingUser) {
            let isAuthenticated = existingUser.is_active ? true : false

            return { status: isAuthenticated ? 200 : 403, isAuthenticated };
          } else {
            return { status: 404, isAuthenticated: false}
          }
        } catch (error) {
            console.log(error)
            // MongoDB 연결 문제
            if (error instanceof Error) {
              console.error("MongoDB Error:", error.message);
              return { status: 500, message: "Database error occurred", error: error.message };
            }
        
            // 예상치 못한 에러 처리
            console.error("Unexpected Error:", error);
            return { status: 500, message: "Unexpected server error" };
          }
}