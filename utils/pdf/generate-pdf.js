const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const { glob } = require('glob');
const { PDFDocument } = require('pdf-lib');
const yaml = require('js-yaml');
const sass = require('sass');

const CONFIG = {
  docsDir: path.join(__dirname, '../../src/pages'),
  outputDir: path.join(__dirname, '../../pdf-output'),
  cssDir: __dirname,
  configFile: path.join(__dirname, 'pdf.yml'),
  coverFile: path.join(__dirname, 'cover/cover.jpg'),
  baseUrl: 'http://localhost:3000',
  outputFilename: 'JumpServer_Documentation.pdf',
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width: 100%; font-family: sans-serif;">
        <div style="margin: 0 15mm; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 6pt; color: grey; margin-top: 18px;">Copyright © 2025 LXware, Inc. All rights reserved.</div>
          <div style="font-size: 15pt; color: #2b937c; font-weight: bold; font-family: 'Microsoft YaHei', sans-serif;">JumpServer</div>
        </div>
        <div style="width: 100%; border-top: 6px solid #2b937c; margin-top: 5px; margin-left: -6%;"></div>
      </div>
    `,
    footerTemplate: `
      <div style="width: 100%; text-align: center; font-size: 10pt; color: grey;">
        - <span class="pageNumber"></span> -
      </div>
    `
  }
};

async function loadConfig() {
  try {
    const fileContent = await fs.readFile(CONFIG.configFile, 'utf8');
    const config = yaml.load(fileContent);
    return config.nav || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('⚠️ No pdf.yml found, falling back to directory scan.');
      return null;
    }
    throw error;
  }
}

function flattenNav(navItems, result = []) {
  for (const item of navItems) {
    if (typeof item === 'string') {
      result.push({ title: path.basename(item, '.mdx'), path: item });
    } else if (typeof item === 'object') {
      const key = Object.keys(item)[0];
      const value = item[key];
      if (typeof value === 'string') {
        result.push({ title: key, path: value });
      } else if (Array.isArray(value)) {
        flattenNav(value, result);
      }
    }
  }
  return result;
}

async function scanDocsDirectory() {
  const mdxFiles = await glob('**/*.mdx', {
    cwd: CONFIG.docsDir,
    ignore: ['**/node_modules/**']
  });
  mdxFiles.sort();
  const tree = {};
  const files = [];
  mdxFiles.forEach(file => {
    files.push({ title: path.basename(file, '.mdx'), path: file });
    const parts = file.split(path.sep);
    let current = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        if (!current._files) current._files = [];
        current._files.push(file);
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  });
  return { files, tree };
}

function generateTOCFromNav(navItems, pageMap = {}, level = 0) {
  let html = '';
  for (const item of navItems) {
    const indent = '  '.repeat(level);
    if (typeof item === 'string') {
       const fileName = path.basename(item, '.mdx');
       const pageNum = pageMap[item] || '';
       html += `${indent}<li><a href="#" data-path="${item}"><span class="toc-item">${fileName}</span><span class="toc-dots"></span><span class="toc-page">${pageNum}</span></a></li>\n`;
    } else if (typeof item === 'object') {
      const key = Object.keys(item)[0];
      const value = item[key];
      if (typeof value === 'string') {
        const pageNum = pageMap[value] || '';
        html += `${indent}<li><a href="#" data-path="${value}"><span class="toc-item">${key}</span><span class="toc-dots"></span><span class="toc-page">${pageNum}</span></a></li>\n`;
      } else if (Array.isArray(value)) {
        html += `${indent}<li>\n`;
        html += `${indent}  <strong>${key}</strong>\n`;
        html += `${indent}  <ul>\n`;
        html += generateTOCFromNav(value, pageMap, level + 2);
        html += `${indent}  </ul>\n`;
        html += `${indent}</li>\n`;
      }
    }
  }
  return html;
}

function generateTOC(tree, pageMap = {}, level = 0) {
  let html = '';
  const keys = Object.keys(tree).sort();
  for (const key of keys) {
    const value = tree[key];
    if (key === '_files') {
      value.sort().forEach(file => {
        const indent = '  '.repeat(level);
        const fileName = path.basename(file, '.mdx');
        const pageNum = pageMap[file] || '';
        html += `${indent}<li><a href="#" data-path="${file}"><span class="toc-item">${fileName}</span><span class="toc-dots"></span><span class="toc-page">${pageNum}</span></a></li>\n`;
      });
    } else {
      const indent = '  '.repeat(level);
      html += `${indent}<li>\n`;
      html += `${indent}  <strong>${key}</strong>\n`;
      html += `${indent}  <ul>\n`;
      html += generateTOC(value, pageMap, level + 2);
      html += `${indent}  </ul>\n`;
      html += `${indent}</li>\n`;
    }
  }
  return html;
}

async function loadCustomStyles() {
  try {
    const scssFile = path.join(CONFIG.cssDir, 'scss/main.scss');
    try {
      const result = sass.compile(scssFile);
      console.log('   Compiled SCSS successfully');
      return result.css;
    } catch (sassError) {
      if (sassError.code !== 'ENOENT') {
         console.warn('   SCSS compilation failed:', sassError.message);
      }
      throw sassError;
    }
  } catch (error) {
    try {
      const cssFile = path.join(CONFIG.cssDir, 'pdf-styles.css');
      const css = await fs.readFile(cssFile, 'utf-8');
      console.log('   Loaded legacy CSS file');
      return css;
    } catch (cssError) {
      console.warn('   No custom styles found');
      return '';
    }
  }
}

async function generatePagePDF(browser, url, customCSS) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    if (customCSS) {
      await page.addStyleTag({ content: customCSS });
    }

    // Remove "Last updated on" elements
    await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        if (el.children.length === 0 && el.textContent && el.textContent.includes('Last updated on')) {
           el.style.display = 'none';
           // Try to hide the container which usually has margin in Nextra
           const container = el.closest('.mt-12.mb-8');
           if (container) container.style.display = 'none';
        }
      }
    });

    await page.waitForTimeout(1000);
    const buffer = await page.pdf({
      ...CONFIG.pdfOptions
    });
    console.log(`✓ Rendered: ${url}`);
    return buffer;
  } catch (error) {
    console.error(`✗ Failed to render ${url}:`, error.message);
    return null;
  } finally {
    await page.close();
  }
}

async function generateCoverPDF(browser) {
  try {
    const coverPath = CONFIG.coverFile;
    try {
      await fs.access(coverPath);
    } catch {
      console.log('⚠️ Cover image not found, skipping cover page.');
      return null;
    }

    const page = await browser.newPage();
    const imageBuffer = await fs.readFile(coverPath);
    const base64Image = imageBuffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <img src="${dataUri}" />
      </body>
      </html>
    `;

    await page.setContent(content);
    
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false
    });

    console.log('✓ Rendered: Cover Page');
    await page.close();
    return buffer;
  } catch (error) {
    console.error('✗ Failed to render cover page:', error.message);
    return null;
  }
}

async function generateTOCPDF(browser, data, customCSS, isYamlMode = false, pageMap = {}) {
  const page = await browser.newPage();
  const tocContent = isYamlMode ? generateTOCFromNav(data, pageMap) : generateTOC(data, pageMap);
  const tocHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Table of Contents</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        #doc-toc {
          margin: 0 .8rem 1.2rem;
          padding-top: .6rem;
          font-size: 12pt;
          line-height: 1.6;
        }
        #doc-toc ul {
          list-style: none;
          padding-left: 0;
          margin-left: 1em;
          font-size: 12pt;
          page-break-inside: auto !important;
        }
        #doc-toc li {
          list-style: none;
        }
        #doc-toc strong {
          color: #333;
          font-size: 14px;
          display: block;
          margin-top: 15px;
          margin-bottom: 5px;
          font-weight: 600;
        }
        #doc-toc li > a {
          color: inherit;
          text-decoration: none;
          padding-top: 0.4rem;
          display: flex;
          width: 100%;
          align-items: baseline;
        }
        #doc-toc li > a > .toc-item {
          /* padding-right: 0.5em; */
        }
        .toc-dots {
          flex: 1;
          border-bottom: 1px dotted #000;
          margin: 0 0.5rem;
        }
        .toc-page {
          font-weight: bold;
        }
        ${customCSS}
      </style>
    </head>
    <body>
      <article id="doc-toc">
        <ul>
          ${tocContent}
        </ul>
      </article>
    </body>
    </html>
  `;
  await page.setContent(tocHTML);
  await page.waitForTimeout(500);

  // Extract link coordinates
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[data-path]'));
    return anchors.map(a => {
      const rect = a.getBoundingClientRect();
      return {
        path: a.getAttribute('data-path'),
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      };
    });
  });

  const buffer = await page.pdf({
    ...CONFIG.pdfOptions
  });
  console.log(`✓ Rendered: Table of Contents`);
  await page.close();
  return { buffer, links };
}

async function main() {
  console.log('📄 Starting PDF generation (Merged Mode)...\n');
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  console.log('🎨 Loading custom styles...');
  const customCSS = await loadCustomStyles();
  console.log('   Custom styles loaded\n');
  console.log('⚙️ Loading configuration...');
  const navConfig = await loadConfig();
  let filesToProcess = [];
  let tocData = null;
  let isYamlMode = false;
  if (navConfig) {
    console.log('   Using pdf.yml configuration');
    filesToProcess = flattenNav(navConfig);
    tocData = navConfig;
    isYamlMode = true;
  } else {
    console.log('   No configuration found, scanning directory...');
    const { files, tree } = await scanDocsDirectory();
    filesToProcess = files.map(f => ({
      title: path.basename(f, '.mdx'),
      path: f
    }));
    tocData = tree;
    isYamlMode = false;
  }
  console.log(`   Found ${filesToProcess.length} files to process\n`);
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  console.log('   Browser ready\n');

  try {
    const mergedPdf = await PDFDocument.create();

    // 1. Render Cover Page
    console.log('🖼️ Generating Cover Page...');
    const coverBuffer = await generateCoverPDF(browser);
    let coverPageCount = 0;
    if (coverBuffer) {
      const coverPdf = await PDFDocument.load(coverBuffer);
      coverPageCount = coverPdf.getPageCount();
    }
    console.log(`   Cover page count: ${coverPageCount}\n`);

    // 2. Render Content Pages
    console.log('📄 Rendering content pages to calculate page numbers...');
    const renderedPages = [];
    for (let i = 0; i < filesToProcess.length; i++) {
      const fileItem = filesToProcess[i];
      const filePath = fileItem.path;
      const urlPath = filePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
      const cleanUrlPath = urlPath.startsWith('/') ? urlPath.substring(1) : urlPath;
      const url = `${CONFIG.baseUrl}/${cleanUrlPath}`;
      console.log(`   [${i + 1}/${filesToProcess.length}] Rendering: ${fileItem.title} (${url})`);
      
      const pageBuffer = await generatePagePDF(browser, url, customCSS);
      if (pageBuffer) {
        const pagePdf = await PDFDocument.load(pageBuffer);
        const count = pagePdf.getPageCount();
        renderedPages.push({
          buffer: pageBuffer,
          pageCount: count,
          path: filePath,
          title: fileItem.title
        });
      }
    }
    console.log('   All content pages rendered.\n');

    // 3. Calculate TOC Length
    console.log('📑 Calculating Table of Contents length...');
    // Render dummy TOC to get page count
    const { buffer: dummyTocBuffer } = await generateTOCPDF(browser, tocData, customCSS, isYamlMode, {});
    let tocPageCount = 0;
    if (dummyTocBuffer) {
      const dummyTocPdf = await PDFDocument.load(dummyTocBuffer);
      tocPageCount = dummyTocPdf.getPageCount();
    }
    console.log(`   Estimated TOC length: ${tocPageCount} pages\n`);

    // 4. Build Page Map
    const pageMap = {};
    let startPage = coverPageCount + tocPageCount + 1;
    for (const pageData of renderedPages) {
      pageMap[pageData.path] = startPage;
      startPage += pageData.pageCount;
    }

    // 5. Generate Real TOC
    console.log('📑 Generating final Table of Contents with page numbers...');
    const { buffer: tocBuffer, links: tocLinks } = await generateTOCPDF(browser, tocData, customCSS, isYamlMode, pageMap);
    
    // 6. Merge All
    console.log('🔗 Merging all PDFs...');
    
    // Add Cover
    if (coverBuffer) {
      const coverPdf = await PDFDocument.load(coverBuffer);
      const copiedPages = await mergedPdf.copyPages(coverPdf, coverPdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    // Add TOC
    let tocStartPageIndex = mergedPdf.getPageCount();
    if (tocBuffer) {
      const tocPdf = await PDFDocument.load(tocBuffer);
      const copiedPages = await mergedPdf.copyPages(tocPdf, tocPdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    // Add Content
    for (const pageData of renderedPages) {
      const pagePdf = await PDFDocument.load(pageData.buffer);
      const copiedPages = await mergedPdf.copyPages(pagePdf, pagePdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    // 7. Add Link Annotations to TOC
    if (tocLinks && tocLinks.length > 0) {
      console.log('🔗 Adding clickable links to TOC...');
      const pages = mergedPdf.getPages();
      
      // Constants for coordinate conversion
      // Puppeteer (96 DPI) -> PDF (72 DPI)
      const POINTS_PER_PX = 0.75;
      const PAGE_HEIGHT_PTS = 841.89; // A4 height in points
      const MARGIN_TOP_PTS = 20 * 2.83465; // 20mm
      const MARGIN_BOTTOM_PTS = 20 * 2.83465; // 20mm
      const CONTENT_HEIGHT_PTS = PAGE_HEIGHT_PTS - MARGIN_TOP_PTS - MARGIN_BOTTOM_PTS;
      const CONTENT_HEIGHT_PX = CONTENT_HEIGHT_PTS / POINTS_PER_PX;

      for (const link of tocLinks) {
        const targetPageNum = pageMap[link.path];
        if (targetPageNum) {
          // Calculate which TOC page this link is on
          // link.rect.y is the distance from the top of the HTML content
          const tocPageIndexRelative = Math.floor(link.rect.y / CONTENT_HEIGHT_PX);
          const tocPageIndexAbsolute = tocStartPageIndex + tocPageIndexRelative;
          
          if (tocPageIndexAbsolute < pages.length) {
            const tocPage = pages[tocPageIndexAbsolute];
            const targetPage = pages[targetPageNum - 1]; // 0-based index

            // Calculate coordinates on the PDF page
            // y relative to the top of the content area on that specific page
            const yOnPagePx = link.rect.y % CONTENT_HEIGHT_PX;
            
            // Convert to PDF coordinates (origin bottom-left)
            // PDF Y = Bottom Margin + (Content Height - Y_px * scale - Height_px * scale)
            const pdfY = MARGIN_BOTTOM_PTS + CONTENT_HEIGHT_PTS - (yOnPagePx * POINTS_PER_PX) - (link.rect.height * POINTS_PER_PX);
            const pdfX = (15 * 2.83465) + (link.rect.x * POINTS_PER_PX); // Left margin 15mm
            const pdfW = link.rect.width * POINTS_PER_PX;
            const pdfH = link.rect.height * POINTS_PER_PX;

            tocPage.node.addAnnot(
              mergedPdf.context.obj({
                Type: 'Annot',
                Subtype: 'Link',
                Rect: [pdfX, pdfY, pdfX + pdfW, pdfY + pdfH],
                Border: [0, 0, 0],
                Dest: [targetPage.ref, 'XYZ', null, null, null],
              })
            );
          }
        }
      }
    }

    console.log('\n💾 Saving merged PDF...');
    const pdfBytes = await mergedPdf.save();
    const outputPath = path.join(CONFIG.outputDir, CONFIG.outputFilename);
    await fs.writeFile(outputPath, pdfBytes);
    console.log(`\n✅ PDF generation complete!`);
    console.log(`   Output file: ${outputPath}`);

  } catch (error) {
    console.error('\n❌ Error during PDF generation:', error);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

module.exports = {
  main,
  scanDocsDirectory,
  generateTOCFromNav,
  generateTOC,
  loadCustomStyles,
  flattenNav,
  loadConfig,
};
