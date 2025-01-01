# Quran Tajwid API (Test)

> ![WARNING]
> Do not use for Production app. The API, Domains etc. might be changed without prior notice

Server app that I quickly scaffolded using [Express Application Generator](https://expressjs.com/en/starter/generator.html). If we want to get serius building API, perhaps need to use better framework ie NestJS etc.

## Getting started

```shell
npm install
```

On MacOS or Linux, run the app with this command:

```shell
DEBUG=myapp:* npm run dev
```

On Windows PowerShell, use this command:

```powershell
$env:DEBUG='myapp:*'; npm run dev
```

Then, load http://localhost:3000/ in your browser to access the app.

## Deployments

- https://quran-tajwid-api.vercel.app/


## Endpoints

- https://quran-tajwid-api.vercel.app/hafsWord/:surahNumber (Get Word metadata by surah)
- https://quran-tajwid-api.vercel.app/hafsWord/byPage/:pageNumber (Get Word metadata by page)

_And probably it will not work since you don't have access to the database._

