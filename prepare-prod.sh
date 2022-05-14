#! /bin/bash

# Скрипт для сборки продакшн версии сайта

# Название директории, в которую будет помещена сборка
dir="build-prod"

rm -rf $dir
mkdir $dir
mkdir $dir/build
cp -r build/* $dir/build
mkdir $dir/server
cp -r server/build/* $dir/server
cp package*.json $dir
cp .env $dir
echo "✅ Production version is ready in $dir directory"