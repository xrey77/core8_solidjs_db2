FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Add required dependencies for the DB2 driver
RUN apt-get update && apt-get install -y libxml2-dev

# Copy project files and restore NuGet packages
COPY . ./
RUN dotnet restore

# ... (other build steps)

# Set up the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# This is the crucial step: Set the LD_LIBRARY_PATH
ENV LD_LIBRARY_PATH=/app/clidriver/lib