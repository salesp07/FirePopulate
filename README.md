# FirePopulate

## Description

**FirePopulate** helps you test your app by quickly populating dummy data to your Firebase backend. You can generate dummy JSON data through a free service like [Mockaroo](https://www.mockaroo.com/). Once you have your dummy JSON array, simply go to [FirePopulate](https://firepopulate.vercel.app/), input it in the specified field, as well as your firebase config (as valid JSON). Then choose which database you want to populate, and which collection / node you want to populate it to. Click **Populate** and you're done!

**OBS**: If you choose to populate your **RealtimeDB**, the specified node will be **replaced** with the provided JSON data.

## Run Locally

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Go to `http://localhost:3000`

#### Issues and PRs welcome :)
