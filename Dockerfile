# Construção
FROM oven/bun:latest AS builder

WORKDIR /app

# Copiar arquivos pro container
COPY bun.lockb package.json eslint.config.js vite.config.ts postcss.config.js tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json index.html ./
COPY ./src ./src
COPY ./public ./public

# Instalar dependências
RUN bun install
RUN bun run build && ls -la /app/dist

# Prod
FROM nginx:alpine

COPY --from=builder /app/dist  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./public /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]