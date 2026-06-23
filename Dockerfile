# 1. مرحلة البناء (Build Stage)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# نسخ ملف الـ Solution وكل ملفات الـ .csproj
COPY Structo.sln ./
COPY Structo.API/Structo.API.csproj ./Structo.API/
COPY Structo.Core/Structo.Core.csproj ./Structo.Core/
COPY Structo.Infrastructure/Structo.Infrastructure.csproj ./Structo.Infrastructure/

# عمل Restore للمشاريع كلها
RUN dotnet restore Structo.sln

# نسخ باقي ملفات السورس كود بالكامل (بما فيها Program.cs وكل الـ Controllers)
COPY . .

# الانتقال المباشر لجوه فولدر الـ API قبل عمل الـ Publish عشان الـ Compiler ميتوهش
WORKDIR "/src/Structo.API"
RUN dotnet publish "Structo.API.csproj" -c Release -o /app/publish

# 2. مرحلة التشغيل (Runtime Stage)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Structo.API.dll"]