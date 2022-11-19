package sztu.second.service.impl;

import sztu.second.dao.ProductDao;
import sztu.second.dao.impl.ProductDaoImpl;
import sztu.second.pojo.Product;
import sztu.second.service.ProductService;

import java.util.List;

public class ProductServiceImpl implements ProductService {

    ProductDao productDao = new ProductDaoImpl();

    @Override
    public List<Product> findProductList() {
        List<Product> productList = productDao.findProductList();
        return productList;
    }

    @Override
    public Product findProductById(int id) {
        Product product = productDao.findProductById(id);
        System.out.println("product = " + product);
        return product;
    }

    @Override
    public List<Product> findProductByName(String productname) {
        List<Product> productList = productDao.findProductByName(productname);
        return productList;
    }

    @Override
    public List<Product> findProductByCategoryName(String categoryname) {
        List<Product> productList = productDao.findProductByCategoryName(categoryname);
        return productList;
    }
}
