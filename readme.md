
```sh
# tab 1
npm run server

# tab 2
npm run watch
```

# Random JSON data

From: http://www.json-generator.com/

```json
[
  '{{repeat(5, 999)}}',
  {
      id: '{{objectId()}}',
      image: 'http://lorempixel.com/128/128/',
      title: '{{lorem(random(3,4, 5, 6), "words")}}',
      artist: '{{lorem(random(2, 3,4, 5, 6), "words")}}'
  }
]
```