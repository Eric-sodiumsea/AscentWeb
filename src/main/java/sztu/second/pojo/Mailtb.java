package sztu.second.pojo;

import lombok.Data;

/**
 * 邮件类
 *
 * @author sztu_second
 */

@Data
public class Mailtb {
    private Integer id; // id自增

    private String fromaddress; // 发件人地址

    private String frompassword;

    private String toaddress;

    public Mailtb() {

    }

    public Mailtb(String fromaddress, String frompassword, String toaddress) {
        this.fromaddress = fromaddress;
        this.frompassword = frompassword;
        this.toaddress = toaddress;
    }

    public Mailtb(Integer id, String fromaddress, String frompassword, String toaddress) {
        this.id = id;
        this.fromaddress = fromaddress;
        this.frompassword = frompassword;
        this.toaddress = toaddress;
    }
}
