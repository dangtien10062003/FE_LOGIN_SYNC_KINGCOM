# FE Login

UI đăng nhập cho hệ thống đồng bộ tồn kho Haravan.

```bash
npm run dev
```

Mặc định chạy tại `http://127.0.0.1:5301` và proxy `/api` về BE `http://127.0.0.1:5088`.

Sau khi đăng nhập thành công, Login sẽ chuyển sang Admin theo biến:

```env
VITE_ADMIN_URL=http://127.0.0.1:5300
```
