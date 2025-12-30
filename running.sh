#!/bin/bash

# 선택을 위한 메뉴 출력
echo "개발모드를 실행할 프로젝트를 선택해주세요:"
echo "1) studio"
echo "2) blog"
echo "3) voca"
echo "4) mongo"
echo "5) lettering"

# 사용자로부터 입력 받기
read -p "Enter the number (1 or 2): " selection

# 입력 값에 따라 studio 또는 blog workspace 실행
if [ "$selection" -eq 1 ]; then
  echo "Running 'studio' project in dev mode..."
  pnpm --filter studio dev --port 7676
elif [ "$selection" -eq 2 ]; then
  echo "Running 'blog' project in dev mode..."
  pnpm --filter blog dev --port 7500
elif [ "$selection" -eq 3 ]; then
  echo "Running 'voca' project in dev mode..."
  pnpm --filter pick-pic dev --port 9500
elif [ "$selection" -eq 4 ]; then
  echo "Running 'voca' project in dev mode..."
  cd ./packages/mongo
  pnpm nodemon ./src/server.ts
  # pnpm --filter voca dev --port 8300
elif [ "$selection" -eq 5 ]; then
  echo "Running 'chamlangapi' project in dev mode..."
  cd ./packages/chamlangapi
  pnpm nodemon ./src/index.ts
else
  echo "Invalid selection. Please choose 1 or 2."
  exit 1
fi
