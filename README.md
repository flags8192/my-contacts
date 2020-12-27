# Getting Started

Hello, My Friends
Thank you for having interest in this repository!

## Available Scripts

To use this application,\
first create rsa keys (private.key, public.key) and copy them to `src/backend/keys`

````
# openssl genrsa -out private.key -aes256 4096
# openssl rsa -pubout -in private.key -out public.key
````

Then fill in the file `src/backend/.env` with the required information

````
# Example
key_pass_phrase = "ICAKBgQCFPCqJYj20UY4BGfdss44rsw"
issuer = "Alexander Listratenkov"
subject = "mail@listratenkov.com"
audience = "https://listratenkov.com"

MONGODB_URI = "mongodb://server.flags8192.local/my-contacts"
````

Type `yarn install` inside the root directory ( Download Front-end Dependencies )\
Type `yarn install` inside `src\backend` server directory ( Download Server Dependencies )

####To runs the app in the development mode, in the project directory, you can run:

### `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Screenshots
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/login.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004244/screenshots/register.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/home.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/profile.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/contacts.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/editcontact.png)
![Login screen](https://res.cloudinary.com/eaglight/image/upload/v1609004243/screenshots/addcontact.png)
