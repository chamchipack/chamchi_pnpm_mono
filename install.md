# pnpm monorepo
pnpm init (루트)

touch pnpm-workspace.yaml
packages:
  - 'packages/니프로젝트'

mkdir packages
cd packages
mkdir example_project
cd example_project
pnpm init


# 패키지를 전역에 설치하는 경우
pnpm add 원하는거 -w
# 패키지를 특정 프로젝트에 설치하는 경우
pnpm add 원하는거 --filter 프로젝트명
# package 에 설치된 mui studio에서 공유 사용법
pnpm add package -F studio
pnpm add @mui/material ...기타등등 -F studio
  => studio에 설치가 되나, 의존성을 공유하게 됨.
  파일이 또 생겨서 존나 많은것 같지만 du -sh . 을 보면 전체 용량은 같음

# 용량이 줄음
단일 nextjs 프로젝트 : 2.1G
npm monorepo : 1.6G
pnpm monorepo : 845m

  # 공통화 대상
  - 인증