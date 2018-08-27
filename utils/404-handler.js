/*jshint esversion: 6 */
function notFoundHandler(req, res, next){
    //setTimeout(()=>{
        if(!res.headersSent)
        res.status(404).send(
            `No handler found for this request:`+
            `\r\n[${req.method}]`+
            `\r\nhttp://${req.hostname}${req.url}`);
    next();
    //},10);
}

module.exports = notFoundHandler;