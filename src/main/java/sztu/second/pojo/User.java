package sztu.second.pojo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @author sztu_second
 */
@Data
public class User implements java.io.Serializable {

    //Fields
    private Integer id;
    private String username;
    private String password;
    private String nickname;
    private String tel;
    private String email;
    private String address;
    private String superuser;
    private List<Product> productList = new ArrayList<>();
    private String delsoft;
}
