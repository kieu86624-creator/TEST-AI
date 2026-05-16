# AgencyConnect

AgencyConnect là MVP full-stack cho nền tảng mạng xã hội chuyên nghiệp kết nối agency, brand, freelancer, consultant và khách hàng doanh nghiệp. Giao diện sử dụng thương hiệu riêng với navy, trắng, xám nhạt, cyan/violet; không sao chép logo, màu nhận diện hoặc giao diện Facebook.

## Tech stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS + Lucide React
- Backend: Node.js + Express
- Database demo: SQLite
- ORM: Prisma
- Authentication: JWT + bcrypt, httpOnly cookie và Bearer token demo
- Validation: Zod
- State: React Context

## Cấu trúc

```txt
agency-connect/
  client/
    src/components/     # Header, Sidebar, PostCard, PartnerCard, ProjectCard...
    src/pages/          # login, register, dashboard, profile, partners, projects, messages, settings
    src/layouts/        # AppLayout 3 cột responsive
    src/context/        # AuthContext, ToastContext
    src/lib/            # API client
    src/types/          # Shared frontend types
  server/
    src/controllers/    # API handlers
    src/routes/         # Express routers
    src/middleware/     # JWT route guard
    src/prisma/         # Prisma client singleton
    src/utils/          # Auth/error helpers
    prisma/schema.prisma
    prisma/seed.ts
```

## Tính năng MVP

- `/login`: layout 2 cột, form validate, loading/error state, demo accounts.
- `/register`: tạo tài khoản Agency/Brand/Freelancer/Consultant và chuyển về dashboard.
- `/dashboard`: header cố định, sidebar, composer, feed bài viết, comment, like/save/share UI, right sidebar.
- `/profile/:id`: cover, avatar, info, action buttons, tabs, agency service/portfolio/min budget.
- `/partners`: tìm kiếm agency, filter UI, card agency, rating, CTA.
- `/projects`: danh sách brief với budget, deadline, skills, trạng thái, CTA ứng tuyển/lưu.
- `/messages`: layout 2 cột, trạng thái online/offline, gửi tin nhắn bằng state local + API.
- `/settings`: account, security, password, notification, privacy, delete account sections.
- Route guard frontend và middleware bảo vệ API.
- JSON error handling, không trả `passwordHash` về frontend.

## Chạy project sau khi clone

### 1. Backend

```bash
cd agency-connect/server
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

API chạy tại `http://localhost:4000`.

### 2. Frontend

Mở terminal khác:

```bash
cd agency-connect/client
npm install
npm run dev
```

Frontend chạy tại `http://localhost:5173` và proxy `/api` sang backend.

## Demo accounts

- Agency: `agency@example.com` / `password123`
- Brand: `brand@example.com` / `password123`

## API endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Posts

- `GET /api/posts`
- `POST /api/posts`
- `POST /api/posts/:id/like`
- `POST /api/posts/:id/comments`
- `GET /api/posts/:id/comments`

### Users & partners

- `GET /api/users/:id`
- `PUT /api/users/me`
- `GET /api/users/search`
- `GET /api/partners`
- `GET /api/partners/:id`

### Connections, projects, messages

- `POST /api/connections/request`
- `POST /api/connections/:id/accept`
- `GET /api/connections/me`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects/:id/apply`
- `GET /api/messages/conversations`
- `GET /api/messages/:userId`
- `POST /api/messages`

## Seed data

Seed tạo tối thiểu 5 agency, 3 brand, 10 post, 5 project, 10 message và 5 connection để có dữ liệu demo ngay sau migration.
