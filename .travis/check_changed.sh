CHANGED_FILES=$(git diff --name-status HEAD~1...HEAD .)
if [ -z "$CHANGED_FILES" ]
then
  exit 137
fi
exit 0
