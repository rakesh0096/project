# project
(1)- first route- /api/auth
    (this route includes user reg containing multiple params post on server and store in db)
        (i) /api/auth/register 
            params-
                firstname,
                lastname,
                email,
                password,
                token(jwt) auto genrated

        (ii) /api/auth/login
            params-
                email,
                password

(2)- second route- /api/products
    (this route post the product description using id, name ,description and reviews and store in db)
        params-
            prod_id,
            prod_name,
            prod_description,
            reviews,
            user_id (token)

(3)- third route- /api/auth/product/review
    (this route get information of product from db by passing prod_id_params in url)
        params-
            req.params.id (pass in url ) and get information of product
