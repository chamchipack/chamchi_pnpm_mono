# 1. Node.js 공식 이미지 사용 (경량 버전)
FROM node:20-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# 4. pnpm 설치 (최신 버전 보장)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 5. 의존성 설치 (node_modules 생성)
RUN pnpm install --frozen-lockfile

# 6. 소스 코드 복사
COPY . .

# 7. Nodemon으로 서버 실행 (소스 코드 변경 시 반영)
CMD ["pnpm", "nodemon", "./src/server.ts"]
