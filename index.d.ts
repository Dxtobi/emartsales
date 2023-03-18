import "next-auth";

nextAuth
declare global {

    interface User {
       
       
        email: string,
        name: string,
        image: string,
        id: string,
        products: Array<Product>
    }

    module "next-auth" {
        interface Session {
            user?: User;
            expires:ISODateString
        }
    }


    
}



type Product = {
    id     :             String,   
    //product_name:        String,
    //product_price :      String,
    //product_description: String,
    //seller_contact :     String,
    //created_at :         String,
    //slug:                String,
    //images :             String,
  }