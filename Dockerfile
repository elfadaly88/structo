# 1. مرحلة البناء (Build Stage) باستخدام .NET 9 SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# نسخ ملف الـ Solution وكل ملفات الـ .csproj عشان نعمل Restore على نظافة جوه لينكس
COPY Structo.sln ./
COPY Structo.API/Structo.API.csproj ./Structo.API/
COPY Structo.Core/Structo.Core.csproj ./Structo.Core/
COPY Structo.Infrastructure/Structo.Infrastructure.csproj ./Structo.Infrastructure/

# عمل Restore نظيف تماماً جوه بيئة لينكس (ده بيمسح مسارات كاش الويندوز)
RUN dotnet restore Structo.sln

# نسخ باقي ملفات السورس كود كلها
COPY . .

# عمل Publish للمشروع ونقل الناتج لفولدر اسمه /app/publish
RUN dotnet publish Structo.API/Structo.API.csproj -c Release -o /app/publish --no-restore

# 2. مرحلة التشغيل (Runtime Stage) باستخدام بيئة ASP.NET Core 9 الصغيرة
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# تحديد البورت اللي Railway بيشغل عليه الأبليكيشن
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# أمر التشغيل الأساسي
ENTRYPOINT ["dotnet", "Structo.API.dll"]