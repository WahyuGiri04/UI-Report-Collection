# 1. Tahap build
FROM node:22-alpine AS builder

# 2. Direktori kerja
WORKDIR /app

# 3. Salin file dependency dan install
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --legacy-peer-deps

# 4. Salin semua file dan build aplikasi
COPY . .
RUN npm run build

# 5. Tahap produksi - gunakan image minimal
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Salin dari builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Jalankan Next.js
EXPOSE 3000
CMD ["npm", "start"]
