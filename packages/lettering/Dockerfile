# 1단계: 빌드 단계
# FROM node:20.12.2 AS builder
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 4. 루트 패키지 파일 복사 (빌드 시에만 사용됨)
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

# 5. 공통 패키지와 lettering 패키지의 package.json 파일 복사
COPY ./packages/package/package.json ./packages/package/
COPY ./packages/lettering/package.json ./packages/lettering/

# 6. 의존성 설치 (개발 및 프로덕션 의존성 모두 설치)
RUN npm install -g pnpm
RUN pnpm install --filter=lettering... --filter=package...

# 7. 모든 소스 복사 및 빌드 실행
COPY ./packages/package ./packages/package
COPY ./packages/lettering ./packages/lettering
COPY ./packages/lettering/.env.production ./packages/lettering/.env.production

ENV NODE_ENV=production

RUN pnpm --filter=lettering run build

# 2단계: 실행 단계
# FROM node:20.12.2 AS runner
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

RUN npm install -g pnpm

# 8. 환경 변수 설정 (Next.js 빌드를 위한 production 모드)
ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/packages/lettering/.next /app/.next
COPY --from=builder /app/packages/lettering/public /app/public
COPY --from=builder /app/packages/lettering/package.json /app/package.json

# COPY --from=builder /app/packages/lettering/.next /app/.next
# COPY --from=builder /app/packages/lettering/public /app/public
# COPY --from=builder /app/packages/lettering/package.json /app/package.json
# COPY --from=builder /app/packages/package /app/package
# COPY --from=builder /app/packages/lettering /app/lettering
COPY --from=builder /app/packages/lettering/.env.production /app/.env.production

# 9. 프로덕션 의존성만 설치
RUN pnpm install --prod


# 10. 실제 실행
CMD ["pnpm", "start", "-p", "9500"]