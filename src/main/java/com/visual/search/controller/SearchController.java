package com.visual.search.controller;

import com.visual.search.entity.Hospital;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Zhaofei.Ding
 * @date 2020/10/12 22:35
 */

@Controller
public class SearchController {

    @GetMapping("/searchhospital")
    public ModelAndView hospital(){
        //实例化对象
        Hospital hospital = new Hospital();
        ModelAndView mav = new ModelAndView("searchhospital");
        mav.addObject("hospital", hospital);
        return mav;
    }


}
