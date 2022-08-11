# express-learn
Для запуска:
1) docker-compose up

___
# docker:
https://hub.docker.com/repository/docker/gardn/gardn_library
___
# mongo:
1)  ```JavaScript
    > db.rofl.insertMany([
      {
          title: "title",
          description: "description",
          authors: "authors"
      },
      {
          title: "test1",
          description: "te2",
          authors: "t3"
      },
    ])

    { acknowledged: true,
    insertedIds:
    { '0': ObjectId("62f5084393e6d590fadcbc0f"),
        '1': ObjectId("62f5084393e6d590fadcbc10") } }

    ```

2)  ```JavaScript
    > db.rofl.find({title: "title"})

    { _id: ObjectId("62f5084393e6d590fadcbc0f"),
    title: 'title',
    description: 'description',
    authors: 'authors' }
    ```
3)  ```JavaScript
    > db.rofl.updateOne( { '_id': ObjectId('62f5084393e6d590fadcbc0f') }, { $set: { description: "POMINKI", authors: "ROFLAN" }} )

    { acknowledged: true,
    insertedId: null,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0 }
    ```
