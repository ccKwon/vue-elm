let baseUrl = "http://localhost:8081"


const online_url = {
    getshoplist: baseUrl + "/getshop",
    goodlist: baseUrl + "/goodlist",
    getshoplistbyid: baseUrl + "/getshopByid?id=",
    getcomments: baseUrl + "/comments?id=",
    updatePwd: baseUrl + "/updatePwd?name=",
    getuserbyname: baseUrl + "/getuser?name=",
    insertuser: baseUrl + "/insertuser?name=",
    getuserbyid: baseUrl + "/getuserByid?id=",
    insertorder: baseUrl + "/insertorder?ordersaves=",
    queryorders: baseUrl + "/orders?id=",
    category: baseUrl + "/insertcategory?gname=",
    dologin: baseUrl + "/dologin?name="
}

export default online_url
