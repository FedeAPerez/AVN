const AUTH_KEY = process.env.AUTH_KEY;

module.exports = {
    isAuthValid: function(req) {
        try{
            return req.headers.authataxia.trim() == AUTH_KEY.trim();  
        }
        catch(err) {
            return false;
        }
    }
};