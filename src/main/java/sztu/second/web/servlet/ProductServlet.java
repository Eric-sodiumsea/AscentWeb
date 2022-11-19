package sztu.second.web.servlet;

import com.alibaba.fastjson.JSON;
import sztu.second.base.BaseServlet;
import sztu.second.pojo.Product;
import sztu.second.service.ProductService;
import sztu.second.service.impl.ProductServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/product")
public class ProductServlet extends BaseServlet {

    public void findProductList(HttpServletRequest req, HttpServletResponse resp) {

        try {
            ProductService productService = new ProductServiceImpl();
            List<Product> productList = productService.findProductList();

            // 响应结果
            String result = JSON.toJSONString(productList);
            resp.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void findProductById(HttpServletRequest req, HttpServletResponse resp) {

        try {
            // 1. 接收参数
            String id = req.getParameter("id");
            System.out.println("id = " + id);
            ProductService productService = new ProductServiceImpl();
            Product product = productService.findProductById(Integer.parseInt(id));

            String result = JSON.toJSONString(product);
            resp.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void findProductByName(HttpServletRequest req, HttpServletResponse resp) {

        try {

            // 接收参数
            String productname = req.getParameter("productname");

            ProductService productService = new ProductServiceImpl();

            List<Product> productList = productService.findProductByName(productname);

            String result = JSON.toJSONString(productList);

            resp.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void findProductByCategoryName(HttpServletRequest req, HttpServletResponse resp) {

        try {
            // 获取参数
            String categoryname = req.getParameter("categoryname");

            ProductService productService = new ProductServiceImpl();

            List<Product> productList = productService.findProductByCategoryName(categoryname);

            String result = JSON.toJSONString(productList);

            resp.getWriter().print(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
