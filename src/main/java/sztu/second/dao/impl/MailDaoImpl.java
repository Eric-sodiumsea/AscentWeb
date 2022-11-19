package sztu.second.dao.impl;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import sztu.second.dao.MailDao;
import sztu.second.pojo.Mailtb;
import sztu.second.utils.DruidUtils;

import java.sql.SQLException;

public class MailDaoImpl implements MailDao {

    public Mailtb findMail() {

        try {
            // 1. 创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 编写SQL，整张表只存一条数据
            String sql = "SELECT * FROM mailtb";

            // 3. 执行SQL
            Mailtb mail = qr.query(sql, new BeanListHandler<Mailtb>(Mailtb.class)).get(0);

            return mail;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public int saveMail(Mailtb mb) {

        try {
            // 1. 创建QueryRunner
            QueryRunner qr = new QueryRunner(DruidUtils.getDataSource());

            // 2. 查询数据库中是否已有数据，若有则为更新操作，否则为插入操作
            Mailtb mail = findMail();

            // 3. 编写SQL
            String sql = "";
            if (mail != null) {
                sql = "UPDATE mailtb SET fromaddress = ?, frompassword = ?, toaddress = ?";
            } else {
                sql = "INSERT INTO mailtb(fromaddress, frompassword, toaddress) VALUES(?, ?, ?)";
            }

            // 4. 执行SQL
            int row = qr.update(sql, mb.getFromaddress(), mb.getFrompassword(), mb.getToaddress());
            return row;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
