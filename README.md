# Gears-FE

## nginx dev server

```
server {
    server_name gearsx.local;
    listen 80;
    location /graphiql {
        proxy_pass http://127.0.0.1:8080/graphiql;
    }
    location /graphql {
        proxy_pass http://127.0.0.1:8080/graphql;
    }
    location / {
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

