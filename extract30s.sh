#!/bin/bash

set -e

# Create temporary directories
mkdir -p clipped_mp3
true > list.txt

# Process MP3 files
find . -type f -iname "*.mp3" -print0 | while IFS= read -r -d '' file; do
    echo "Processing: $file"
    duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file")
    
    if (( $(echo "$duration >= 30" | bc -l) )); then
        safe_name=$(echo "${file#./}" | tr '/' '_' | tr -cd 'a-zA-Z0-9_.' | sed 's/\.mp3$//i')
        output="clipped_mp3/${safe_name}_clip.mp3"
        
        # Extract last 30 seconds and convert to standardized MP3
        ffmpeg -nostdin -sseof -30 -i "$file" -t 30 -c:a libmp3lame -q:a 2 "$output"
        echo "file '$output'" >> list.txt
    else
        echo "Skipping: $file (duration < 30s)"
    fi
done

# Concatenate clipped portions
if [ -s list.txt ]; then
    ffmpeg -f concat -safe 0 -i list.txt -c copy combined_clips.mp3
    echo "Final compilation created: combined_clips.mp3"
else
    echo "No files with sufficient duration were processed"
fi

# Cleanup
rm -rf clipped_mp3 list.txt
