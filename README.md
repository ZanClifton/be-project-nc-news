# Northcoders News API

## Set-up

If you clone this project, in order for you to be able to run it locally you will need to create 2 files:
```
.env.development
.env.test
```

You can refer to the ``` .env-example ``` file to see how the files should look, however in each file you can copy and paste the relevant text below.


``` .env.development ``` should contain the following:
```
PGDATABASE=nc_news;
```

and ``` .env.test ``` should contain the following:
```
PGDATABASE=nc_news_test;
```

This will connect the two databases and everything should work as expected.