# Cinematic Portfolio

## Chạy local
```bash
npm install
npm run dev
```

## Deploy lên GitHub Pages

### Bước 1 — Đổi tên repo
Đặt tên repo GitHub là `cinematic-portfolio` (hoặc bất kỳ tên gì bạn muốn).

### Bước 2 — Sửa vite.config.js
Mở `vite.config.js`, đổi `base` thành `/tên-repo-của-bạn/`:
```js
base: '/cinematic-portfolio/', // ← đổi thành tên repo của bạn
```

### Bước 3 — Push lên GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/cinematic-portfolio.git
git push -u origin main
```

### Bước 4 — Bật GitHub Pages
- Vào repo → **Settings** → **Pages**
- Source: chọn **GitHub Actions**
- Lưu lại

GitHub Actions sẽ tự động build và deploy mỗi khi bạn push code!

Link web của bạn sẽ là:
`https://USERNAME.github.io/cinematic-portfolio/`
