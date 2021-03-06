package Servlet;

import Bean.KeyNumberBean;
import Util.CreateKey;
import Util.Json;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/2/17.
 * 生成邀请码的Servlet
 */
@WebServlet(name = "CreateKeyServlet")
public class CreateKeyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/text; charset=utf-8");
        PrintWriter out = response.getWriter();

        String sign = request.getParameter("sign");
        switch (sign) {
            case "1": {
                int keyNumber = Integer.parseInt(request.getParameter("creatNum"));
                String json = CreateKey.getKey(keyNumber);
                out.write(json);
                break;
            }
            case "2": {
                String json = CreateKey.getSqlKey();
                out.write(json);
                break;
            }
            case "3":
                String key = request.getParameter("keyNum");
                boolean f = CreateKey.checkKey(key);
                if (f) {
                    out.write("true");
                } else out.write("false");
                break;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
