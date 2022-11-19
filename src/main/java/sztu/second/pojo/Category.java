package sztu.second.pojo;

import lombok.Data;

@Data
public class Category {

    private int id; // 商品分类id

    private int productid; //商品id

    private String categoryname; // 商品分类名称
}
