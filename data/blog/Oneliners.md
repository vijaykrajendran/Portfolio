---
title: "How to get the highest value in Bash output"
date: '2024-05-20'
tags: ['Unix', 'Command Line', 'System Administration']
draft: false
summary: 'Use sort to get the highest value in the list'
images: ['/static/blogs/codeshare.io.webp']
authors: ['default']
---


## The Command

```bash
sort -rnk3 file 
```

## Sorting a File Using the `sort` Command

The `sort` command in Unix and Unix-like operating systems (such as Linux and macOS) is used to sort the lines of text files. This document explains the usage of the command `sort -rnk3 file` in detail.

## Command Breakdown

- `sort`: The command itself that performs the sorting.
- `-r`: This flag sorts the input in reverse order.
- `-n`: This flag interprets the third field as a number.
- `-k3`: This flag specifies that the sorting should be based on the third field (column).

In combination, `sort -rnk3 file` sorts the lines of the file in reverse numerical order based on the third column.

## Example

Suppose `file` contains the following lines:

apple 10 15
banana 20 5
cherry 30 25
date 40 20


### Command: `sort -rnk3 file`

1. **Sort by Third Column (Numerical)**: 
    - `15`
    - `5`
    - `25`
    - `20`

2. **Sort in Reverse Order**: 
    - `25`
    - `20`
    - `15`
    - `5`

### Result:

After running the command, the file would be sorted as follows:

cherry 30 25
date 40 20
apple 10 15
banana 20 5


## Steps to Run the Command

1. **Open Terminal**: On your Unix or Unix-like system.
2. **Run the Command**: Type `sort -rnk3 file` and press Enter.

This command will output the sorted lines to the terminal. If you want to save the sorted output back to the file or another file, you can redirect the output:

```bash
sort -rnk3 file > sorted_file
```

This will write the sorted lines to sorted_file. If you want to overwrite the original file, you can use the mv command to replace it after sorting:

```bash
sort -rnk3 file > temp_file && mv temp_file file
```