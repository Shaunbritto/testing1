const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const {company, name, features, sort, select} = req.query;
    const queryObject = {};
    if(company)
    {
        queryObject.company = company;
    }
    if(name)
    {
        queryObject.name = {$regex:name, $options:"i"};
    }

    let apiData = Product.find(queryObject);
    if(sort)
    {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }
    if(select)
    {
        let selectFix = sort.replace(",", " ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;  

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);
    if(features)
    {
        queryObject.features = features;
    }
    console.log(queryObject);
    const myData = await apiData;  
    res.status(200).json({myData});
}

const getAllProductsTesting = async (req, res) => {
    console.log(req.query); 
    const myData = await Product.find(req.query);
    res.status(200).json({myData, nbHits: myData.length });    
}
module.exports = {getAllProducts, getAllProductsTesting};


