if [ ! -d "./dist.zip" ];then
echo "dist.zip已存在, 先删除再进行build"
rm dist.zip
else
echo "dist.zip不存在, 开始build"
fi
npm run build
zip -r dist.zip ./dist