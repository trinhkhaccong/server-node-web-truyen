module.exports = function (app,client) {
    app.post('/get/truyen', function(req, res) {
        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            let id_ten = req.body.id_ten
            let id_chuong = req.body.id_chuong
            let query = {
                query:{
                    query_string:{
                    query:("id_ten:"+id_ten) + " AND id_chuong:"+id_chuong,
                    default_operator: "and"
                    }
                }
            }

            let query2 = {
                size:0,
                query:{
                    query_string:{
                    query:("id_ten:"+id_ten),
                    default_operator: "and"
                    }
                }
            }
          
            console.log(JSON.stringify(query))
            client.search({index: "data_truyen", body: JSON.stringify(query)}).then(results => {
                client.search({index: "data_truyen", body: JSON.stringify(query2)}).then(results2 => {
                    if((results.hits.hits.length) == 0)
                    {
                        res.send([])
                    }
                    else
                    {
                        
                        res.send({data:results.hits.hits[0]._source,chuong:results2.hits.total.value})
                    }
                    
                })
                
            })
            
    })
}