package sztu.second.pojo;

import lombok.Data;

import java.util.List;

/**
 * 描述产品信息的类
 *
 * @author sztu_second
 */
@Data
public class Product {

    private Integer id; //商品ID

    private String image; //商品图片

    private String productname; //商品名称

    private double price; //价格

    private Integer stock; //库存量

    private String description; // 商品描述

    private String delsoft; // 软删除标志 1 为软删除 0为正常

    private List<Category> categoryList;    // 分类标签集合
}
