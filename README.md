# Synopsis

Create a printable PDF of posts on geepawhill.org

# Installation

You will, unfortunately, need node and Docker installed on your system.

Note sure if this works on Windows, but it should work on Linux and MacOS.

# Usage

Edit urls.txt to contain newline-separated links to posts you want to include in the PDF.

```
npm install

# Create PDFs in out/
npm start

# Create a merged out.pdf
npm run merge
```
