
# IMF Gadgets API 🚀
A secure API to manage the Impossible Missions Force (IMF) gadget inventory, built with Node.js, Express, Prisma, and Supabase PostgreSQL.


## Features

### Gadget Inventory (/gadgets)

- ``` bash GET /gadgets ```→ Retrieve all gadgets with a random mission success probability.

- ``` bash GET /gadgets?status={status} ``` → Filter gadgets by status.

- ``` bash POST /gadgets ``` → Add a new gadget with a randomly generated codename.

- ``` bash PATCH /gadgets/:id``` → Update gadget status.

- ``` bash DELETE /gadgets/:id``` → Mark a gadget as "Decommissioned" instead of deleting it.


### Self-Destruct (/gadgets/{id}/self-destruct)
- ``` bash POST /gadgets/:id/self-destruct``` → Triggers self-destruction (simulated).

### Authentication & Security
- JWT-based authentication to protect routes.

### Database & Deployment
- Uses Supabase PostgreSQL with Prisma ORM.

- Deployed on Render
## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: JWT
- **Deployment**: Render
## Installation

1. Clone the repository

```bash
 git clone https://github.com/animesh156/IMF-Gadget-API.git

 cd Sustainable IMF-Gadget-API
```


2.Install Dependencies

```bash
npm install

```

3. Setup Environment Variables


- Create a .env file and add:
 ```bash
 DATABASE_URL=postgresql://YOUR_SUPABASE_URL
JWT_SECRET=your_jwt_secret
PORT=5000

```
4.Initilaize Databse

``` bash 
npx prisma migrate dev --name init
npx prisma generate

```

5.Start the server

``` bash 
npm run dev
```
## API EndPoints

### Authencation


| Method    | Endpoint | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login` | Login a User |

###  Gadgets



| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `GET`      | `/gadgets` | Get all gadgets with success probability.  |
| `GET`      | `/gadgets/status?status=Available` | Get gadgets filtered by status |
| `POST`      | `gadgets` | Add a new gadget |
| `PATCH`      | `gadgets/:id` | Update gadget status |
| `DELETE`      | `/gadgets/:id` | Mark gadget as "Decommissioned |
| `POST`      | `/gadgets/:id/self-destruct` | Simulate self-destruction |



