ionic build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $1 ./platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name
~/Android/Sdk/build-tools/22.0.1/zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk easydownload.apk