# finance-tracking
![svelnieji biciuliai](https://github.com/user-attachments/assets/b2ce492d-f2ea-4847-9d61-dce4c1a0a675)

## Basic Start Instructions
1. Install & start Docker
2. Make sure ports 3000 & 3001 are not being used.
3. Open finance-tracking directory through the console & write `docker compose up -d`
4. Visit site via link: http://localhost:3000 (allow some seconds for server & database to start).


## Dev Instructions
<!-- - Build client & serverv via `npm run build` -->
- Start production build of client & server via CMI line `npm run dev` in client & server folders.
- If docker is not being used, will default database values (change these in server>config): 
  - HOST = "localhost";
  - USER = "root";
  - PASSWORD = "root";
  - DATABASE = "finance";

todo:
- Balance display
- Delete group button
- Item page - add to form ability to take additionalInput which is passed formData
