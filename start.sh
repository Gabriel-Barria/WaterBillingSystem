#!/bin/bash
apachectl start
inotifywait -m -e create -e modify -e delete -e move /var/www/html |
while read path action file; do
    echo "File $file in directory $path was $action"
    apachectl restart
done

