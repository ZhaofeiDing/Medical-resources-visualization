package com.visual.search.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/19 17:02
 */

@Controller
public class Index {

    @RequestMapping(value = "/", produces = "application/json;charset=utf-8")
    public String index(){
        return "DynamicVisualSearch";
    }

    @RequestMapping(value = "/toDiseaseKG",method = RequestMethod.GET)
    public String toPage(HttpServletRequest request){
//        String url = request.getParameter("url");
//        return url;
        return "DiseaseVisual";
    }

}
