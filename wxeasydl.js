

//EasyDL接口 图片数据 返回结果条数 根据物体 分类 文本 请修改第二个参数哦
let easyDLRequest = (easydlUrl, client_id, client_secret,base64Img,topNum,callback)=>{
  //拼接接口body参数
  let params = {
     
     image:base64Img
  }
  let url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret + '&';

  wx.request({
   
    url:url,
    method: 'POST',
    success: function (res) {
     
      //发送接口请求
      wx.request({
        url: easydlUrl + '?access_token=' + res.data.access_token,
        data: params,
        header: {
          //ezdl为json格式参数提交 其他模块接口要求请仔细看接口文档
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          callback.success(res.data)
        },
        fail: function (res) {
          if (callback.fail)
            callback.fail()
        }
      })

    },
    fail: function (res) {
      console.log(res)
    }
  })

}
//暴露出去的接口
module.exports = {
  easyDLRequest: easyDLRequest
}