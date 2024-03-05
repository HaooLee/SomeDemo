//注入目标css
let cssList = [

].forEach(css=>{
    let link = document.createElement('link')
    let linkAttr =  document.createAttribute('rel')
    linkAttr.value = 'stylesheet'
    let linkHref =  document.createAttribute('href')
    linkHref.value = css
    link.setAttributeNode(linkAttr)
    link.setAttributeNode(linkHref)
    document.getElementsByTagName('head')[0].appendChild(link)
})


const config = {
    server : "https://api.cklllll.com",
    version : "1"
}


const parameter = (name)=>{
    let str = "";
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        str = decodeURIComponent(r[2]);
        return str
    }
    return str
}



const load=(name)=>{
    axios.post(`${config.server}/chromeantd/Script/file`,{
        name : name,
        version: config.version
    }).then(res=>{
        if (res.data.success){
            console.info(`${name},脚本加载成功`);
            eval(res.data.data);
        }else {
            console.error(`${name},脚本加载失败`);
        }
    }).catch(e=>{
        console.error(e)
        console.error(`${name},脚本加载失败`);
    });
}