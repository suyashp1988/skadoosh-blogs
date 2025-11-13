# Word to Blog Converter

A Python tool to convert Word documents (.docx) to Astro blog posts with automatic image extraction.

## Features

- ✅ **Automatic Markdown Conversion**: Converts Word docs to clean markdown
- ✅ **Image Extraction**: Pulls all images from Word docs and saves them properly
- ✅ **Astro Frontmatter**: Generates proper frontmatter with title, description, date
- ✅ **URL-friendly Slugs**: Auto-generates SEO-friendly URLs
- ✅ **Author Bio**: Automatically adds Suyash's author section
- ✅ **Smart Metadata**: Extracts title and description from document structure

## Installation

```bash
# Install required Python packages
pip install python-docx mammoth requests pillow
```

## Usage

### Basic Conversion
```bash
# Convert a Word document to blog post
python tools/word-to-blog.py "path/to/your/document.docx"

# Convert with custom URL slug
python tools/word-to-blog.py "path/to/your/document.docx" --slug "my-custom-blog-post"

# Specify blog root directory (if running from different location)
python tools/word-to-blog.py "document.docx" --blog-root "c:/path/to/skadoosh-blogs"
```

### Examples

```bash
# Convert Power Automate article
python tools/word-to-blog.py "Power Automate Documentation.docx"
# Output: power-automate-documentation.md

# Convert with specific slug
python tools/word-to-blog.py "My Article.docx" --slug "automate-workflows-2025"
# Output: automate-workflows-2025.md
```

## What It Does

1. **Reads Word Document**: Parses .docx file structure
2. **Extracts Metadata**: 
   - Title (from first heading or paragraph)
   - Description (from first content paragraph)
   - Author (defaults to Suyash Pandey)
   - Publication date (today's date)

3. **Converts Content**:
   - Headers → Markdown headers (`#`, `##`, etc.)
   - Bold/italic → Markdown formatting (`**bold**`, `*italic*`)
   - Lists → Markdown lists (`-` for bullets)
   - Images → Extracted and properly linked

4. **Organizes Files**:
   - Blog post → `src/content/blog/your-slug.md`
   - Images → `public/blog/your-slug/image-01.jpg`, `image-02.jpg`, etc.

5. **Adds Professional Structure**:
   - Astro frontmatter with metadata
   - Author bio section
   - LinkedIn and contact links

## File Structure Created

```
src/content/blog/
├── your-article-slug.md          # Main blog post

public/blog/your-article-slug/
├── image-01.jpg                   # First image (hero image)
├── image-02.jpg                   # Second image
└── image-03.jpg                   # Additional images...
```

## Example Output

**Input**: `Power Automate Guide.docx`

**Generated**: `src/content/blog/power-automate-guide.md`

```markdown
---
title: "Power Automate Guide"
description: "Learn how to automate your workflows with Power Automate..."
pubDate: "2025-11-13"
heroImage: "/blog/power-automate-guide/image-01.jpg"
---

# Power Automate Guide

Content from your Word document, properly converted to markdown...

![Step 1](blog/power-automate-guide/image-02.jpg)

## Next Steps

Additional content...

---

**About the Author**

**Suyash Pandey** is the founder of Skadoosh B.V...
```

## Supported Word Features

- ✅ Headers (H1-H4)
- ✅ Bold and italic text
- ✅ Bulleted and numbered lists
- ✅ Images (JPG, PNG)
- ✅ Paragraphs and line breaks
- ✅ Code snippets
- ⚠️ Tables (basic support)
- ⚠️ Complex formatting (converted to plain text)

## Tips for Best Results

1. **Use Headers**: Structure your document with clear headers (H1, H2, H3)
2. **First Paragraph**: Make your first paragraph a good description (used for meta description)
3. **Image Quality**: Use high-quality images (they'll be preserved)
4. **Simple Formatting**: Stick to basic formatting for best conversion

## Troubleshooting

**Error: Required packages not installed**
```bash
pip install python-docx mammoth requests pillow
```

**Error: Not an Astro blog project**
- Make sure you're running from the blog root directory
- Or use `--blog-root` to specify the correct path

**Images not extracting**
- Ensure images are embedded in Word doc (not just linked)
- Use JPG or PNG format for best compatibility

## Integration with Build Process

After conversion, you can immediately:

```bash
# Build the site
npm run build

# Preview locally
npm run preview

# Deploy
npm run deploy
```

The converter creates production-ready blog posts that work seamlessly with your existing Astro setup.