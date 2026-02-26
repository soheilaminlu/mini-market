FROM mini-market-base:latest AS app

WORKDIR /app

COPY . .

COPY --from=base /app/node_modules ./node_modules

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]