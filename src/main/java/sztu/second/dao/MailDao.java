package sztu.second.dao;

import sztu.second.pojo.Mailtb;

public interface MailDao {

    public Mailtb findMail();

    public int saveMail(Mailtb mb);

}