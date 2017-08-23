# blgfstr-challenge

## How to run

1. Clone this repo
```
$ git clone git@github.com:MartinPavlik/blgfstr-challenge.git
```

2. Install dependecies by running following command inside both `./frontend` and `./backend` directories.
```
$ yarn install
```

3. Start client and server by running:
```
$ yarn start
```

## About

### Backend
Backend is realized in **ExpressJS** framework.

**In-memory storage** is used instead of "real" database, so all data is lost when the server is restarted. The source code of this storage can be found [here](/backend/model/Links).

#### The idea

When user creates a link he obtains two **different** hashes - `hash` and `managementHash` (both of them are randomly generated).

- `hash` - part of the "public" URL that redirects to original url
- `managementHash` - this hash should be "secret" and only the user who created a link should know this hash, because it is used to manage the link (change the url or delete the link)

Usage of these two hashes is listed in this table:

<table>
  <thead>
    <thead>
      <th>
        Method
      </th>
      <th>
        URL
      </th>
      <th>
        Description
      </th>
    </thead>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>GET</code>
      </td>
      <td>
        <code>/:hash</code>
      </td>
      <td>
        Redirects user to url associated with given <code>:hash</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>POST</code>
      </td>
      <td>
        <code>/link</code>
      </td>
      <td>
        Creates link and returns JSON object containing Link info:
        <code>
          {
            url,
            hash,
            managementHash
          }
        </code>
      </td>
    </tr>
    <tr>
      <td>
        <code>GET</code>
      </td>
      <td>
        <code>/link/:managementHash</code>
      </td>
      <td>
        Returns JSON object containing Link info:
        <code>
          {
            url,
            hash,
            managementHash
          }
        </code>
      </td>
    </tr>
    <tr>
      <td>
        <code>PUT</code>
      </td>
      <td>
        <code>/link/:managementHash</code>
      </td>
      <td>
        Updates link and returns JSON object containing Link info:
        <code>
          {
            url,
            hash,
            managementHash
          }
        </code>
      </td>
    </tr>
    <tr>
      <td>
        <code>DELETE</code>
      </td>
      <td>
        <code>/link/:managementHash</code>
      </td>
      <td>
        Deletes link and returns JSON object containing info message: <code>{ message }</code>.
      </td>
    </tr>
  </tbody>
</table>

### Frontend

Frontend is a React web application created via `create-react-app` generator.

## Testing

You can execute tests by running this command

```
$ yarn test
```

in `./frontend` or `./backend` directory.

### Test coverage
#### Backend
Only simple API test is currently available.

#### Frontend
- UI components - tested by smoke test
- Sagas - tested completely
- Reducers & Action Creators - only the more complicated ones are tested
