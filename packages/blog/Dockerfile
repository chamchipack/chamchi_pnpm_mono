# 1단계: 빌드 단계
FROM node:20.12.2 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 4. 루트 패키지 파일 복사 (빌드 시에만 사용됨)
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

# 5. 공통 패키지와 blog 패키지의 package.json 파일 복사
COPY ./packages/package/package.json ./packages/package/
COPY ./packages/blog/package.json ./packages/blog/

# 6. 의존성 설치 (개발 및 프로덕션 의존성 모두 설치)
RUN npm install -g pnpm
RUN pnpm install --filter=blog... --filter=package...

# 7. 모든 소스 복사 및 빌드 실행
COPY ./packages/package ./packages/package
COPY ./packages/blog ./packages/blog
COPY ./packages/blog/.env.production ./packages/blog/.env.production

ENV NODE_ENV=production

RUN pnpm --filter=blog run build

# 2단계: 실행 단계
FROM node:20.12.2 AS runner

# 작업 디렉토리 설정
WORKDIR /app

RUN npm install -g pnpm

# 8. 환경 변수 설정 (Next.js 빌드를 위한 production 모드)
ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/packages/blog/.next /app/.next
COPY --from=builder /app/packages/blog/public /app/public
COPY --from=builder /app/packages/blog/package.json /app/package.json
COPY --from=builder /app/packages/package /app/package
COPY --from=builder /app/packages/blog /app/blog
COPY --from=builder /app/packages/blog/.env.production /app/.env.production

# 9. 프로덕션 의존성만 설치
RUN pnpm install --prod

# 10. 실제 실행
CMD ["pnpm", "start", "-p", "7575"]


# # 1. 베이스 이미지 설정 (Node 20.12.2)
# FROM node:20.12.2

# # 2. 작업 디렉토리 설정
# WORKDIR /app

# # 3. pnpm 설치 (글로벌로 설치)
# RUN npm install -g pnpm

# # 4. 루트 패키지 파일 복사
# COPY ./package.json ./
# COPY ./pnpm-lock.yaml ./
# COPY ./pnpm-workspace.yaml ./

# # 5. 공통 패키지와 blog 패키지의 package.json 파일 복사
# COPY ./packages/package/package.json ./packages/package/
# COPY ./packages/blog/package.json ./packages/blog/

# # 6. 의존성 설치 (blog 패키지와 package 패키지 모두 설치)
# RUN pnpm install --filter=blog... --filter=package...

# # 7. 모든 소스 복사
# COPY ./packages/package ./packages/package
# COPY ./packages/blog ./packages/blog
# COPY ./packages/blog/.env.production ./packages/blog/.env.production

# # 8. 환경 변수 설정 (Next.js 빌드를 위한 production 모드)
# ENV NODE_ENV=production

# # 9. blog 패키지 빌드 실행
# RUN pnpm --filter=blog run build

# # 10. 실제 실행
# CMD ["pnpm", "--filter=blog", "start", "-p", "7575"]

