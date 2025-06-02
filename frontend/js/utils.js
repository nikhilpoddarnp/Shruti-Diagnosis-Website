function checkJWT(){
    try{
        const token = localStorage.getItem('token');
        const payload = parseJWT(token);
        
        localStorage.setItem('loginUserId', payload.userId);
        localStorage.setItem('loginRole', payload.role);
    } catch(error){
        localStorage.clear();
        window.location.href = "../html/index.html";
    }
}

function getUserId(){
    let userId = localStorage.getItem('userId');
   
    if(!userId || userId === ''){
        userId = localStorage.getItem('loginUserId');
    }
    return userId;
}


function parseJWT(jwt) {
    
    const parts = jwt.split('.');
  
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }
  
    const payload = JSON.parse(atob(parts[1]));
  
    return payload;

}

function getBaseUri(){
    var baseUris = window.location.origin.split("/");
    const baseUri = baseUris[0] + "//" + baseUris[2];
    console.log(baseUri);
    return baseUri;
}

export { checkJWT, getUserId, getBaseUri };