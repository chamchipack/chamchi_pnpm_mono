# 1단계: 빌드 단계
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 1. pnpm 최신 버전 설치
RUN npm install -g pnpm@latest

# 2. 패키지 매니페스트 파일 복사
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

# 3. mongodb 관련 패키지의 package.json 복사
COPY ./packages/mongo/package.json ./packages/mongo/

# 4. 의존성 설치 (개발 및 프로덕션 의존성 모두 설치)
RUN pnpm install --filter=mongo...

# 5. 모든 소스 복사 및 빌드 실행
COPY ./packages/mongo ./packages/mongo
COPY ./packages/mongo/.env ./packages/mongo/.env


ENV NODE_ENV=production

# 6. MongoDB Express 실행을 위한 빌드 (필요하면 추가)
RUN pnpm --filter=mongo run build

# 2단계: 실행 단계
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

RUN npm install -g pnpm@latest

# 7. 환경 변수 설정 (production 모드)
ENV NODE_ENV=production

# 8. 빌드 결과물만 복사
COPY --from=builder /app/packages/mongo/dist /app/dist
COPY --from=builder /app/packages/mongo/package.json /app/package.json
COPY --from=builder /app/packages/mongo/.env /app/.env

# 9. 프로덕션 의존성만 설치
RUN pnpm install --prod

# 10. MongoDB Express 서버 실행
CMD ["pnpm", "start"]
