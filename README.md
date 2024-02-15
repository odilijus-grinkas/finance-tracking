# finance-tracking

## Basic Start Instructions
1. Install & start Docker
2. Make sure ports 3000 & 3001 are not being used.
3. Open finance-tracking directory through the console & write `docker compose up -d`
4. Visit site via link: `http://localhost:3000` (port may be different if 3000 port is used).


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