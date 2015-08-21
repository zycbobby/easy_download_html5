#! /bin/zsh
# from http://ionicframework.com/docs/guide/publishing.html

function myHelp () {
# Using a here doc with standard out.
cat <<-END
Usage:
------
   -h | --help
     Display this help
   -k
     specify keystore location
END
}

while [[ $# > 1 ]]
do
key="$1"

case $key in
    -h | --help)
      myHelp
      exit
      ;;
    -k|--keystore)
    KEYSTORE="$2"
    shift # past argument
    ;;
    *)
    ;;
esac
shift # past argument or value
done

if [ -z ${KEYSTORE} ]
then
    echo 'please specify keystore'
    myHelp
    exit -1
fi

gulp remove-proxy

gulp inject-version

if [ -e "easydownload.apk" ]
then
    rm easydownload.apk
fi

ionic build --release android

## Create debug apk
ionic build android

if [ $? -ne 0 ]
then
  exit 9
fi

echo $PASSWORD | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE ./platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name

if [ $? -ne 0 ]
then
  exit 9
fi

zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk easydownload.apk

if [ $? -ne 0 ]
then
  exit 9
fi
