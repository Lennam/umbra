if [ "$TRAVIS_BRANCH" != "dev" ]; then 
    exit 0;
fi
git config --global user.email '392003815@qq.com'
git config --global user.name 'Lennam'
git remote set-branches --add origin master
git fetch
git reset --hard
git checkout master
git merge --ff-only "$TRAVIS_COMMIT"
git push git+ssh://git@github.com/${TRAVIS_REPO_SLUG}.git master