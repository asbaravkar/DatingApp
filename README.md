
![Logo](https://res.cloudinary.com/dy0yq01fz/image/upload/v1677505546/da-net5/datelogy-logo_sdbpwx.png)


# Datelogy

A dating application that allows users to connect with others and find potential matches. The application has features like registration and login using .NET Identity, viewing who likes them, editing their profile, and uploading single/multiple photos. Additionally, the application has a live messaging system with presence using SignalR. It also includes pagination, caching, filtering with age, and toastr notifications.


## Features

- User registration and login using .NET Identity.
- View who likes them and edit their profile information.
- Upload single/multiple photos to their profile.
- Real-time messaging system with presence using SignalR.
- Pagination to navigate through large amounts of data.
- Caching to store frequently accessed data in memory.
- Filtering with age to refine search results.
- Toastr notifications for user actions and system messages.


## Tech Stack
**Tools:** .Net 7.0 SDK, Node JS, Angular CLI

**Client:** Angular, BootStrap, Ngx-(spinner, timeago, toastr, gallery)

**Server:** .Net 7.0, EF Core, Identity, SignalR

**Database:** PostgreSQL

**Devops:** Docker, fly.io, Cloudinary




## Installation

Connect to different database by using different connection strings
- postgres
- sqlite
```bash
  docker run --name postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres:latest
```
API
```bash
  dotnet restore
  dotnet run
```
Client

```bash
  npm install
  ng serve
```

## Configuration

To run this project, you will need to add the following section in appsettings.json

```
  "CloudinarySettings": {
    "CloudName": "",
    "ApiKey": "",
    "ApiSecret": ""
  }
```

