#!/bin/bash

# to run this file
# open terminal, CD to folder containg this file and numbers.txt
# type ./numbers.sh


# load file
# sort numerically
# find unique numbers remove and count total instances - returns [count] [num]
# sort decending
# return top 5
# collapse multiple spaces per line (tr squeeze)
# cut on space per line, return 3rd field
cat numbers.txt | sort | uniq -c | sort -nr | head  -5 | tr -s ' ' | cut -d ' ' -f 3
