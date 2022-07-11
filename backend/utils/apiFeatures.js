const { Cursor } = require("mongoose");

class ApiFeature  {
    constructor(query ,queryStr){
        this.query =  query 
        this.queryStr = queryStr
    }

    // making for search
     search(){
        const keyword = this.queryStr.keyword  ? {
            name :{
                $regex : this.queryStr.keyword,
                $options : "i",
            }
        } :{}

        this.query = this.query.find({...keyword}) ;
        return this;
    
     }

     // making for filter
     filter(){
         const  queryCopy = this.queryStr ;
         const removableItem = ["keyword" , "page" , "limit"]
         removableItem.map(key => delete queryCopy[key]);

        //filter for price and rating ;
         let queryStr = JSON.stringify(queryCopy);
         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
         this.query = this.query.find(JSON.parse(queryStr));
         return this;


     }

     pagination(resultPerPage){
        const currentPage = Number(this.query.page)|| 1;
        const skip =  resultPerPage * (currentPage - 1);
        this.query = this.query.limit( resultPerPage).skip(skip)
        return this;

     }
    

}



module.exports = ApiFeature