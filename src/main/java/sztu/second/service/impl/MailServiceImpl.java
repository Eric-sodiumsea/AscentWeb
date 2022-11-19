package sztu.second.service.impl;

import sztu.second.base.StatusCode;
import sztu.second.dao.MailDao;
import sztu.second.dao.impl.MailDaoImpl;
import sztu.second.pojo.Mailtb;
import sztu.second.service.MailService;

public class MailServiceImpl implements MailService {

    // 创建MailDao对象
    MailDao mailDao = new MailDaoImpl();

    @Override
    public Mailtb findMail() {
        Mailtb mail = mailDao.findMail();
        return mail;
    }

    @Override
    public String saveMail(Mailtb mb) {
        int row = mailDao.saveMail(mb);

        if (row > 0) {
            String result = StatusCode.SUCCESS.toString();
            return result;
        } else {
            String result = StatusCode.FAIL.toString();
            return result;
        }
    }
}
