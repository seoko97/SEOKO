# STEP 1
# 1
FROM node:16-alpine AS builder
# 2
WORKDIR /app

COPY package*.json ./

# 4
RUN npm install

COPY . .

# 5
RUN npm run build

# STEP 2
#6
FROM node:16-alpine
#7
WORKDIR /app

#8
ENV NODE_ENV production
#9
COPY --from=builder ./app .

EXPOSE 3065

#10
CMD ["npm", "run", "start:prod"]