# Steps to clone template

1. Create folder for your project and cd into it

2. Perform the following commands in the command line
```bash
git clone https://github.com/SEB-13-Bahrain/auth-template.git .
rm -rf .git
rm README.md
```

3. Create a .env file with the following values:
```
MONGODB_URI=mongodb+srv://omar:1234@omar-cluster.pac2dyx.mongodb.net/productLab?appName=omar-cluster
PORT=3000
CLIENT_URL=http://localhost:5173
```


4. run:
```bash
npm i
```




