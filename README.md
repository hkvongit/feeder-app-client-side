## Basic technical details

- Next js project
- Documentation can be found in `./docs` directory

## Getting Started to development

```bash
npm run dev
```

## API Documentation

- Use bruno app
- Open `api-test` directory on Bruno.

## Unit testing

- We have installed `tsx` npm package as dev dependency in this project entirely for testing the `.test.ts` files.
- command to test

```bash
node --import tsx --test `<relative path to test file>`
```

- - e.g

```bash
node --import tsx --test src/helpers/datetime-helpers.test.ts
```

## Pending items

- [ ] [Hackernews](https://news.ycombinator.com/rss) does not provide the content of the article instead it will give the link to the article, so we need to find a way to fetch the data from the individual article and show the data in the UI. Bad thing is it gives a `description` field which will not have much data other than the url of the article page. So we can probably give an manual option to fetch the article directly from the client side on demand.

- [ ] Use constants to redirect the users to new routes. Avoid hardcoded strings.
