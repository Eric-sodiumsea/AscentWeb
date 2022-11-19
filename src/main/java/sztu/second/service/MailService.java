package sztu.second.service;

import sztu.second.pojo.Mailtb;

public interface MailService {

    public Mailtb findMail();

    public String saveMail(Mailtb mb);
}
