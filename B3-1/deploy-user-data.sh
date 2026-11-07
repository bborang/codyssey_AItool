#!/bin/bash
set -euo pipefail

exec > >(tee -a /var/log/b3-1-bootstrap.log) 2>&1

dnf install -y nginx

cat > /usr/share/nginx/html/index.html <<'HTML'
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello Cloud | Codyssey B3-1</title>
  <style>
    :root { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #142b43; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: #eef4fa; }
    main { width: min(100%, 640px); padding: clamp(32px, 7vw, 64px); border: 1px solid #dce8f2; border-radius: 28px; background: white; box-shadow: 0 24px 70px #17324d19; }
    .eyebrow { margin: 0 0 14px; color: #266eb7; font-size: 13px; font-weight: 800; letter-spacing: .14em; }
    h1 { margin: 0; font-size: clamp(40px, 8vw, 68px); letter-spacing: -.05em; line-height: 1.1; }
    p { line-height: 1.7; }
    .description { margin: 24px 0 32px; color: #4c6175; font-size: 18px; }
    .status { display: inline-flex; align-items: center; gap: 9px; padding: 10px 16px; border-radius: 999px; background: #e6f6ec; color: #166342; font-size: 14px; font-weight: 700; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #24a268; }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">CODYSSEY · B3-1</p>
    <h1>Hello Cloud.</h1>
    <p class="description">서울 리전의 작은 웹 서버가 인터넷을 통해 이 페이지를 전하고 있습니다.</p>
    <span class="status"><span class="dot" aria-hidden="true"></span>Nginx is running</span>
  </main>
</body>
</html>
HTML

printf 'OK\n' > /usr/share/nginx/html/health
nginx -t
systemctl enable --now nginx
curl --fail --silent --show-error http://localhost/health
