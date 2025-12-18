# Fonts Directory

Place custom font files here for PDF generation.

## Supported Formats

- `.woff2` (recommended, best compression)
- `.woff` (good browser support)
- `.ttf` (TrueType Font)
- `.otf` (OpenType Font)

## Example Structure

```
fonts/
├── Inter-Regular.woff2
├── Inter-Bold.woff2
├── JetBrainsMono-Regular.woff2
└── CustomFont.ttf
```

## Usage in CSS

Reference fonts in `../pdf-styles.css`:

```css
@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

body {
  font-family: 'Inter', sans-serif;
}
```

## Free Font Resources

- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Inter](https://rsms.me/inter/)

## License

Ensure you have the proper license for any commercial fonts used in PDFs.
