module.exports = function (app,client) {
    app.post('/get/data_truyen', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let string = req.body.ten_truyen
            let query = {
                sort: [
                    { _id: { order: "asc" } }
                    ],
                from: 0, 
                size:10000,
                query:{
                    query_string:{
                    query:"id_ten:"+string,
                    default_operator: "and"
                    }
                }
            }
          
            console.log(JSON.stringify(query))
            client.search({index: "data_truyen", body: JSON.stringify(query)}).then(results => {
                let data=[]
                count_index = results.hits.total.value
                results.hits.hits.map(value=>{
                    data.push(value._source)
                })
                res.send({count_index,data})
            })
            
    })
}