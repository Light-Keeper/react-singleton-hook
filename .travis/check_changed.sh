CHANGED_FILES=$(git diff --name-status HEAD~1...HEAD .)
if [ -z "$CHANGED_FILES" ]
then
      echo "No changes in $(pwd)"
      exit 137
fi

echo "There were changes in $LOCATION changes:  $(pwd)"
exit 0
