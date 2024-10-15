#!/bin/bash

# 선택을 위한 메뉴 출력
echo "Select the project to run:"
echo "1) studio"
echo "2) blog"

# 사용자로부터 입력 받기
read -p "Enter the number (1 or 2): " selection

# 입력 값에 따라 studio 또는 blog workspace 실행
if [ "$selection" -eq 1 ]; then
  PROJECT="studio"
elif [ "$selection" -eq 2 ]; then
  PROJECT="blog"
else
  echo "Invalid selection. Please choose 1 or 2."
  exit 1
fi

# 명령 인자에 따라 build 또는 start 실행
if [ "$1" == "build" ]; then
  echo "Running build for $PROJECT..."
  pnpm run build --filter=$PROJECT
elif [ "$1" == "start" ]; then
  echo "Running start for $PROJECT..."
  pnpm run start --filter=$PROJECT
else
  echo "Invalid command. Use 'build' or 'start'."
  exit 1
fi
