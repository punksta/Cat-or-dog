
appcenter distribute release \
    -f "android/app/build/outputs/apk/release/app-release.apk" \
    -r "automatic build '$TRAVIS_BUILD_WEB_URL'" \
    -a punksta-protonmail.com/Cat-or-dog \
    -g public \
    --disable-telemetry
