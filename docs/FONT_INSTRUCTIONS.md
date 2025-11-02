Iosevka Local font shipping instructions

This project prefers a local copy of the Iosevka Aile family for a compact techy look.

How to add fonts locally

1. Download or obtain the WOFF2 files for the weights you want (Regular/Medium/SemiBold are recommended).
2. Place them in the `public/fonts/` folder with these exact filenames:

   - `IosevkaAile-Regular.woff2`
   - `IosevkaAile-Medium.woff2`
   - `IosevkaAile-SemiBold.woff2`

3. The project already includes `@font-face` declarations in `app/globals.css` which will prefer the local files when present and fall back to the Google-hosted import otherwise.

Notes

- Ensure WOFF2 licensing allows you to host the font. If you don't have distribution rights, keep the Google-hosted import and remove the local files.
- After placing the files, rebuild the project (`npm run build` or `npm run dev`) to ensure they load correctly.

If you'd like, I can add a small script to download the fonts automatically from a licensing-approved source, or wire the fonts into Tailwind via `tailwind.config.js` for classes like `font-iosevka`.
