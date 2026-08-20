# ==========================================
# 1. المرحلة الأولى: بناء تطبيق الفرونت إند (Angular Client Build Stage)
# ==========================================
FROM node:22-alpine AS client-build
WORKDIR /app/client

# نسخ تعريفات الحزم وتثبيتها للاستفادة من كاش الدوكر
COPY Structo.Client/package*.json ./
RUN npm ci

# نسخ سورس كود الفرونت إند بالكامل وبناء حزمة الإنتاج
COPY Structo.Client/ ./
RUN npm run build -- --configuration=production

# ==========================================
# 2. المرحلة الثانية: بناء الـ API والباك إند (.NET Backend Build Stage)
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# نسخ ملف الـ Solution وكل ملفات الـ .csproj
COPY Structo.sln ./
COPY Structo.API/Structo.API.csproj ./Structo.API/
COPY Structo.Core/Structo.Core.csproj ./Structo.Core/
COPY Structo.Infrastructure/Structo.Infrastructure.csproj ./Structo.Infrastructure/

# عمل Restore للمشاريع كلها
RUN dotnet restore Structo.sln

# نسخ باقي ملفات السورس كود بالكامل
COPY . .

# نسخ نواتج بناء الفرونت إند الطازجة مباشرة إلى مجلد wwwroot الخاص بالـ API
COPY --from=client-build /app/Structo.API/wwwroot ./Structo.API/wwwroot/

# الانتقال المباشر لجوه فولدر الـ API قبل عمل الـ Publish
WORKDIR "/src/Structo.API"
RUN dotnet publish "Structo.API.csproj" -c Release -o /app/publish

# ==========================================
# 3. المرحلة الثالثة: مرحلة التشغيل (Runtime Stage)
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Structo.API.dll"]