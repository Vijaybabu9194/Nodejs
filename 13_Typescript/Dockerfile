FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install --omit=dev


FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
CMD ["npm", "run", "start"]

