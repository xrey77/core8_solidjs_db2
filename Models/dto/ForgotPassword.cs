namespace core8_solidjs_db2.Models.dto
{
    public class ForgotPassword {        
        public int Mailtoken {get; set;}
        public string Password_hash {get; set;}
    }
}