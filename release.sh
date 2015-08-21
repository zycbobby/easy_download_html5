#! /bin/zsh
# from http://ionicframework.com/docs/guide/publishing.html

function myHelp () {
# Using a here doc with standard out.
cat <<-END
Usage:
------
   -h | --help
     Display this help
   -v
     specify version.
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
    -v|--version)
    VERSION="$2"
    shift # past argument
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

if [ -z ${VERSION} ]
then
    echo 'please specify version'
    myHelp
    exit -1
fi

if [ -z ${KEYSTORE} ]
then
    echo 'please specify keystore'
    myHelp
    exit -1
fi


gulp remove-proxy

if [ -e "easydownload-${VERSION}.apk" ]
then
    rm easydownload-${VERSION}.apk
fi

ionic build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE ./platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name
~/Android/Sdk/build-tools/22.0.1/zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk easydownload-${VERSION}.apk
