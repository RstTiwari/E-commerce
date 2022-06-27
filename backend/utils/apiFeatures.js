class apiFeature  {
    constructor(query ,queryStr){
         query = this.query,
         queryStr = this.queryStr
    }


    // making for search
    search(){
    const keyword = this.queryStr.keyword ? (
        {
            $regex: this.queryStr.keyword,
            $optinal:"i"
        }

    ):({})

    this.query = this.query.find({...keyword})
    return this;


    }
}



module.exports = apiFeature