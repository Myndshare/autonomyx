#!/bin/bash

URL="https://example.com" # Replace with the URL you want to test
REQUESTS=100 # Number of requests to make
OUTPUT_FILE="latency_stats.txt"

# Check if curl is installed
if ! command -v curl &> /dev/null
then
    echo "curl could not be found. Please install it and try again."
    exit 1
fi

echo "Testing latency for $URL"
echo "Making $REQUESTS requests"
echo "" > $OUTPUT_FILE

total_time=0
min_time=0
max_time=0

for i in $(seq 1 $REQUESTS); do
    echo -n "Request $i: "
    response_time=$(curl -o /dev/null -s -w "%{time_total}\n" $URL)
    echo $response_time "seconds"
    echo $response_time >> $OUTPUT_FILE

    total_time=$(echo "$total_time + $response_time" | bc -l)

    if (( $(echo "$response_time < $min_time" | bc -l) )) || (( $i == 1 )); then
        min_time=$response_time
    fi

    if (( $(echo "$response_time > $max_time" | bc -l) )); then
        max_time=$response_time
    fi
done

average_time=$(echo "scale=4; $total_time / $REQUESTS" | bc -l)

echo ""
echo "Latency Statistics:"
echo "  Minimum time: $min_time seconds"
echo "  Maximum time: $max_time seconds"
echo "  Average time: $average_time seconds"
echo "Results saved to $OUTPUT_FILE"
